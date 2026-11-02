# 迁移清单 · Event Bridge v0.1 → XSA 独立仓

迁移时间：2026-11-02。迁移方式：以来源提交的公开 git 克隆逐字节复制，并与 GitHub 接口返回的文件清单（大小、blob SHA）逐项核对一致；未凭推测补造任何缺失材料。

## 来源

- 来源仓库：[xingtu1996/xingtu-harness](https://github.com/xingtu1996/xingtu-harness)
- 来源 PR：[PR #4「Event Bridge v0.1：跨 Agent 任务协议与离线验证」](https://github.com/xingtu1996/xingtu-harness/pull/4)（Draft，未合并，旧仓历史保留不删）
- 来源分支：`experiment/event-bridge-v0.1-20261102`
- 来源提交：`7e3d12b04bab9032dbc0530bd4c20a698a06ff56`
- 来源目录：`experiments/event-bridge-v0.1/`

## 文件清单（原样迁移，路径不变）

| 文件（本仓路径 = 来源路径） | 大小（字节） | 来源 blob SHA | SHA-256 |
|---|---|---|---|
| experiments/event-bridge-v0.1/ARTICLE_DRAFT.md | 5633 | c266fe30db639fcdca9b6bbf3f946aec3fb1fb17 | e173f7b13a4f5e8373c4ea2eaf905a62c37e80c8e8aac76780360a33ed4e85d8 |
| experiments/event-bridge-v0.1/CONVERSATION_ARCHIVE_POLICY.md | 3074 | 8a93954a377c504698154513853379efdab67a82 | 9a10892d30f6cf6def0dbc642b6d9eea56fd1eece5211fe7fae1496227e4b105 |
| experiments/event-bridge-v0.1/PHILOSOPHY.md | 4178 | 946a2f7c5a2d395c27bf201ee7a28844d74911a3 | 7d02e6199b07402fb897bf8bd84b14b75143ebc12b15c875868ef8991d5f5663 |
| experiments/event-bridge-v0.1/PRODUCT_README.md | 6661 | dc5bda8cf4119bcc932814ba49c5f7ae9131bcc3 | 5285ad66cc68d5ddc553d5c9c35b83bd44007ed6c2330e9462b71378d35600d4 |
| experiments/event-bridge-v0.1/SDD.md | 3839 | a749adbdc4c95e2eaee70ed1fea4526f67ad4ebb | 02cab5bb38353244f9b73d6cc72b85d4bb3362b700293e5c16435857b68415e6 |
| experiments/event-bridge-v0.1/bridge.py | 2864 | dcc7467784ea21d1e840892556b4376a49cbaca2 | 30be9a947bd4d15e0f97cb9017a8481afc22cf05a4b16de5808e4fd6587feaaa |
| experiments/event-bridge-v0.1/test_bridge.py | 1681 | 8f872ac782f96925a0389913d82fd912f42d22f9 | 7a76b19c97abfcb760ddafec2dad8ec9dce03d7305b57d34892f2849d121873e |
| experiments/event-bridge-v0.1/xsa-starter/ARCHITECTURE_XSA.md | 1412 | 176069716a4e671a8ba65c3e176092790e99bc3f | a54c2b4fe4cf6f5da1c84f7a613d8c03dab3e3f1d82799ff7bb559be6a7e08b5 |
| experiments/event-bridge-v0.1/xsa-starter/GOVERNANCE.md | 2103 | d89957f5a9944794ef6ef3435fe25f7a7738e9c5 | addba02beb40442d8b768364cd7212995d096d3b705c4a653e772bf108ead436 |
| experiments/event-bridge-v0.1/xsa-starter/README_XSA_STARTER.md | 3425 | 62c06abb3632be41084c53eebbccb4e28dab93a4 | 6438095f20232332881b4ccd3ada7aefa754f9c9d4b872c720146b424afa0306 |

## 晋升副本（产品文档层，内容与原件的关系逐项注明）

| 本仓文件 | 来源 | 关系 |
|---|---|---|
| docs/PHILOSOPHY.md | experiments/event-bridge-v0.1/PHILOSOPHY.md | 逐字节副本 |
| docs/GOVERNANCE.md | experiments/event-bridge-v0.1/xsa-starter/GOVERNANCE.md | 逐字节副本 |
| docs/ARTICLE_DRAFT.md | experiments/event-bridge-v0.1/ARTICLE_DRAFT.md | 逐字节副本（草案，未完成最终核验，禁止自动发表） |
| docs/history/CONVERSATION_ARCHIVE_POLICY.md | experiments/event-bridge-v0.1/CONVERSATION_ARCHIVE_POLICY.md | 逐字节副本 |
| docs/ARCHITECTURE.md | experiments/event-bridge-v0.1/xsa-starter/ARCHITECTURE_XSA.md | 改编扩展：保留原架构图与映射，新增概念职责表与接力时序图 |
| README.md | experiments/event-bridge-v0.1/PRODUCT_README.md + xsa-starter/README_XSA_STARTER.md | 重新编纂的产品入口，吸收两份草案内容并按独立仓现状改写状态标注 |

## 未迁移与说明

- 来源 PR 中的其他仓库文件不属于 Event Bridge 实验范围，未迁移。
- 旧仓与 PR #4 保持原状：不删除、不改写历史；本仓引用一律给出 PR 链接与提交 SHA。
