# 提示词留档：XSA 仓库初始化任务契约（2026-11-02）

- 使用方：ChatGPT 形成任务契约 → 用户人工转发 → Muse（Personal Agent）执行。
- 性质：这是 XSA 第一个跨 Agent 接力案例的实际任务契约。下文为契约原文的结构化留存，与原提示词内容一致；原粘贴中附带的一段 Mermaid 渲染样式代码不是提示词内容，未入库，其图已重绘为 Mermaid 源码存于 `../diagrams/xsa-relay-architecture.md`。

## 契约正文

你现在担任「XSA · XingTu Super Agent」项目的首任工程初始化 Agent。

### 一、任务目标

创建独立 GitHub 开源产品仓库 `xingtu1996/xingtu-super-agent`，产品名 XSA · XingTu Super Agent，核心理念：One Goal. Many Agents. Verified Outcomes. 面向目标、工具中立的 Super Agent 协作系统，借鉴 DeepSeek Super Agent 的设计哲学，复用现有 LLM、Harness、Agent、Skills 和工具，实现跨 Agent 专业分工、事件驱动协作、任务编排、Watchdog 监控、执行回执与可验证交付。本项目不替代 DeepSeek Super Agent、Claude Code、Codex、Muse、OpenCode 或其他 Agent。核心工程理解：Super Agent 能力体系 ≈ LLM + Harness + XSA 协同编排扩展（行途的工程组合表达，不是 DeepSeek 官方公式）。

### 二、先检查，再创建

1. 查询目标仓是否已存在。2. 不存在则创建 Public Repository，默认分支 main，许可证 MIT。3. 已存在则先只读检查，不覆盖。4. 使用公开身份「行途 XingTu」，不公开私人身份、密钥、凭据与他人隐私。5. 不修改任何已有生产定时任务和公众号发布流水线。

### 三、迁移现有成果

读取 xingtu-harness PR #4、`experiments/event-bridge-v0.1/` 及其 `xsa-starter/`，迁移整理：Event Bridge SDD、Task/Event/Receipt 协议、离线模拟 Worker 与测试、产品 README、设计哲学、Mermaid 架构图、开源治理规范、AI 协作开发实录、会话公开归档规范、技术文章草案。保留原始 PR 链接、提交 SHA 和出处，不删除旧仓历史。迁移前核对实际文件及版本，不能凭推测补造缺失材料。

### 四、README 必须写清楚的问题

1. XSA 是什么，解决什么问题？2. 为什么现有 GPT、Muse、Claude Code、Codex 等还需要跨工具协作？3. XSA 与 DeepSeek Super Agent 的关系？4. 为什么不重新开发一个 Coding Agent？5. 目标驱动、事件驱动、定时驱动和 BPMN/DAG 流程驱动如何协同？6. Goal、Task、Source、Trigger、Policy、Mandate、Executor、Receipt、Watchdog 分别承担什么职责？7. 当前哪些能力已实现、哪些仍是设计？8. 用户如何安装、使用、扩展 Adapter？9. 项目与行途其他开源仓库如何协作？10. 如何衡量省 Token、减少软件切换和提升交付效率？必须明确区分 design、mock、verified、production 四种状态。

### 五、参考 DeepSeek 官方资料

优先阅读 deepseek-harness、dsh-superagent-prototype 及其 docs/000-philosophy、001-domain、007-architecture，学习插件体系、设计哲学、领域模型、授权机制、执行器、Outbox、工程目录、AGENTS.md、测试、CI 和开源治理规范。注明参考与借鉴关系，不宣称官方合作、未经验证的兼容性或不存在的学术论文。

### 六、建立 AI 协作开发档案

建立 docs/history/（transcripts / narratives / decisions / prompts / diagrams / evidence）。特别记录真实案例：用户在 ChatGPT 提出建仓目标，ChatGPT 当前连接缺少建仓接口，Muse 提供该能力；ChatGPT 形成任务契约，Muse 执行建仓，GitHub 保存成果，再由 ChatGPT 读取证据、审核和继续推进。当前这一步依然依赖人工转发提示词，后续要通过 Event Bridge 验证自动接力，不能描述为已经实现。

### 七、开源工程规范

至少建立 README.md / README.en.md、LICENSE、AGENTS.md、CONTRIBUTING.md、SECURITY.md、CODE_OF_CONDUCT.md、CHANGELOG.md、docs/ARCHITECTURE.md、docs/PHILOSOPHY.md、docs/ROADMAP.md、docs/REFERENCES.md、examples/、tests/、templates/、.github/ 相关 PR 模板和 CI。不为凑目录创建空壳文件，每个文件应包含真实且与当前阶段一致的内容。

### 八、后续跨仓演进

XSA 是产品主线，其他仓库保持独立（xingtu-harness 工程资产及安装聚合、xingtu-scheduled 任务 Registry、xingtu-skills 能力与 Skill 目录、xingtu-hooks 本地事件采集、xingtu-cli 命令行入口、xingtu-learn 成本实验和知识积累、xingtu-vault 私有真实验证场景）。先形成跨仓兼容性与演进计划，不直接批量修改其他仓库。

### 九、测试与实验

迁移离线原型后运行现有测试并记录实际结果。准备两周 A/B 实验：A 为 ChatGPT → GitHub → Muse/Codex → GitHub → ChatGPT 的人工交接；B 为通过 XSA 任务协议与 Event Bridge 自动交接。初始研究目标：人工交接次数下降至少 70%、高能力模型调用下降至少 30%、重复执行副作用为 0、成果质量不下降。这些是待验证假设，不得写成已经取得的成绩。

### 十、交付要求

直接完成建仓和可逆初始化工作，不需要逐项询问。所有新增设计和代码通过独立分支与 Draft PR 审核；不自动合并、不发布文章、不部署生产系统。最后以简体中文返回：1. 新仓 URL、默认分支与初始化 Commit SHA；2. 已迁移文件和来源清单；3. README、设计哲学和架构图链接；4. 测试结果（通过、失败或未运行）；5. Draft PR 链接；6. 当前阻塞及下一步建议。不要只回复「已完成」，必须提供实际 GitHub 文件和提交证据。

### 附图说明（原提示词附带）

附一张跨 Agent 接力架构图（用户提出目标 → ChatGPT 规划与任务契约 → GitHub 交接记录 → Muse 创建仓库与文件 → GitHub 提交与执行证据 → ChatGPT 读取与审核 → 下一任务；当前人工转发，未来 Event Bridge），要求与实际建仓过程一起归档，作为 XSA 第一个公开案例。
