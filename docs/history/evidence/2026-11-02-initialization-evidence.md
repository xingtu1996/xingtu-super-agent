# 证据索引：2026-11-02 仓库初始化

本页只记录可核对的事实与链接；结论口径以各条状态词为准。

## 新仓

- 仓库：https://github.com/xingtu1996/xingtu-super-agent（Public，默认分支 `main`，MIT）
- 创建方式：GitHub 网页建仓（2026-11-02 10:39–10:40 CST 完成，勾选 README 与 MIT License 初始化）；接口建仓因应用无建仓权限返回 403 后改走此路径。执行中曾一度回报登录失败，但最终以接口回读为准：仓库已建成、公开、默认分支 main。
- 初始化 Commit SHA：`d0bcf54416b8c454c140e1d11efd104a075a5ef4`（提交信息「Initial commit」，2026-11-02T02:40:00Z；回读时 main 含 README.md 与 LICENSE 两文件）
- 初始化内容经独立分支 `feat/xsa-initial-import-2026-11-02` 以 Draft PR 提交，未直推 main 内容文件、未自动合并；PR 链接见本页所在 PR 的页面（自引用不写死）。

## 来源与迁移

- 来源 PR：https://github.com/xingtu1996/xingtu-harness/pull/4（Draft，open，未合并）
- 来源分支：`experiment/event-bridge-v0.1-20261102`；来源头提交：`7e3d12b04bab9032dbc0530bd4c20a698a06ff56`
- 来源文件清单（接口回读）：根目录 7 个文件 + `xsa-starter/` 3 个文件，大小与 blob SHA 见 `../../MIGRATION_MANIFEST.md`
- 迁移校验：以来源提交克隆逐字节复制，10 个文件大小与 SHA-256 与清单逐项一致（接口取数曾对大文件返回截断内容，故未采用接口文本，改走克隆并核对，此事如实记录）

## 参考文档（已读一手原文，2026-11-02）

- https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md
- https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/001-domain.md
- https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md

## 测试（迁移后复跑，本地执行，2026-11-02）

- `experiments/event-bridge-v0.1/` 原位置：`python3 bridge.py` 正常输出两条 succeeded 回执；`python3 -m unittest discover -s . -p 'test_*.py'` → Ran 3 tests，OK
- 仓库级：`python3 -m unittest discover -s tests -p 'test_*.py'` → Ran 3 tests，OK
- `templates/task-event-receipt.schema.json` 经 `python -m json.tool` 校验通过；全仓经密钥模式与私人标识扫描，无命中

## 失败与阻塞（如实记录）

- GitHub 接口建仓返回 403（应用集成无建仓权限），该路径失败后未重试，改走网页建仓（见上「创建方式」）。
- 网页建仓执行中曾回报「已保存登录凭据被拒绝、密码不正确」，与最终成功结果矛盾；以接口回读的仓库事实为准，登录环节的真实经过标 `unverified`，不作为结论引用。
- ChatGPT 侧对本仓的独立审核在本页归档时尚未发生，属下一步，不是已完成事项。
