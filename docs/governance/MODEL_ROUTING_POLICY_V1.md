# XSA Model & Agent Routing Policy v1.0

> 2026-11-02 · **建议配置 / 不是实际路由部署**。本文件面向人类和专业 Agent 提供模型选型依据；`AGENTS.md`、YAML、Prompt 不会自动切换 ChatGPT Work 或 Codex 的模型。  
> 外部参考：[OpenAI Work & Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)、[usage/effort](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex)。各账户可用模型以 UI 和当前订阅为准。

## 1. 核心原则

- **按任务风险、复杂度和验证成本选模型，不按仓库名无条件上最强模型。**
- 高推理适用于首次未知环境、跨仓架构、高风险决策或多次失败；明确、可验证的整理与修补优先 Medium/Low。
- 先改善需求/输入/权限/测试，再升级模型；更强思考不能补足 GitHub 权限、缺失文件、错误数据或不可访问的 Agent 会话。
- 一个 Work 会话只选择真实 UI 支持的模型和思考强度；子 Agent 需要实证支持才标为实际启用，角色描述不是子 Agent 运行证据。
- **Work 和 Codex 使用相应的共享使用额度**；消耗取决于模型、任务规模、推理强度、执行步骤及 Fast 模式。不要宣称固定“多少条消息”或 Chat 永远零成本。核对 Settings → Usage。
- 质量优先且有证据：每次比较合格产物的成本，而不是单纯 Token 下降百分比。

## 2. 默认选择矩阵（若 UI 提供）

| 场景 | 首选 | 初始 effort | 什么时候升级/降级 |
|---|---|---|---|
| Chat 架构/战略/任务裁决 | ChatGPT GPT-6 | Medium；重大方案用 High | 简单讨论/归档用 Instant；只在证据充分且确实困难时增加 |
| XSA Work：新协议、授权、跨仓联调 | GPT-6.1 Sol | High（首次复杂任务）；后续 Medium | 重大难题/反复失败考虑 Astra Low/Medium（若可用且额度允许） |
| XF Work：FDE 知识仓初始化、跨仓研究 | GPT-6.1 Sol | 首次 High，稳定后 Medium | 资料收集/初稿交给 Terra Medium |
| Harness/SDD/CLI：工程实现及验证 | GPT-6.1 Sol | Medium；复杂联调 High | 一般格式/修补可选 Terra Medium |
| Skills 开发/回归 | GPT-6.1 Terra 或 Sol | Medium | 回归不稳定/安全缺陷 Sol High |
| Learn：摘要/索引/来源整理 | GPT-6.1 Terra | Low/Medium | 新理论与对抗分析用 Sol Medium |
| 内容/文章/视频的结构化整理 | GPT-6.1 Terra | Medium | 复杂选题取舍/证据冲突 Sol Medium/High |
| 定时/重复/分类任务 | 可用的 Luna 或轻量模型 | Low | 出现错误或需跨仓判断时升 Sol Medium |
| 安全边界/跨 Agent 故障纠偏 | GPT-6.1 Sol | High | 若 Astra 可用，可用 Low/Medium 作独立复核，仍需人工审批 |

**重要**：用户 2026-11-02 的 Work 截图确实显示 **GPT-6.1 Sol「高」**，只能证实那一次界面选择，不能推断其他会话能自动调用同一模型。若对应模型未开放，用 UI 实际可选的较新 Sol/Terra 模型替代；不要编造 model ID 或修改未验证的 Codex `config.toml`。

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
model_recommended: "GPT-6.1 Sol"
model_actual: "verified-from-ui-or-log-or-unknown"
reasoning_recommended: medium
reasoning_actual: "high-or-medium-or-unknown"
why_selected: "cross-repo design and validation"
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
