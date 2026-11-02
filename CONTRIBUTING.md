# 贡献指南

欢迎以 Issue 和 PR 参与。XSA 目前处于 Research Preview 阶段，最有价值的贡献是：可复现的问题、协议层面的设计讨论、适配器能力核验记录，以及带测试的实现。

## 开始之前

- 先读 `README.md` 与 `docs/ARCHITECTURE.md`，确认你要做的事属于 XSA 的控制层范围，而不是再造一个执行器。
- 大改动先开 Issue 或提交 SDD 草案，对齐后再写代码，避免无谓返工。

## 提交流程

1. 从 `main` 切隔离分支，分支名建议 `feat/<主题>`、`docs/<主题>`、`fix/<主题>`。
2. 本地运行相关测试（离线原型：`cd experiments/event-bridge-v0.1 && python3 -m unittest discover -s . -p 'test_*.py'`）。
3. 开 Draft PR，按 PR 模板填写：变更内容、动机、测试结果、证据链接、状态词说明。
4. 等待独立审核与人工合并；请勿自行合并，也勿在 PR 中催促绕过审核。

## 内容纪律

- 能力描述使用 `design` / `mock` / `verified` / `production` 四级状态词，见 `AGENTS.md`。
- 数字必须有实测来源；假设与目标必须显式标注。
- 禁止提交任何密钥、凭据、未脱敏的私人会话、真实联系方式或私有仓库内容。
- 引用 DeepSeek 等上游项目时保留链接与出处，不暗示官方合作或兼容承诺。

## 适配器贡献

新增适配器时，在 PR 中逐项声明：capability、authorization、permissions、quota、actual_transport（native / adapter / manual / unsupported），并附至少一次真实核验记录（时间、环境、结果）。无法核验的写 `unverified`，不要写「应该可用」。

## 行为准则

参与即同意 `CODE_OF_CONDUCT.md`。安全问题请按 `SECURITY.md` 私下报告，不要开公开 Issue。
