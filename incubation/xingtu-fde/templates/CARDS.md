# 可直接复用的三类卡片模板

复制对应小节到新文件，替换占位符；合成示例须写 `synthetic`，待核验证据写 `unknown`，不得填虚假 SHA。

## 模板 A：知识/来源卡

```yaml
id: FDE-K-XXXX
title: "标题"
kind: theory # theory / research / practice / tool
source_type: third_party # official / first_party / third_party / synthetic
source_url: "https://..."
source_revision: unknown
source_revision_type: unknown # commit / blob / tag / version / unknown
claim_status: source_claim # source_claim / independently_verified / hypothesis / synthetic
evidence_level: L0 # L0..L4
rights: link_only
privacy: public
last_verified: "YYYY-MM-DD"
```

正文写：**一个可证伪的主张**、来源实际说了什么、哪些没有说、适用边界、反例、如何验证、相关仓与能力、贡献者的判断（明确与来源区分）。

## 模板 B：交付/案例卡

```markdown
# 案例：标题
- 来源 URL / 作者属性 / 版本：
- 是否亲历：是 / 否 / 合成
- 授权：可公开范围、是否有引用许可
- 主张状态及核验级别：
- 业务问题与约束：
- 原始基线与可量化指标：未知项标 unknown
- 实施步骤、职责与技术栈：
- 失败、干预与回退：
- 验收证据（SHA、经脱敏的结果、审批）：
- 第三方未验证数字：
- 可复用模式、适用边界、反例：
- 后续待追查问题：
```

## 模板 C：FDE 方法/Skill 卡

```markdown
# 方法名称
- 解决何种业务问题：
- 不解决的问题：
- 原仓 Skill/模板链接与版本：
- 前置权限/输入数据类型：
- 输入→输出契约：
- 检查项与人工门禁：
- 可执行最小测试 / 预期结果：
- 已运行的真实证据：未运行则写 not_run
- 失败特征与回退方式：
- 更新时需要通知的下游知识卡：
```

**验收**：另一位审阅者仅凭卡片和来源链接，能追溯到依据、指出未知、复现验证方法，并知道何时不应使用。
