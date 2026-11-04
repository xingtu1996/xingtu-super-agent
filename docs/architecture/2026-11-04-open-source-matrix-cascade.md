# XSA｜经典系统思想在行途开源矩阵的级联效应

2026-11-04｜Draft 研究判断｜仅分析与设计，不自动修改其他仓库、不部署自动化。

## 结论

行途开源矩阵已经具备 Super-agent 的若干 **组成能力和知识载体**，但尚没有完整可靠的跨 Agent 事件、状态、授权和回执闭环。与其新增 14 个仓或复制 14 套实现，不如让 **XSA 定协议、各专业仓按职责实现或消费协议、GitHub 留证、Learn 保存验证经验**。

重要：下表指建议职责，不能把仓库名或 README 当已经实现该功能的证据。当前 GitHub 能存交付事实，但并非完整的队列/事务状态库。仓库的拆分、合并和下线需另行决策。

## 从思想到仓库的级联矩阵

| 归属/仓库 | 可复用的原理 | 建议承担的单一职责 | 优先级 | 风险/边界 |
|---|---|---|---|---|
| xingtu-super-agent (XSA) | Router/Worker、Thread、Trigger、Receipt、幂等 | **协议 Owner**：Task/Source/Owner/Policy/Receipt 与 Adapter 契约、冲突检验 | P0 | 不重写完整 Agent Runtime |
| xingtu-scheduled | 看门狗、控制回路、事件驱动 | 任务 Registry、定时信号、运行与产物健康回执 | P0 | 首先只读，不修改生产自动任务 |
| xingtu-hooks | Fast Path、权限门禁、阻断副作用 | 代码/工具执行前的强制校验与高风险阻断 | P0 | Prompt 不是硬性 ACL，Hooks 不能越权启用 |
| xingtu-rules / rules-internal | Policy、决策约束 | 可解释规则、适用范围、版本与例外 | P0 | 私有规则禁止自动复制到公开仓 |
| xingtu-harness / harness-kit | 执行环境隔离、装配 | 配置/依赖安装与 Adapter 集成 | P0 | 不是 Router 运行时；不强制克隆和部署 |
| xingtu-sdd / xingtu-ai-engineering | 规格合同、验收、checkpoint | Task SDD、验收 Gate、测试与回滚标准 | P0 | 规范文档不能代替实际测试 |
| xingtu-cli / xingtu-mcps / xingtu-tools | 可调用 Worker、异步工具接口 | 能力发现、工具执行接口、超时与回执 | P1 | 禁止在未授权设备开服务或读凭据 |
| xingtu-skills / dsh-xingtu-skills | 独立专业 Worker、能力契约 | Skills 的输入/输出/权限/副作用/测试约定 | P1 | 不重复维护同一个 Skill 源码 |
| xingtu-fde | Chain of Recall、领域知识来源 | Knowledge/Practice/Tools 与案例 provenance | P1 | 第三方与本人案例分层，非执行编排器 |
| xingtu-learn | 经典系统原理、实验方法 | 学习卡、原理、反例和实测 A/B | P0 | 研究分析不等于生产验证 |
| xingtu-sessions（私有） | 历史持久化、Inline/Spill | 私有会话复盘与交接，必要时摘要关联 | P1 | 禁止原始私人聊天和密钥外泄 |
| xingtu-vault / xingtu-articles | 多信道、审批门禁、低打扰 | 私有创作与公开归档两阶段，交付回执 | P1 | 正式公开与群发必须人工批准 |
| xingtu-publish-packs / md2wechat / 平台渠道仓 | 多信道、注意力流量整形、事件去重 | 包转换、格式验证、渠道差异与发布状态 | P2 | 不擅自操作真实账号 |
| xingtu-video / book2vido / article2pod | 长任务、异步、checkpoint | 视频/音频流水线的状态与文件证据 | P2 | 没有实际可播放产物不能宣称成功 |
| xingtu-site / Portfolio / Design / Profile | 控制面板、人因工程 | 展示可验证的公开工程成果 | P2 | 不把私有仓详情暴露到网站 |
| xingtu-cloud-neutral | compute/state/environment separation | 分离式执行与环境中立的适配研究 | P2 | 不提前搭建服务器、容器集群或 BYOM |

