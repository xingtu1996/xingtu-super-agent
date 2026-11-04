# FDE 能力—已有工具映射（不复制 Skill）

本页只索引在原仓确认存在的文件/目录，**未对技能进行安装和运行验证**。目标是帮助 FDE 发现合适的资产，而非把全部 Skill 自动标为 FDE 可用。

| FDE 步骤 | 能力入口 | 使用前检查 | 当前证据 |
|---|---|---|---|
| 需求/验收 | [xingtu-sdd specs-engine](https://github.com/xingtu1996/xingtu-sdd/tree/main/specs-engine) | 验收条件、业务审批、validator 适配 | 文档与目录已读，运行未测 |
| 方案对抗审核 | [adversarial-review](https://github.com/xingtu1996/xingtu-skills/tree/main/skills/adversarial-review) | 此技能偏公众号内容审查；用于 FDE 前需重审 rubric | Skill 内容已读 |
| 证据与主张核实 | [fact-check-gate](https://github.com/xingtu1996/xingtu-skills/tree/main/skills/fact-check-gate) | 许可、检索来源、人工抽样检查 | Skill 路径已核对 |
| 规格与红队工作流 | [spec-driven-adversarial-workflow](https://github.com/xingtu1996/xingtu-skills/tree/main/skills/spec-driven-adversarial-workflow) | 对抗审查与实际测试必须分开 | Skill 路径已核对 |
| 质量工程 | [quality-gate-template](https://github.com/xingtu1996/xingtu-ai-engineering/blob/main/methodology/quality-gate-template.md) | 根据业务风险设门槛，不能照抄默认阈值 | 原文件存在 |
| 项目收尾 | [project-closure-template](https://github.com/xingtu1996/xingtu-ai-engineering/blob/main/methodology/project-closure-template.md) | 明确运维责任与遗留风险 | 原文件存在 |
| 交付评审 | [delivery-review-template](https://github.com/xingtu1996/xingtu-ai-engineering/blob/main/methodology/delivery-review-template.md) | 检查输出与需求基线一致 | 原文件存在 |
| 事实入库 | 本仓 [来源卡/案例卡模板](../templates/CARDS.md) | 必填证据与权利等级 | 本仓原创模板，待试用 |

**未来要验证：** 用一个合成 FDE 需求分别测试人工流程、SDD 模板与已核验 Skill；记录执行时长、误报、质量和返工；不能把“目录存在”当“兼容 DSH/Codex/Claude Code/Muse”。
