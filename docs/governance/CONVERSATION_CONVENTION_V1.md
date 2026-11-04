# XSA Conversation & Model Routing Convention v1.0

> 日期：2026-11-02 · 状态：**提议，待人工审核的治理规范**（不等于 XSA 自动会话绑定/模型路由已上线）。  
> 来源：XSA Case 003 实操截图、用户对会话命名的明确裁决及当日 GitHub 仓库/PR 只读盘点。  
> 目标：减少跨会话上下文重述、跨 Agent 重复执行和无证据的完成声明，兼顾执行质量与人类注意力成本。

## 0. 三个原则

1. **Chat 负责规划与裁决；Work 负责多步骤工程实施；GitHub 负责保存状态和成果。** 这是团队**默认角色分工**，不是 Chat/Work 产品技术硬限制：Chat 在授权连接器可用时也可以产生 GitHub 文档 PR；Work 也可能进行研究与规划。
2. **一个专业会话绑定一个主仓；一个仓库可承载多会话；不强制每个仓都开一对 Chat+Work。** 长期 Chat 用于持续领域讨论，Work 按具体阶段/任务按需新建。普通非项目聊天不用绑定。
3. **聊天标题是导航，任务契约是事实，远端 Commit/PR 是完成证据。** 模型/权限/状态都要从真实 UI 与运行环境确认，不能从提示词中的声明推断。

## 1. 命名规则

`<项目缩写> (<chat|work>)｜<专业职责或当前任务>`

例：`XSA (chat)｜Super Agent 工程总控`、`XSA (work)｜Super Agent 工程实施`、`XF (chat)｜FDE 知识与工程实践`、`XF (work)｜FDE 工程建设`。

持久主 Chat 应稳定；不同阶段的 Work 可附任务短名（如 `XSA (work)｜DSH Source 接入 T1`），但任务必须通过 `task_id` 关联，而非把标题当唯一键。已存在的 Case 003 显示 `XSA (work)` 标题下出现了 `XF (work)` 的 FDE 任务：正式任务启动需比较标题、project、primary_repo，冲突时提示人类改正；**不能擅自改目标仓**。

## 2. 当前开源矩阵的会话规划（基于已存在仓库的职责）

| 会话域 | 长期 Chat 推荐 | Work 何时创建 | 公开主仓与关联资产 |
|---|---|---|---|
| XSA Super Agent 总控 | **XSA (chat)｜Super Agent 工程总控** | XSA (work)｜工程实施/协议联调 | `xingtu-super-agent`；关联 DSH、Orca、Orka、Harness |
| XF FDE 理论/实践/工具 | **XF (chat)｜FDE 知识与工程实践** | XF (work)｜FDE 工程建设 | `xingtu-fde`；关联 articles、skills、sdd |
| XE AI 工程化 | XE (chat)｜AI 工程化方法 | 实施标准/样板/质量门禁时建 | `xingtu-ai-engineering`；关联 sdd、harness |
| XH Harness 工程资产 | XH (chat)｜Harness 与工具治理 | 安装脚本/CLI/Hook/插件联调时建 | `xingtu-harness`；关联 `xingtu-hooks`、`xingtu-cli`、`xingtu-mcps`、`xingtu-sdd` |
| XS Skills 研发 | XS (chat)｜Skills 能力与回归 | Skill 新建/批量回归时建 | `xingtu-skills`；关联 `dsh-xingtu-skills` |
| XL 学习与实验 | XL (chat)｜学习研究与实验 | 可复现实验/批量整理才建 | `xingtu-learn`；结果可反哺各主仓 |
| XO 自动化运维 | XO (chat)｜调度与健康治理 | Registry/CI/监控修复时建 | `xingtu-scheduled`、`xingtu-workflows`；一次任务必须选一个主仓 |
| XC 内容与出版 | XC (chat)｜内容与运营策略 | 发布包/素材加工/校验时建 | 公共发表归档 `xingtu-articles`；生产/草稿等私有仓不写入公开绑定清单 |
| XV 视频 | XV (chat)｜视频工程与选题 | 视频/配音/剪辑交付时建 | 视频工作区依任务权限选定，不自动公开私有仓 |
| XWeb 网站与开源门面 | XWeb (chat)｜网站与开源矩阵 | 站点/组织主页/部署实施时建 | 公开门面仓按实际任务选择；私有站点代码不在公共 registry 暴露 |
| XPub 内容资产分发 | 默认归 XC，不必单独长期 Chat | 发布包/日历/平台专用任务时建 | 使用具体已授权仓，尊重人工发布审核 |

**最少先保留 XSA 和 XF 的两对会话，其余按需求增建**。所有仓均可被检索，但不应为 40+ 仓一次性开 80+ 个空会话。

## 3. 任务绑定契约（建议机器读取的设计稿）

