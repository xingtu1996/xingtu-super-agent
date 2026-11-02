# AGENTS.md · XSA 协作规范

本文件是所有在本仓工作的 Agent（不限厂商）与人类贡献者的共同规范。冲突时以用户（仓库所有者）的最新明确指令为准。

## 项目定位

XSA 是跨 Agent 协作的最小控制层：Task / Event / Receipt 契约、能力路由、授权门禁、回执与 Watchdog。它不替代任何 Agent、Harness 或工作流引擎。设计来源与借鉴关系见 `docs/REFERENCES.md`，不得宣称与 DeepSeek 官方合作或已验证兼容。

## 状态词（强制）

一切能力描述必须使用四级状态，禁止混淆：

- `design`：只有设计文档，没有可运行实现。
- `mock`：离线模拟实现（如内存版 Event Bridge），不接真实平台。
- `verified`：有可核对证据（提交、测试输出、回执）支撑，且证据已链接。
- `production`：在真实授权环境持续运行并通过验收。

README、文档与 PR 描述中，未达到 `verified` 的能力不得使用「已支持 / 已实现」措辞。

## 工作流程

1. 先有 Issue 或 SDD，再开隔离分支；禁止直接推送 `main`。
2. 变更走 Draft PR → 独立审核 → 人工合并。Agent 不得自动合并任何 PR。
3. 每个 PR 必须给出：变更内容、动机、测试结果（命令与输出摘要）、证据链接、状态词变更说明。
4. 跨仓事项在本仓只写计划与协议；对其他仓库的修改必须在该仓单独走 PR，不批量改动，不触碰任何生产定时任务与发布流水线。

## 授权与安全红线

- 只通过用户已授权的适配器调用外部能力；适配器必须声明 capability / authorization / permissions / quota / actual_transport。
- 授权（Mandate）不能由模型推断或扩大；状态转换不是授权。发布、合并、删除、群发等高风险动作永远单独等待人工批准。
- 仓库内禁止出现：密钥、Token、Cookie、私有账号凭据、支付信息、真实手机号、个人邮箱、未脱敏的私人会话与设备绝对路径。公开身份统一使用「行途 XingTu」。
- 默认值纪律：`dry_run=true`、`publish=manual`、`merge=manual`。

## 证据纪律

- 「已完成」必须以文件、提交 SHA、测试输出或回执为据；无证据的结论标 `unverified`。
- 数字（耗时、Token、成本、提升比例）必须来自实测；研究目标与假设必须显式标注为假设。
- 历史材料按 `docs/history/CONVERSATION_ARCHIVE_POLICY.md`（迁移自实验期规范）分 transcripts / narratives / decisions / prompts / diagrams / evidence 六类归档；没有可核对来源时不伪造逐字稿。

## 代码约定（现阶段）

- 离线原型位于 `experiments/event-bridge-v0.1/`，保持零依赖、无网络、无生产写入。
- 新增代码先补测试；协议变更先改 SDD 与 `templates/` 中的契约模板，再改实现。
- 提交信息用简体中文或英文均可，但必须说明动机；禁止无说明的批量提交。
