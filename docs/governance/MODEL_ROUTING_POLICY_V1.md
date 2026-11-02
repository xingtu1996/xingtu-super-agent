# XSA Model & Agent Routing Policy v1.2

> 2026-11-02 · **建议配置 / 不是实际路由部署**。本文件面向人类和专业 Agent 提供模型选型依据；`AGENTS.md`、YAML、Prompt 不会自动切换 ChatGPT Work 或 Codex 的模型。  
> 外部参考：[OpenAI Work & Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)、[usage/effort](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex)。各账户可用模型以 UI 和当前订阅为准。

## 1. 核心原则

- **按任务风险、复杂度和验证成本选模型，不按仓库名无条件上最强模型。**
- 高推理适用于首次未知环境、跨仓架构、高风险决策或多次失败；明确、可验证的整理与修补优先 Medium/Low。
- 先改善需求/输入/权限/测试，再升级模型；更强思考不能补足 GitHub 权限、缺失文件、错误数据或不可访问的 Agent 会话。
- 一个 Work 会话只选择真实 UI 支持的模型和思考强度；子 Agent 需要实证支持才标为实际启用，角色描述不是子 Agent 运行证据。
- **Work 和 Codex 使用相应的共享使用额度**；消耗取决于模型、任务规模、推理强度、执行步骤及 Fast 模式。不要宣称固定“多少条消息”或 Chat 永远零成本。核对 Settings → Usage。
- 质量优先且有证据：每次比较合格产物的成本，而不是单纯 Token 下降百分比。

## 2. 默认模型策略：Plus 轻量统一，Pro 按需升级（需界面实际支持）

**2026-11-02 用户裁决**：Plus 套餐重视「经久耐用」，所有专业 Work / Codex 统一优先 **GPT-6 Luna + Medium（中）**，不因项目属于 XSA、XF、Harness 或 Skills 就自动升到 Sol / Terra / Astra；专业 Chat 在 2026 年 11 月优先 **GPT-6 + High**，12 月规则变化后按实际 Usage 手动调整。这是推荐而非系统配置，尚无实际模型成本 A/B 结果。

| 任务场景 | 默认选择 | 例外与升级 |
|---|---|---|
| **专业 Chat：2026 年 11 月的研究、审核、架构裁决** | **GPT-6 · High** | 目前不占用单独的 Work/Codex 执行池，但仍可能有 Chat 自身限额；12 月以实际规则手动复核 |
| 所有专业 Work / Codex：常规开发、文档、GitHub 操作、Skills、研究整理 | **GPT-6 Luna · Medium** | 已具备清晰任务契约、测试和权限时保持默认 |
| 短小重复任务 | Luna · Low（若 UI 提供） | 输出质量不达标再回 Medium |
| 难以解决的代码故障、跨仓架构、安全与关键评审 | 首先改善输入/证据/测试；其次 Luna · High（若 UI 提供） | 需要更强能力再临时选 Sol · Medium/High、Astra · Low/Medium（须账户可用且额度允许） |
| Pro / 高额度套餐 | 可以继续 Luna · Medium，或按任务直接用 Sol · Medium | Astra 留给高难度任务；Pro 不等于无限用量 |

**升级认知｜新版本 ≠ 必然更贵，旧版本 ≠ 必然更省额度。** 用户重视「好用、稳定、单个合格成果消耗低」，因此不能根据 GPT-5.6 / GPT-6 的版本号简单判断。官方 [Enterprise token-based rate card](https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing) 中，标准 Work/Codex 费率（输入/输出每百万 Token）为 GPT-6 Luna $0.10/$0.50、GPT-5.6 Luna $0.20/$1.20、GPT-6.1 Terra $1/$5、GPT-5.6 Terra $2/$12、GPT-6.1 Sol $2/$10、GPT-5.6 Sol $4/$20。**这属于 Enterprise 合同费率，不能拿来直接换算 Plus 的五小时/每周限额**，只说明「老型号就省」是错误推断。

Plus 正式默认仍保留 **GPT-6 Luna · Medium**；需更强综合能力时优先尝试 **GPT-6.1 Terra · Medium**，也可以将 **GPT-5.6 Terra · Medium** 作为同任务 A/B 对照，不能假定 5.6 更省额度。GPT-5.6 Sol 是更强的旧系列选项，不属于廉价默认。模型优先级以**最终通过验收的成果成本**决定，而非单次消息/推理长度。所有候选以当前 UI 可选为准。

