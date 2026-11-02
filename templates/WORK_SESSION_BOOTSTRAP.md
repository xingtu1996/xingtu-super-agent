# XSA Work 会话初始化契约模板（新建时粘贴并按项目替换）

> 此模板供 ChatGPT Work、Muse、Codex 与人工使用，不是 ChatGPT 创建新会话的 API；所有权限须以正在使用的平台为准。不要为正式项目省略主仓与 PR 检查。

## 会话元数据

会话标题：`<PROJECT> (work)｜<任务名>`

- Project: `<PROJECT>`
- Primary repository: `<owner/repo>`
- Coordination repository（可选）：`xingtu1996/xingtu-super-agent`
- Task goal: `<要解决的问题>`
- Output: 独立分支 + Draft PR + 验收回执
- Recommended model / effort: **Plus Work/Codex 默认 GPT-6 Luna / Medium**（专业 Chat 在 2026 年 11 月默认 GPT-6 / High；12 月额度规则切换后人工复核）；综合能力不足时试用 GPT-6.1 Terra / Medium 或将 GPT-5.6 Terra / Medium 用作同任务对照，不认为旧版本天然节省额度。Pro 或高额度任务可按复杂度升级。详见 [XSA Model Routing Policy](../docs/governance/MODEL_ROUTING_POLICY_V1.md)。运行前须在实际 UI 选择并在日志记录，不是自动路由。
- Mode: Work（执行）或 External-Agent（Muse/Codex），根据实际选择。

## 任务内容

你是当前项目的工程执行负责人。先获取仓库事实并核验当前任务范围，再实施可逆、已授权的工作。

**Preflight：**读取仓库 `README.md`、`AGENTS.md`、默认分支、开放 PR/Issues、同日其他 Agent 的分支；记录与本任务同文件或相同副作用的重叠。如果已有同目标 Work/Agent 活跃，不得覆盖。先报告冲突和推荐的唯一主实施分支。

**Execution：**按目标拆成可验收小任务。对研究、测试、文档可按环境支持并行；写入任务需要明确 owner、branch、write scope。遵循外部平台的授权/审批要求。只更改已授权仓的独立分支，不强推、不自动合并、不自动发布、不泄露私有信息。

**Validation：**根据实际任务跑测试/链接校验/文档结构核验；记录真实测试命令、结果或 `not_run`；不要用“提示词写了”代替运行证据。

**Handoff：**最后用简体中文按「结论 → 变更文件 → Commit/PR → 验证 → 冲突/风险 → 后续动作」输出。

交接内容至少包含：
```yaml
project: "<PROJECT>"
primary_repo: "<owner/repo>"
task_id: "<actual-or-pending>"
owner: "<actual>"
branch: "<actual>"
model_actual: "<actual-or-unknown>"
reasoning_actual: "<actual-or-unknown>"
status: "planned|running|blocked|review|accepted"
pr_url: ""
commit_sha: ""
tests:
  run: []
  not_run: []
conflicts: []
approvals_pending: []
```

**模型与任务身份校验**：若本次 Work 会话标题暗示的项目与正文 `primary_repo` 不一致，必须在写入前报告并纠正绑定，不能猜测。标题修改只作为导航修复；以用户确认的任务契约与实际授权为准。

**结束标准**：有可核验成果或清晰的失败原因，而不是以消息结束、动画停止或自称已完成作为验收。
