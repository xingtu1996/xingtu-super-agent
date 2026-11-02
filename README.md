# XSA · XingTu Super Agent

> Research Preview · 当前阶段是设计与离线原型，不是可直接连接所有 Agent 的生产系统。文中所有能力都标注状态：`design`（仅设计）/ `mock`（离线模拟）/ `verified`（有可核对证据）/ `production`（生产可用）。请勿把前三种读成第四种。

**One Goal. Many Agents. Verified Outcomes.**

XSA 是面向目标、工具中立的 Super Agent 协作系统。它借鉴 DeepSeek Super Agent 的设计哲学，复用现有的 LLM、Harness、Agent、Skills 与工具，做的是它们之间缺失的那一层：跨 Agent 的专业分工、事件驱动协作、任务编排、Watchdog 监控、执行回执与可验证交付。

**Super Agent 能力体系 ≈ LLM + Harness + XSA 协同编排扩展**

这是行途的工程组合表达，不是 DeepSeek 官方公式，也不宣称 DeepSeek 的 Super Agent 缺少这些模块。

## 1. XSA 是什么，解决什么问题

一个真实目标很少在一个工具里闭环：方案在一个聊天里产生，代码在另一个 Agent 里写，成果进 GitHub，审核又回到第一个聊天。工具越来越多，用户本人却变成了它们之间的消息队列：手工复制目标、回填结果、确认版本、追问进度。

XSA 解决的是这一层问题：目标一致性、任务状态、授权边界、执行回执、失败恢复与人的注意力成本。它不生产模型能力，它让已有能力围绕同一个目标接力，并且每一步都留下可核对的证据。

## 2. 为什么现有 Agent 还需要跨工具协作

不同 Agent 的能力面天然不同，而且这种差异是结构性的，不是谁「不够强」：

- 规划、分析、审核型环境可能没有写接口。本仓的创建过程就是一个真实案例：目标在 ChatGPT 对话中形成，ChatGPT 当前连接没有创建 GitHub Repository 的接口；具备 GitHub 操作能力的 Personal Agent 接手执行；成果与证据落在 GitHub，再回到审核方验收。完整记录见 `docs/history/`。
- Coding Agent 擅长代码与测试，但不天然拥有内容生产、私有资料与发布渠道的上下文。
- Personal Agent 能操作用户授权的账号与设备，但不应替代独立审核。

XSA 的立场：一个 Agent 没有执行能力，就把任务交给具备该能力的 Agent；执行完成后提供结构化证据，再由其他 Agent 验收并继续推进。这比「让一个模型变得无所不能」更有工程价值。XSA 不突破任何平台的授权、安全或接口限制，只通过用户授权的适配器组合已有能力。

## 3. XSA 与 DeepSeek Super Agent 的关系

- 启发来源：DeepSeek 官方研究原型 [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) 与 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。其设计哲学（以人的注意力成本衡量一切）、领域模型（Source / Trigger / Policy / Mandate / Executor 等）与架构分层（Engine / Store / Outbox）是 XSA 的主要参考，见 `docs/REFERENCES.md`。
- XSA 借鉴其思想并在跨产品协作场景做独立实现；当前实验代码为独立最小实现，未复制上游代码。
- 不宣称官方合作、官方衍生、已验证的兼容性，也不存在双方共同发表的学术论文。上游自述为 research prototype，不是生产级产品。

## 4. 为什么不重新开发一个 Coding Agent

执行器生态已经成熟：Claude Code、Codex、OpenCode、各类 Work Agent 与现成 Super Agent 各有所长。重复造一个执行器，成本最高、差异最小。XSA 只补最小控制平面：统一的 Task / Event / Receipt 契约、能力声明与路由、授权门禁、状态与回执、Watchdog。执行继续复用已有工具，它们都可以成为 XSA 的 Executor，也可以成为用户的入口。

## 5. 四种驱动如何协同

目标驱动、事件驱动、定时驱动、流程驱动（BPMN/DAG）不是四套系统，而是四种任务来源。它们统一转成带身份的 Task / Event，走同一套 Policy 校验、状态机与 Receipt 回执：

- 目标驱动：用户直接提出 Goal，系统分解为 Task。
- 事件驱动：Source 产生 Trigger（如新 PR、CI 结果、消息），经评估后生成 Task。
- 定时驱动：Registry 中的排期到点生成 Task（如每日巡检）。
- 流程驱动：BPMN/DAG 描述强约束的固定流程，节点即 Task；流程引擎是表示法，不是自主推理引擎。

## 6. 核心概念与职责

