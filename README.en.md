# XSA · XingTu Super Agent

> Research Preview. XSA is currently design plus an offline prototype, not a production system that connects every agent. Every capability is labeled `design` / `mock` / `verified` / `production`.

**One Goal. Many Agents. Verified Outcomes.**

XSA is a goal-oriented, tool-neutral collaboration layer for Super Agents. Inspired by the design philosophy of DeepSeek's Super Agent research prototype, it reuses existing LLMs, harnesses, agents, skills and tools, and adds the layer they are missing between each other: professional division of labor across agents, event-driven collaboration, task orchestration, watchdog monitoring, execution receipts and verifiable delivery.

**Super Agent capability ≈ LLM + Harness + XSA coordination extension**

This is XingTu's engineering composition, not an official DeepSeek formula.

## What problem it solves

Real goals rarely close inside one tool: a plan is drafted in one chat, code is written by another agent, artifacts land in GitHub, and review happens back in the first chat. Users become the message queue between their own tools — copying goals, pasting results, confirming versions. XSA targets goal consistency, task state, authorization boundaries, execution receipts, failure recovery and the cost of human attention.

## Why agents still need each other

Capabilities differ structurally. Planning and review environments may have no write interface at all: this repository itself is a verified case — the goal was formed in a ChatGPT conversation whose connection cannot create GitHub repositories; a personal agent with GitHub capability executed the creation; evidence landed in GitHub for independent review. See `docs/history/`. XSA's stance: when an agent lacks an execution capability, hand the task to an agent that has it; the executor returns structured evidence; another agent verifies and continues. XSA never bypasses a platform's authorization, security or interface limits — it composes existing, user-authorized capabilities through adapters.

## Relation to DeepSeek Super Agent

XSA draws on the philosophy, domain model (Source / Trigger / Policy / Mandate / Executor) and architecture layering (Engine / Store / Outbox) of DeepSeek's open research prototype [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) and [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness). It is an independent implementation for cross-product collaboration. No official partnership, derivative status or verified compatibility is claimed; the upstream project describes itself as a research prototype, not a production product.

## Why not build another coding agent

Executors are already mature. XSA builds only the minimal control plane: a shared Task / Event / Receipt contract, capability declarations and routing, authorization gates, state and receipts, and a watchdog. Existing agents stay as executors — or as entry points.

## Four drivers, one contract

Goal-driven, event-driven, schedule-driven and workflow-driven (BPMN/DAG) work all become identified Tasks / Events and share the same Policy checks, state machine and Receipts. A workflow engine is a notation, not a reasoning engine.

## Core concepts

| Concept | Responsibility |
|---|---|
| Goal | The user's objective, boundaries and acceptance criteria |
| Task | One authorized unit of work: unique ID, input revision, owner, state |
| Source | An event stream (GitHub, messages, timers) translating events into Triggers |
| Trigger | One immutable event; the unit of audit and idempotence |
| Policy | Versioned admission and assessment rules |
| Mandate | What one acceptance grants: scope, strength, policy version |
| Executor | An existing agent / harness / workflow behind an adapter |
| Receipt | Execution evidence: status, output reference, evidence fingerprint, error code |
| Watchdog | Evidence-based monitoring; deduplicated alerts, escalated only on change |

## Status (2026-11-02)

| Capability | Status |
|---|---|
| Task / Event / Receipt minimal protocol | `mock` — offline prototype with unit tests, `experiments/event-bridge-v0.1/` |
| Event Bridge routing and deduplication | `mock` — in-memory, idempotence key = task_id + kind + input_revision |
| Watchdog anomaly surfacing | `mock` — state-based screening only |
| Cross-agent repository-creation relay (manual) | `verified` — archived in `docs/history/` |
| Persistence, leases, recovery | `design` |
| Real GitHub / agent adapters | `design` — verified per product before any status upgrade |
| Token and quality A/B benchmark | `design` — hypotheses, not results |

## Quick start (offline prototype)

```bash
git clone https://github.com/xingtu1996/xingtu-super-agent.git
cd xingtu-super-agent/experiments/event-bridge-v0.1
python3 bridge.py
python3 -m unittest discover -s . -p 'test_*.py'
```

## Extending with adapters

Every adapter declares five things in code and docs: `capability`, `authorization`, `permissions`, `quota`, `actual_transport` (`native` / `adapter` / `manual` / `unsupported`). Defaults: `dry_run=true`, `publish=manual`, `merge=manual`. A platform without an interface is `manual` — never presented as automated.

## Measuring success

A two-week A/B study is designed (not yet run): manual relay via GitHub versus protocol-based relay through the Event Bridge. Hypotheses to verify, not results: at least 70% fewer manual handoffs, at least 30% fewer high-capability model calls, zero duplicated side effects, no quality drop.

## License

MIT. See `LICENSE`. Chinese documentation is the primary entry point: [README.md](README.md).