```yaml
schema: xsa.session-binding.v1  # 提议规范，非平台原生字段
project: XF
mode: work                    # chat | work | external-agent
conversation_label: "XF (work)｜FDE 工程建设"
primary_repo: "xingtu1996/xingtu-fde"
related_repos: ["xingtu1996/xingtu-super-agent"]
task_id: "TBD-issued-by-task-registry"
intent: "FDE 知识与工程体系建设"
owner: "assigned-agent-or-human"
write_scope: ["docs/**", "registry/**", "templates/**"]
branch: "feat/xf-foundation-YYYYMMDD"
read_first: ["README.md", "AGENTS.md", "open PRs", "task ledger"]
permission_scope: "task-and-repository-limited"
approval_gate: ["merge", "publish", "permissions", "delete", "sensitive-data"]
model_policy_ref: "docs/governance/MODEL_ROUTING_POLICY_V1.md"
status: "planned"              # planned | running | blocked | review | accepted
evidence:
  issue_url: ""
  draft_pr_url: ""
  commit_sha: ""
  tests: []
  human_approval: ""
```

契约应随具体任务生成，不把带个人身份、平台会话 ID、OAuth token 的内容提交公开仓。用户在 ChatGPT UI 新建会话本身**不能由 GitHub 文件自动完成**；XSA 自动 Session Binding 属于待开发能力。

## 4. 执行前必须遵循的规则

**Preflight**：核对目标仓是否存在/是否私有、读取 README/AGENTS、检索开放 PR 与正在运行的其他 Agent、比较任务文件范围；确认 branch 及 owner 后再写入。前述检查不等于自动获取 ChatGPT/Muse 的实时工作状态，未知写 unknown。

**Conflict Guard**：不同 Agent 可在隔离分支上并行只读/互不重叠的写入；**同一文件、同一副作用、同一任务**不能直接双写。若冲突，先按 PR 的 changed-files 对账、查看 diff/commit，再选一个主实现；严禁 force-push、自动覆盖和双合并。锁/lease 在外部持久化未实现时只能靠人类协调，不能声称可靠互斥。

**Receipts**：`started` ≠ `delivered` ≠ `accepted`。只有远端产物、SHA、PR、实际测试或明确未测试说明可认定交付；合并与发布必须获得审核。

**Attention**：在已授权任务范围内尽量连续执行；涉及 GitHub Connector / 浏览器 / 生产发布的系统确认弹窗仍必须遵守，不采用绕过审批脚本。

## 5. 实际案例：XF 并发启动重叠

2026-11-02 只读检查显示 `xingtu1996/xingtu-fde` 已成为 Public 仓，存在 [PR #1](https://github.com/xingtu1996/xingtu-fde/pull/1)（FDE 工程建设）和 [PR #2](https://github.com/xingtu1996/xingtu-fde/pull/2)（从 XSA 启动包迁入）。两个 PR 的文件范围**大量重叠**，包含 `README.md`、`AGENTS.md`、`docs/KNOWLEDGE_MAP.md`、`registry/REPOS.md`、`cases/CASE-001-FUND-REPORT.md` 等。这是“聊天命名不等于任务锁”的直接证据。

处理建议：两个 PR 暂不自动合并。指定一个 owner 做文件级 diff 与内容去重，保留各自来源/测试记录，再形成单一可审核的集成分支或有序合并策略。以用户真实指派和 PR 内容决定主次，不根据 PR 号推断质量。

## 6. 治理实现顺序（减法路线）

P0：使用已有 GitHub Issues/Draft PR + 标准命名 + 最小 Task Contract；先解决人肉重复转述与文件冲突。

P1：在 XSA 形成轻量、公开可读的项目映射索引；扫描相同 repo/文件作用域的开放任务，给出冲突提示。

P2：由经授权的 Source 接收 GitHub 事件，建立 Task/Receipt；沿用 DSH Super Agent Source、Outbox 和 Policy 设计或 Orca/Orka 适配器，不重复造引擎。

P3：按真实能力验证自动接力，补 Session Binding/跨 Agent 任务租约和最低必要授权，不把 GUI 标题解析当安全依据。

## 7. 验收

- 新会话不看历史聊天也能从主仓定位任务、策略、PR 和负责人。
- 同一任务若目标仓/会话名不一致，能被检测、提示与纠正。
- 多 Agent 对同一目标的冲突在合并前被发现。
- 所有完成状态附可验证 PR/Commit/测试，未知清楚标注。
- 模型推荐与实际可用/选定模型分开；没有真实日志不声称省 Token。

参考：[XSA Case 003](https://github.com/xingtu1996/xingtu-super-agent/pull/5)、[DSH 模型/领域研究](https://github.com/xingtu1996/xingtu-super-agent/pull/2)、[DeepSeek Super Agent 原型](https://github.com/deepseek-ai/dsh-superagent-prototype)。
