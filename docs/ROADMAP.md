# 路线图

> 全部条目均为计划（`design`），版本号表示阶段，不表示已发布。每阶段完成时以证据（提交、测试、回执）升级状态词。

## v0.1 离线协议与模拟器（当前）

- Task / Event / Receipt 最小协议与内存版 Event Bridge。`mock`
- 离线模拟 Worker（content / code_review）与 3 条单元测试。`mock`
- 独立产品仓与开发档案建立。`verified`

## v0.2 持久化与只读适配器

- 任务与回执的事务持久化、租约与崩溃恢复。
- 首个只读 GitHub Adapter：读取 PR / 提交 / CI 状态生成 Trigger 与证据，不执行写操作。
- Watchdog 接入真实产物新鲜度检查（文件日期、大小、回执引用）。
- Coordination Guard 原型：任务所有权登记、文件范围声明、写入前冲突检测（见 ADR-003 与 `docs/ARCHITECTURE.md`）。
- 复用评估：先试用 Orca 的编排能力（Run / Task / Dispatch / operationId）验证需求，再决定自研范围；深读 Orka 的 Gateway → Inbox → Task → Worker → Outbox 链路作为协调层参考。评估结论以实测为准，未验证前不写成已集成。

## v0.3 授权真实接力

- 在用户显式授权下接入第一个真实 Worker 适配器，完成一条端到端接力链。
- 人工转发与自动接力的 A/B 对照实测（方案见下）。

## v1.0 可安装模板

- 第三方可安装的模板与稳定接口：默认只读、默认 dry_run、配置不依赖行途私有路径与账户。
- 适配器兼容矩阵与能力声明规范定版。

## 两周 A/B 实验（v0.3 前完成设计，`design`）

- A 组：ChatGPT → GitHub → Muse / Codex → GitHub → ChatGPT 的人工交接。
- B 组：通过 XSA 任务协议与 Event Bridge 自动交接。
- 研究假设（待验证，不是成绩）：人工交接次数下降至少 70%；高能力模型调用下降至少 30%；重复执行副作用为 0；成果质量不下降。
- 统一计量：人工交接次数、总耗时、实测 Token / 费用、质量评分、重复副作用、恢复时间。无实测数据时标「待测」。

## 跨仓演进

XSA 只提出协议、兼容矩阵与跨仓 SDD；xingtu-harness、xingtu-scheduled、xingtu-skills、xingtu-hooks、xingtu-cli、xingtu-learn、xingtu-vault 保持独立，任何兼容升级在各自仓库单独走 PR，不批量修改，更不触碰生产定时任务与发布流水线。