| 概念 | 职责 |
|---|---|
| Goal | 用户目标、边界与验收标准，是一切 Task 的来源与最终裁判 |
| Task | 一份已授权的工作单元：唯一 ID、输入版本、负责人、状态、审批要求 |
| Source | 事件来源（如 GitHub、消息、定时器），负责把外部事件翻译成 Trigger |
| Trigger | 一条不可变的事件记录，是审计与幂等的单位 |
| Policy | 版本化的准入与评估规则：谁可以通过哪个 Source 发起工作、强度如何 |
| Mandate | 一次接受所授予的授权：范围、强度、所依据的 Policy 版本；不可由模型推断扩大 |
| Executor | 实际执行 Task 的已有 Agent / Harness / 工作流，通过适配器接入 |
| Receipt | 执行回执：状态、产物引用、证据指纹、错误码；没有回执不算完成 |
| Watchdog | 按证据巡检：心跳、租约、产物新鲜度、回执一致性；相同异常去重，只在恶化或需要人动作时提醒 |

领域语义与 DeepSeek 原型的对应关系见 `docs/ARCHITECTURE.md`。

## 7. 当前状态（2026-11-02）

| 能力 | 状态 |
|---|---|
| Task / Event / Receipt 最小协议 | `mock`：离线原型与单元测试，见 `experiments/event-bridge-v0.1/` |
| Event Bridge 路由与重复事件去重 | `mock`：内存实现，幂等键 = task_id + kind + input_revision |
| Watchdog 异常发现 | `mock`：仅按状态筛查 failed / expired / approval_required |
| 跨 Agent 人工接力建仓案例 | `verified`：本次建仓全过程留档于 `docs/history/`（人工转发，非自动接力） |
| 持久化队列、租约与恢复 | `design` |
| 真实 GitHub / Agent 适配器 | `design`：按产品逐项验证后才升级状态 |
| BPMN/DAG 驱动 | `design` |
| Token 与质量 A/B 基准 | `design`：研究假设见第 10 节，未实测 |

## 8. 快速开始（离线原型）

```bash
git clone https://github.com/xingtu1996/xingtu-super-agent.git
cd xingtu-super-agent/experiments/event-bridge-v0.1
python3 bridge.py        # 演示：两条任务分别由模拟 Muse / Codex Worker 执行并生成回执
python3 -m unittest discover -s . -p 'test_*.py'   # 3 条测试：内容路由与去重、审核回执指纹、失败与审批门禁
```

## 9. 扩展 Adapter

新增适配器必须在代码与文档中同时声明五项：`capability`（能做什么）、`authorization`（用户如何授权）、`permissions`（所需权限范围）、`quota`（额度与成本口径）、`actual_transport`（native / adapter / manual / unsupported）。默认 `dry_run=true`、`publish=manual`、`merge=manual`；没有接口的平台只能声明 manual（人工交接），不得冒充自动互通。模板见 `templates/`。

## 10. 如何衡量效果

准备两周 A/B 实验（设计，尚未运行）：

- A 组：ChatGPT → GitHub → Muse / Codex → GitHub → ChatGPT 的人工交接。
- B 组：通过 XSA 任务协议与 Event Bridge 自动交接。

研究假设（待验证，不是成绩）：人工交接次数下降至少 70%；高能力模型调用下降至少 30%；重复执行副作用为 0；成果质量不下降。统一记录人工交接次数、总耗时、实测 Token 与费用、质量评分、重复副作用与恢复时间，没有真实计量时一律标「待测」。

## 11. 与行途其他开源仓库的协作

XSA 是产品主线，其他仓库保持独立职责，只通过协议与 PR 演进，不批量改动：

| 仓库 | 角色 |
|---|---|
| xingtu-harness | 工程资产及安装聚合 |
| xingtu-scheduled | 任务 Registry（定时驱动的登记面） |
| xingtu-skills | 能力与 Skill 目录 |
| xingtu-hooks | 本地事件采集 |
| xingtu-cli | 命令行入口 |
| xingtu-learn | 成本实验与知识积累 |
| xingtu-vault | 私有真实验证场景（不是开源依赖） |

## 12. 开发档案

本项目把协作过程本身当作资产：`docs/history/` 保存脱敏后的会话材料、开发叙事、架构决策、实际使用的提示词、架构图与证据索引。第一个公开案例就是本仓的创建过程，见 `docs/history/narratives/`。

## 安全与治理

不读取未经授权的聊天数据，不转存密钥，不自动合并 PR、不自动群发、不执行未经授权的破坏性操作。细则见 `SECURITY.md`、`AGENTS.md`、`CONTRIBUTING.md`。

## 许可证

MIT，见 `LICENSE`。引用上游思想与文档时保留出处；如未来使用上游代码，将单独核对其许可证与署名义务。
