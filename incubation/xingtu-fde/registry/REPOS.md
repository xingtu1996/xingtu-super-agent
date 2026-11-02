# 行途 FDE 相关开源矩阵（2026-11-02 只读盘点）

下列文件/目录名经 GitHub 连接核对；链接指向**原件**，不保证全部功能经运行测试。所有 PR 均在其原仓单独治理。

| 仓库 | 核查到的能力入口 | FDE 使用方式 | 边界 |
|---|---|---|---|
| [xingtu-ai-engineering](https://github.com/xingtu1996/xingtu-ai-engineering) | `engineering/`、`methodology/`、`governance/`、`marketplace.json` | 工程方法论、质量门禁、交付检查 | 文档存在≠实测有效 |
| [xingtu-articles](https://github.com/xingtu1996/xingtu-articles) | `articles/2026/09`、`articles/2026/10` | FDE 工作法及公开案例的原始文章 | CC BY-SA 来源，保留原仓 |
| [xingtu-skills](https://github.com/xingtu1996/xingtu-skills) | `skills/`、`marketplace.json` | 技能定位、前置条件、调用入口 | 不复制 Skill 全文 |
| [xingtu-harness](https://github.com/xingtu1996/xingtu-harness) | `install.sh`、`docs/`、Event Bridge [Draft PR #4](https://github.com/xingtu1996/xingtu-harness/pull/4) | 聚合/分发与事件协议研究 | Bridge 未证实生产可靠 |
| [xingtu-sdd](https://github.com/xingtu1996/xingtu-sdd) | `specs-engine/`、`case-studies/`、`specs/` | 规格、验收、复盘模板 | 验收需项目实证 |
| [xingtu-learn](https://github.com/xingtu1996/xingtu-learn) | `10-tech/`；[Draft PR #6](https://github.com/xingtu1996/xingtu-learn/pull/6) | 上游学习、未成熟假设和纠偏 | 不把学习记录当成果 |
| [xingtu-super-agent](https://github.com/xingtu1996/xingtu-super-agent) | [Draft PR #2](https://github.com/xingtu1996/xingtu-super-agent/pull/2) 三份研究文档 | DSH 000–008、FDE 产品蓝图 | XSA 与 FDE 分层，不强制依赖 |
| [xingtu-hooks](https://github.com/xingtu1996/xingtu-hooks) | 仓库身份已确认，细目录待查 | 可能提供工程门禁 | 待验证 |
| [xingtu-tools](https://github.com/xingtu1996/xingtu-tools) | 仓库身份已确认，细目录待查 | 实用工具候选 | 待验证 |
| [xingtu-prompts](https://github.com/xingtu1996/xingtu-prompts) | 仓库身份已确认，细目录待查 | Prompt 资产候选 | 待验证 |
| [xingtu-workflows](https://github.com/xingtu1996/xingtu-workflows) | 仓库身份已确认，细目录待查 | 流程索引候选 | 待验证 |

**查找原则：** FDE 保存“在哪/为什么/什么时候适用/如何验证”的导航；代码和技能原件由原仓维护。每次能力声明需附引用的文件版本和适用限制，升级来源时检查下游链接。
