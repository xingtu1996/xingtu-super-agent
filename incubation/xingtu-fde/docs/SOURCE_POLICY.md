# 来源、证据、授权与隐私规范 v0.1

## 入库条件

每条可引用资料至少包含：唯一 ID、标题、原文 URL、来源类型、获取/核对日期、原件版本（commit / blob / tag / unknown）、主张状态、核验等级、版权处理、隐私等级、与可应用场景。找不到固定版本时写 unknown，不伪造 SHA。

| 字段 | 推荐值 | 含义 |
|---|---|---|
| `source_type` | official, first_party, third_party, synthetic | 来源身份，而非真假判断 |
| `claim_status` | source_claim, independently_verified, hypothesis, synthetic | 当前主张的证明范围 |
| `evidence_level` | L0–L4 | 采用 [知识地图](KNOWLEDGE_MAP.md) 等级 |
| `source_revision_type` | commit, blob, tag, version, unknown | 不得把文件 blob SHA 当 commit SHA |
| `rights` | link_only, permission_obtained, original | 默认仅链接和独立短评 |
| `privacy` | public, redacted, private | private 不进公开仓 |

## 不合规示例与正确处理

- “第三方案例 9 天完成，因此 FDE 可以将每个项目缩短到 9 天” → **禁止**；来源叙述不能外推。
- “某行途文章写‘十个项目八个失败’，因此有客观行业失败率 80%” → **禁止**；这只是文章中的主张，缺乏统计样本。
- “XSA PR 已包含 Event Bridge 测试代码，因此可生产接单” → **禁止**；已提交代码≠已跑测试≠安全审计。
- “改写后的对话是逐字原文” → **禁止**；只可标注“基于会话整理，非逐字引述”。

## 版权与公开

只引用原链接、标题和短量必要信息，独立转述不复制整篇文章、配图、代码。上游许可证需逐项核查；`xingtu-articles` README 声明 CC BY-SA 4.0，不可假定与 MIT 完全兼容。独立 FDE 仓正式采用许可证前，保持“许可待裁决”状态。

审查 PR 时先执行：敏感实体与实名、私人路径/邮件/手机、Token/密钥、未授权客户标识、未授权直引、平台/第三方版权六项筛查。重大风险停止公开发布，保留最小化抽象案例和私有证据引用。

## 修订规则

同一 ID 的来源状态只根据新证据升级；证据被撤回时必须降级并留时间、依据与受影响的下游卡。标注“公开链接可读”不等于“授权复制”。