**Chat 过渡期**：OpenAI [使用额度说明](https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits) 表示 2026 年 **12 月起 Plus、Pro、Business 的 ChatGPT 与 Codex 额度合并**，Instant Chat 不消耗合并额度。11 月专业 Chat 优先 GPT-6 · High，直到用户届时**人工复核并决定调整**，不做自动降档，也不声称当前 Chat High 无任何独立限制。Work/Codex 始终独立按自身额度治理。

**建议的轻量 A/B（仍未执行）**：FDE 来源归档（简单）、GitHub PR 差异审核（中等）、XSA 跨仓冲突裁决（困难）；固定输入、验收标准及权限，分别运行 Luna Medium、6.1 Terra Medium、5.6 Terra Medium（若可用），记录实际 Usage、时长、缺陷、返工次数与可接受结果。先少量测试，避免为省额度反而重复消耗。

**默认不切模型、不切思考强度**：Luna Medium 贯穿日常；只遇到清晰的复杂度或失败信号才升级。若账号/工作区没有 Luna 或没有其 Medium 选项，以实际模型选择器为准，记录替代选项，禁止假装已启用。

官方用量指导说明：不同模型、思考强度、任务规模、Fast 模式影响 Work/Codex 共享额度；**Medium 是折中，High 可能更贵且不一定更好**。Plus 官方所列 Luna 与 Sol 本地消息范围是估计，不是保证用量或可无限发送的承诺。[官方 Work/Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex) · [用量与推理](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex)。

**历史实例不是新默认**：2026-11-02 的 XF Work 截图/日志显示一次 GPT-6.1 Sol · High，证明的是历史实测，不代表以后统一路由策略。已运行的任务不因本政策更改而被追溯标记为 Luna。

## 3. 任务角色与责任

- Planner / Architect：依据仓库和证据制定目标、验收、风险和工作拆分；在长会话 Chat 或第一次复杂 Work。
- Researcher：只读收集项目素材、第三方来源、许可证和差异；适合轻量/Medium。
- Builder：在有 ownership 的独立分支实施变更；限定明确 write scope。
- Reviewer：对实现进行反例检查、隐私/权限审阅、验证 PR 和测试回执。最好与 Builder 分开，但若产品不支持不同子 Agent 模型，绝不虚报并行。
- Operator / Gate：人类拥有高风险决策，执行工具自身权限机制必须生效；工作开始、状态、失败和验收经 GitHub 留证。

## 4. 模型升级门禁

触发升级（选其一）：输入/文档补全且尝试仍失败 ≥2 次；架构依赖高、设计影响多仓；代码安全与真实隐私风险；评审出现无法消解的事实冲突。

先拒绝假升级：缺登录授权、GitHub 目标 repo 不存在、未读 README、没有测试环境、构造了不真实的执行成功、只想让输出更长。此类问题要修复数据/权限/环境，而非切模型。

## 5. 记录但不伪造额度

```yaml
task_id: "user-or-task-registry-issued"
project: XSA
experience: work            # chat | work | codex | muse | dsh
model_recommended: "GPT-6 Luna"
model_actual: "verified-from-ui-or-log-or-unknown"
reasoning_recommended: medium
reasoning_actual: "medium-or-high-or-unknown"
why_selected: "Plus default: durability / quality balance"
agents_real: []              # only actually instantiated workers
usage_source: "Settings->Usage / platform-log / unknown"
usage_actual: unknown
time_spent: unknown
status: running
output: {pr: "", commit_sha: "", tests: []}
accepted: false
```

未经真实计量不要把 “Medium 省 30%” 写成已证实结论。只有对同类任务、同质量标准、同数据输入做 A/B，才能比较合格结果成本。

## 6. Repo 级文档放置策略

各专业仓保留简短 `AGENTS.md` 的链接和一行默认建议；XSA 保持上述**中心规范**作为候选源头；涉及业务特有的模型例外写入该专业仓 `docs/engineering/MODEL_ROUTING.md`，不把全公司/全部仓的模型偏好复制出多份。这是模型推荐协议，**不是自动化开关**。