以上是影响评估，不意味着应把某个仓合并到另一仓；每个现存仓依旧独立。

## 级联不是复制：统一契约、按需传播

建议最小 Task Contract 具备字段：schema_version、source_ref、task_id、project、primary_repo、owner、input_sha、scope、capability、approval_state、status、receipt。来源对象用不可变版本引用；写前校验远端分支/文件状态。

变更传播步骤：
1. 先在 XSA 提出版本化协议、变更理由和兼容性。
2. 生成只读影响清单：涉及仓、具体使用点、建议 Owner、潜在生产风险。
3. 每个受影响的仓库单独由 Owner 审查，在需要时建立 Issue/Draft PR。
4. 只合并与实际需求、权限、验证证据一致的适配；避免几十仓一次性改动。
5. 由 Learn 回收方法/失败，Vault 或公开内容仓在人工审核后才消费经验。

## 将 14 项原理聚合成四个可验证能力包

**A. 可靠接入与路由**：事件驱动、Fast/Slow Path、Router/Worker、订阅直通、批处理。归属 XSA + Scheduled；先做重复事件/权限过滤测试。

**B. 可靠执行与恢复**：计算-状态-环境分离、异步、checkpoint、投机执行、Watchdog。归属 XSA Adapter + CLI/Hooks/Scheduled；先做权限不足、超时、失败重试和不重复写 PR 的离线用例。

**C. 上下文与知识**：Inline/Spill、Chain of Recall、黑板/共享状态类比。归属 XSA 元数据引用 + Learn/FDE/Sessions；先从 Issue/PR/Commit 回读，不能将会话标题当可靠任务 ID。Thread 订阅只是事件共享，不足以防并发覆盖。

**D. 人的注意力**：反馈控制回路、通知降噪、组块/人因工程。归属 XSA 通知策略 + Scheduled + 发布/网站消费端；只在需要决策/验收时打断人。注意力管理与经典队列背压只是工程类比，不是已经实现容量反馈。

## 与真实问题对应

- XSA(work) 标题下执行 XF Work 任务：需要独立的项目和任务身份。
- FDE PR #1/#2 多文件重叠：需要 Owner、输入 SHA、PR 变更预检；GitHub PR 不是自动文件锁。
- Work 当前目录不是 Git 仓就判定阻塞：需要先远端读取、必要时 Clone，再决定访问是否真正失败。
- Scheduled 的任务运行成功与产物新鲜度不能混淆：Watchdog 要看进展/证据，不只看 alive。
- 发布包与公众号：提前产出草稿可以是低副作用的“投机准备”，正式公开必须过人工门禁。

## 建议最小实验：复用现有 GitHub，不部署新基础设施

输入一次模拟 Issue / CI 失败：Source 生成稳定事件 ID → Fast Path 验证来源/权限 → XSA Task 契约记录唯一 owner → Worker 只读复现并附测试证据 → 输出 Draft PR/失败回执 → Scheduled 只读检查是否停滞 → 最后人工审核。重复投递同一事件应不会产生重复的外部写入。

验收指标：重复 PR 数、权限越界次数、跨 Agent 交接恢复率、可验证 Receipt 比例、人工打断次数、真实使用额度（可得才记录）。没有数据时记 unknown。

## 重要来源与边界

- DeepSeek Harness 设计文章：https://x.com/DeepSeekHarness/status/2116857257245987236
- 官方研究原型：https://github.com/deepseek-ai/dsh-superagent-prototype
- XSA 14 项原理与证据：https://github.com/xingtu1996/xingtu-super-agent/blob/research/deepseek-classical-systems-cascade-20261104/docs/research/2026-11-04-superagent-computer-systems-principles.md

**原文明确宣称的是双层架构、Trigger、Fast/Slow、Inline/Spill、投机、异步、计算/状态/环境分离与独立 Watchdog；背压、黑板、Saga/具体持久数据库属于经典系统知识与 XSA 的衍生设计。**

实验样本只有五次/方案，编码工作被模拟工具替换。其重点是调度与协调，**不证明更强编码质量、更低 Token 消耗或行途已有生产自治能力**。

## 工程裁决

**行途已有模块化器官，缺的是可靠的神经系统——任务身份、权限、事件、状态和回执。先打通一条证据链，再考虑服务端/队列/分布式调度。**
