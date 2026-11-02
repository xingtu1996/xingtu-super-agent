# 参考与借鉴

XSA 的设计参考以下一手资料。引用关系是「借鉴思想与结构」，不构成官方合作、衍生或兼容声明。

## DeepSeek 官方开源

- [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)：插件体系（Everything is a Plugin）、工程目录、AGENTS.md、测试、CI 与开源治理规范的主要参考。
- [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype)：Super Agent 研究原型本体。上游自述为 research prototype，不是正式产品或生产级框架。
  - [000-philosophy](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md)：以人的注意力成本衡量设计；只在被要求或规则允许时行动；诚实报告状态。
  - [001-domain](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/001-domain.md)：Source、Trigger、Thread、Policy、Eval、Mandate、Ticket、Assignment、Executor 的领域定义，XSA 概念映射见 `docs/ARCHITECTURE.md`。
  - [007-architecture](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md)：Engine、Policy、Store、Outbox、Executor 分层与单写入责任。

使用上游代码前必须单独核对该仓库 LICENSE 与署名义务；本仓当前实验代码为独立实现，未复制上游代码。

## GitHub 平台机制（适配器设计参考）

- [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)：GitHub Actions 的事件触发模型。
- [Create a repository dispatch event](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)：以仓库事件作为外部 Trigger 的官方接口。

## 行途自有前置成果

- [xingtu-harness PR #4](https://github.com/xingtu1996/xingtu-harness/pull/4)：Event Bridge v0.1 实验（SDD、离线模拟与测试、产品与治理草案），本仓 `experiments/event-bridge-v0.1/` 的迁移来源，旧仓历史保留不删。
- [xingtu-scheduled](https://github.com/xingtu1996/xingtu-scheduled)：定时任务 Registry，定时驱动的登记面参考。
