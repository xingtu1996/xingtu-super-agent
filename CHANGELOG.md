# CHANGELOG

本文件记录 XSA 的重要变化。版本号仅表示阶段计划，不表示已发布生产版本；每条记录标注状态词（design / mock / verified / production）。

## Unreleased

- 两周 A/B 实验（人工接力 vs 协议接力）设计中，尚未运行。`design`

## 2026-11-02 · 仓库初始化与 Event Bridge v0.1 迁移

- 创建独立产品仓 `xingtu1996/xingtu-super-agent`（Public，默认分支 `main`，MIT）。`verified`（初始化提交见仓库首页与开发档案证据页）
- 从 `xingtu-harness` 的 Event Bridge 实验 PR #4（分支 `experiment/event-bridge-v0.1-20261102`，头提交 `7e3d12b04bab9032dbc0530bd4c20a698a06ff56`）迁移 `experiments/event-bridge-v0.1/` 全部 10 个文件，逐字节原样保留，来源与校验值见 `docs/MIGRATION_MANIFEST.md`。`verified`
- 离线原型 `bridge.py` 与 3 条单元测试在本仓复跑通过（见开发档案证据页）。`mock`
- 新增产品 README（中/英）、设计哲学与架构文档、治理文件组（AGENTS / CONTRIBUTING / SECURITY / CODE_OF_CONDUCT）、路线图、参考索引与 `docs/history/` AI 协作开发档案，含「ChatGPT 规划 → Muse 建仓 → GitHub 留证 → ChatGPT 审核」的首个接力案例（人工转发阶段）。`design` + `verified`（案例事实部分）
