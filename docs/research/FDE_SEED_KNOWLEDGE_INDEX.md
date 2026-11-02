# xingtu-fde｜首批知识来源索引（可迁入独立仓）

> 2026-11-02 · 初始 seed registry · 链接只读核对。不是完整行途开源矩阵盘点，也不是对文章来源全部数据和事实的独立核验。新仓成立后建议将本文件转换为 `registry/sources.yaml`，持续补充来源、版本、许可证和可复用知识卡。

## Ⅰ. 方法论与产品基础

| 来源 | 关联主题 | 使用规则 |
|---|---|---|
| [xingtu-ai-engineering](https://github.com/xingtu1996/xingtu-ai-engineering) | FDE 工作法、AI 交付、Harness、质量门禁 | 提取概念和交叉引用，不复制整个仓 |
| [xingtu-sdd](https://github.com/xingtu1996/xingtu-sdd) | 需求规格、可测试验收、交付谱系 | FDE 知识卡解释如何采用 SDD；实现与模板留原仓 |
| [xingtu-skills](https://github.com/xingtu1996/xingtu-skills) | FDE 相关可安装 Skills 与检测工具 | 以 Skill ID/用途/链接为索引；不要重复维护 Skill 正文 |
| [xingtu-harness](https://github.com/xingtu1996/xingtu-harness) | 多工具脚手架、场景安装、DSH 扩展 | 记录安装和适用环境 |
| [xingtu-learn](https://github.com/xingtu1996/xingtu-learn) | 学习过程、实验、纠偏 | 未验证观点留 Learn，验证后蒸馏到 FDE |
| [xingtu-super-agent](https://github.com/xingtu1996/xingtu-super-agent) | 协作引擎、事件与授权、能力路由、Super Agent | 不将 XSA 当 FDE 必需 Runtime |

## Ⅱ. 已读取的 FDE 相关文章

| 条目 | 链接 | 来源层级 | 可研究问题 |
|---|---|---|---|
| FDE 工作法：进场、在场、离场 | [文章](https://github.com/xingtu1996/xingtu-articles/blob/main/articles/2026/09/2026-09-25-fde-working-method-three-stages.md) | 行途公开方法论 | 为什么三阶段交付比“写出代码”更重要？ |
| 资金报表流程改造 | [文章](https://github.com/xingtu1996/xingtu-articles/blob/main/articles/2026/10/2026-10-28-fde-fund-report.md) | 明确注明第三方从业者自述，行途转述 | 首个自动化流程的价值选择与验收 |
| 万条评论数据清洗 | [文章](https://github.com/xingtu1996/xingtu-articles/blob/main/articles/2026/10/2026-10-28-fde-data-cleaning.md) | 明确注明第三方从业者自述，行途转述 | 数据治理为何是 AI 价值的前置条件？ |
| 需求范围失控 | [文章](https://github.com/xingtu1996/xingtu-articles/blob/main/articles/2026/10/2026-10-21-project-scope-out-of-control-fde.md) | 已发表文章，独立证据待复核 | 目标价值与范围治理如何权衡？ |
| 四道质量门禁 | [文章](https://github.com/xingtu1996/xingtu-articles/blob/main/articles/2026/10/2026-10-26-four-quality-gates.md) | 已发表文章，精确数量主张待核查 | 技术产出如何转化为可验收结果？ |

以上文章的许可证与仓库 MIT 许可证不同：`xingtu-articles` README 声明 **CC BY-SA 4.0**。这里仅提供索引和简短研究问题，不复制全文或配图。

## Ⅲ. DeepSeek Super Agent 专题（官方原型）

- [README](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/README.md)：研究原型、适用于单 GitHub 仓，可选飞书消息来源。
- [000–008 docs](https://github.com/deepseek-ai/dsh-superagent-prototype/tree/main/docs)：设计哲学、领域模型、授权、执行、Prompt、Web Panel、部署、架构与新增 Source Cookbook。
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)：插件化运行时与产品治理参考。
- [XSA 对照研究](../DSH_SUPERAGENT_000_008_XSA.md)：逐篇对照与可复用裁决。

**核心行业研究假设**：企业真正付费的可能不只是自动编码，而是需要“被授权的任务启动→跨角色执行→交付证据→后续责任归属”的可靠体系。该判断只是研究方向，须用公开证据和真实案例验证。

## Ⅳ. 后续每条知识卡的字段

```yaml
id: FDE-K-0001
title: "待填写"
kind: theory           # theory / case / practice / skill / research / opportunity
source_url: ""
source_type: official  # official / first_party / third_party / paper / synthetic
source_revision: ""
source_revision_type: "blob" # commit / blob / tag / version / unknown
rights: "link_only"
evidence_status: "source_read" # not_checked / source_read / independently_verified
fact_status: "source_claim" # fact / source_claim / hypothesis / simulation
privacy: "public"
related_repos: []
related_concepts: []
questions: []
last_verified: "2026-11-02"
```

首批库的验收不是条目总数，而是每条知识卡能说明“是什么→为什么可信→怎么用→在哪实测→有什么反例”，并能追溯到原始出处。
