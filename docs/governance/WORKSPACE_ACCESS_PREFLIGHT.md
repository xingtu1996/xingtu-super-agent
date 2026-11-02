# XSA Work 工程工作区 / GitHub 主仓访问预检 v1.0

> 2026-11-02 真实问题复盘。状态：治理建议，**不是 Work/ChatGPT/Codex 的内建能力或已部署自动化**。本文件不包含私人绝对路径、Token 或工作区敏感数据。

## 问题

有一次 XSA Work 在当前目录下运行 Git 命令发现不是 Git 仓库，且 CodeGraph 检索无结果，于是返回 `blocked_on_repository_access`，没有读取主仓远端 PR/Issue。**当前工作目录不是 Git 仓库，不能推出远端 GitHub 仓库不可访问。** CodeGraph 无结果也不等于代码不可读。

## 七步执行策略

1. **能力发现**：记录本次执行真实可用的 GitHub 连接器、GitHub 网页/Computer Use、终端、`git`、`gh`、本地文件与网络。不要把云端 Work 当成具有全部本地 Mac 文件权限。
2. **远端优先**：在实际授权的接口中检查 `owner/repo` 的存在、可见性、默认分支、README、AGENTS、Commit、Open PR/Issue。GitHub Connector 可读时，不要求先 Clone；GitHub 文档类 PR 亦可通过授权连接器直接操作。
3. **检查本地目录**：`pwd`、`git rev-parse --show-toplevel`、`git remote -v`。仅在获授权的项目目录里发现已有 Clone，核对 origin 的完整 owner/repo。不因当前目录错误就误报整体阻塞。
4. **需要本地工作树才 Clone**：先确定所选路径不存在且权限/网络可用，再优先 `gh repo clone owner/repo <new-path>`，公开仓可 `git clone https://github.com/owner/repo.git <new-path>`。私有仓需要真实授权，不收集明文密钥，不把 Token 放 URL。禁止对非 Git 目录执行 `git init` 来冒充原仓，禁止覆盖/删除已有目录或重置未提交改动。
5. **完整 Preflight**：核对 `git remote get-url origin`、`git status --short --branch`、Open PR/Issue、PR changed files、任务 owner/branch/write scope。不同 Agent 修改同路径要先对账；禁止强推或盲合并。
6. **CodeGraph 降级**：图谱不可用时用 `git ls-files`、`rg --files`、定向 `rg -n`，或 GitHub 文件树/浏览器查看已有来源；不能把图谱缺失作为结束理由。
7. **真实阻塞才停止**：所有实际可用且获授权的访问渠道都不成功时，报告具体错误、已尝试通道和最小所需权限。若可读不可写，返回 `read_only_verified`、`write_permission_blocked` 和已读取的事实，不报告整体仓库不可访问。

## 必备回执

```yaml
project: XSA
primary_repo: owner/repo
runtime: local | cloud | browser | connector | unknown
cwd: unknown
current_dir_is_repo: unknown
repo_remote_verified: false
access_channel: unknown
clone_status: not_needed | reused | cloned | blocked | unknown
local_repo_path: unknown
origin_verified: false
codegraph_status: unknown
fallback_used: []
open_pr_checked: false
write_permission: unknown
blocker: none | explicit_failure_details
```

**注意**：提示词无法自动授予用户账户访问权限，也不能保证 GitHub 连接器能操作本地工作树。不得凭历史账号/截图判断本次工具连通性。

## 与其他 XSA 规范关系

- [会话与项目绑定规范](CONVERSATION_CONVENTION_V1.md)
- [模型/Agent 路由政策](MODEL_ROUTING_POLICY_V1.md)
- [Work 初始化任务模板](../../templates/WORK_SESSION_BOOTSTRAP.md)

**验收标准**：Work 不能仅因非 Git 当前目录/CodeGraph 无结果而标记整体仓库不可访问；必须展示远端与本地至少一种实际可用或被拒绝的访问证据，并明确可读、可写、可 Clone 这三种能力的边界。
