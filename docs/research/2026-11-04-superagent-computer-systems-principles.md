# XSA 研究｜Super-agent 与经典计算机系统的 14 个思想

> 更新：2026-11-04｜状态：研究/设计输入，**不是已部署或生产验收**。
> 目标：从 DeepSeek 官方架构探索抽取可验证原则，用于 XSA 的最小设计；不把每个比喻都说成官方实现。
> 事实分层：[A] 作者原文直接描述；[B] 经典技术原理或有外部文献；[C] 我们对 XSA 的类比/延伸；[D] 待本地实测。

## 结论

DeepSeek 的重要贡献不是发明新理论，而是将**调度、事件路由、上下文缓存、异步执行、状态持久化和故障恢复**组合到 Agent 系统里，使人不必手动管理多个 Session。XSA 已有的 Chat → Work/Muse/Codex → GitHub 工作流符合方向，但**当前 GitHub 是事实与验收层，不是自动任务调度器、数据库或可靠消息队列**。不能把用户手工转发写成已实现的事件驱动闭环。

官方原始线索：
- 官方 DeepSeek Harness 文章：[Exploring Super-agent Design: Towards a More Autonomous Agent System](https://x.com/DeepSeekHarness/status/2116857257245987236)（X 英译；文章提示原文中文，属于设计探索，不等于既有 DSH 产品能力）。
- 对照可读版：[英文文章镜像](https://xitter.cf/DeepSeekHarness/article/2116857257245987236)；镜像不是新的作者身份。
- 官方代码：[deepseek-ai/dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype)；README 明确是 MIT 研究参考原型，公开版与内部版不同、部分机制尚未实现。
- 设计文档：[000-philosophy](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md)、[001-domain](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/001-domain.md)、[002-authorization](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/002-authorization.md)、[003-execution](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md)。

## 14 项概念的原理、证据等级与 XSA 用法

| # | 原理 | 与原文关系 | 可映射 XSA 的设计要点 | 不可宣称/风险 |
|---|---|---|---|---|
| 1 | 计算–状态–执行环境分离 | [A] 原文 §5 明确三层 | 独立 Task/Receipt 状态与可替换执行 Adapter；本地设备按需接入 | 不代表 XSA 已有云状态数据库/BYOM daemon；离线电脑不能保证本地工具仍可跑 |
| 2 | 投机执行（Speculative Execution） | [A] 原文 §3.4 先做再决定是否采纳 | 只在沙箱/只读/可逆边界先复现和起草；证据通过后提交 PR | **不是** Hadoop 掉队任务竞速复制；也不等于 CPU 可无副作用回滚——外部操作必须禁止或幂等 |
| 3 | 独立 Watchdog | [A] 原文 §6 | 定时审查任务的有效进展、卡死和外部错误；与执行节点权限隔离 | 监控任务成功 != 内容或交付成果可靠；Watchdog 本身也可能失败 |
| 4 | 外部反馈控制回路 | [A] Watchdog 原词；Router 可类比 [C] | 检测→比较目标/进度→限权纠偏→复验 | 不能因有定时巡检就宣称实现自动稳定控制；阈值、迟滞和权限要独立验证 |
| 5 | Router–Worker / Master–Worker | [A] 原文 §2 | Router 只维护任务/决策，Worker 隔离执行，统一回执 | 当前 Chat/Work **仅是组织分工**，非强制执行的运行时角色 |
| 6 | 事件驱动 / Trigger | [A] 原文 §3 | GitHub webhook、CI、时间规则可形成经鉴权事件 | 不是所有 Source 都是 push；不能拿轮询注册表假充已经无轮询 |
| 7 | Fast Path / Slow Path | [A] 原文 §3.1 | 白名单、作用域、幂等键等确定性规则先筛；必要时模型语义判定 | LLM 不能替代授权 Gate；低成本不应牺牲权限安全 |
| 8 | 批处理（Batching） | [A] 原文 §2.1/§7.2 | 合并同一任务/来源的事件摘要，减少模型唤醒 | 不能丢取消/审批事件；需验证顺序、延迟及合并策略 |
| 9 | Context Cache / Inline–Spill / Chain of Recall | [A] 原文 §3.3 | Issue/PR/任务/来源用稳定 ID 引用，按需回读，不复制全部聊天 | GitHub 并非模型上下文缓存；历史摘要会遗漏，需要 provenance |
| 10 | Backpressure / 注意力流量整形 | [B][C] 原文有低打扰/简短渠道策略，但**未称其为严格背压协议** | 只推需人决策的异常；按渠道给不同信息密度 | 降噪不等于端到端队列容量反馈；不得直接自称支持背压 |
| 11 | 异步非阻塞任务 | [A] 原文 §4.1 提出 start/stop，并称 DSH Harness 已有但未默认启用 | 外部执行返回 accepted/started，完成后另行回传结果 | XSA 不能凭设计文档宣称有后台运行能力；需持久队列和真实 executor |
| 12 | Durable Execution / checkpoint / 幂等 | [B][C] 状态持久化原文 §5.1，但 S3、Postgres、每步 checkpoint、Saga 是延伸 | task_id + input_sha + operation_id、写入前版本检查、回执记录、失败重试 | **不能宣称** DeepSeek 原文具体用了 Postgres/S3/Saga；PR 双写须靠幂等与人工门禁处理 |
| 13 | Blackboard / Shared state | [B][C] 原文多 Worker 订阅相同 Thread；**不是直接声称黑板架构** | 共享任务与可观察事件，任何并发写依然需要 owner/lease/version | 同步可见 ≠ 互斥；多 Worker 阅读 PR 无法自动防止覆盖 |
| 14 | 认知负荷 / Chunking | [B][C] 原文称人可跟进约 3–5 活跃 Session，属作者经验观察 | 用一个主 Chat、Issue 面板和低打扰回执降低工作记忆负担 | Cowan 的约四个组块不直接推出精确「最多 3–5 会话」定律；无统计样本不能当上限 |

### 投机执行的关键语义分叉

- **MapReduce/Hadoop 式投机任务（Speculative Task Execution）**：多启动同一慢任务的冗余副本，竞速取先完成的有效输出。
- **CPU 分支预测式投机执行**：未来是否采用尚不确定，提前计算；验证后提交，失败丢弃。
- DeepSeek 原文描述**更接近后者**（环境信号→沙箱提前复现/准备草稿→仅有价值时反馈）；这只是**语义类比**，不能借 CPU 指令回滚机制承诺 GitHub/邮件/日程真实副作用可回滚。
- XSA 实施协议：`observe → propose → prepare(in sandbox) → verify → approval_gate → commit/publish → receipt`。在 verify 前必须限制外部副作用；已有副作用采用 idempotency + 补偿而非静默丢弃。

### Watchdog vs 活性检查

- `process_alive`：进程是否还活；`task_progress`：Commit/测试/内容是否有实质进展；`goal_alignment`：是否偏离任务授权/验收边界。
- 独立观察者不得自动扩大写权限；连续失败要进入人工待审；监控自身异常同样必须可见。
- XSA 不应重复制造全套监控系统：先复用 `xingtu-scheduled` 的注册表/巡检证据，补“任务进展”判定字段和规则，**在该仓明确授权和单独 PR 后再实施**。

## 原文数字与边界（必须原样标注合成实验，不能营销成实测交付收益）

官方 §7.1：单次约 **300 条消息 / 20 条工作请求**，用只消耗时间的 Mock 编码工具，**每方案运行 5 次**。统计调度和协调，不是 SWE-bench、代码正确率或企业生产 ROI。

| 配置 | p50 / p95 任务完成时间 | 每次实验读取缓存 Token |
|---|---:|---:|
| Super-agent | 12.4 / 15.7 分钟 | 23.2M |
| Super-agent（无 Pass-through） | 12.6 / 15.5 分钟 | 31.8M |
| 单 Session + Subagent（中性提示） | 20.4 / 29.5 分钟 | 6.1M |
| 单 Session + Subagent（优先委派） | 13.8 / 29.0 分钟 | 10.8M |

官方 §7.2：触发速率从约 1→40 条/分，平均 batch 1.0→2.8，单次请求 2.5→3.9 秒，单个决策分摊推理 6.4→1.6 秒。**此压测 Router 用真实模型，Worker 为 Mock**。数据仅说明这个负载下的吞吐特点，不构成行途可复现结果。

特别关注隐藏代价：超级 Agent 读取缓存 Token 通常比单 Session 多；提高并行效率与**省 Token**不是同一目标。Plus 额度紧张时，采用轻量 Router/确定性 Fast Path，限制并发与静默投机工作的预算。

## XSA 最小落地顺序

P0（已有信息基础）：规范并校验 `project_id / task_id / owner / source / input_sha / scope / action / result / receipt`；先让 GitHub PR/Issue 对账阻止重复做事。

P1：真实 GitHub/CI/定时事件转成标准 Trigger；先只读/记录模式，定向测试重复、乱序、越权、撤权。

P2：验证 Worker 交付与幂等提交；在沙箱中试一条投机复现路径，只有手工审批后才允许外部写入。

P3：引入独立进展 Watchdog 与消息降噪，再评估云状态 DB、BYOM、持久队列和多 Router 是否必要；不提前建设 Kubernetes/复杂编排器。

## 一句话

**XSA 的价值不在重造 14 个机制，而在给现有模块补一份一致、可授权、可恢复、可验证的协作协议，把人的注意力留给决策与验收。**
