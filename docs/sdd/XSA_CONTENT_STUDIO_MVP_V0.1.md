# XSA Content Studio · SDD v0.1

> 状态：design（本文）；配套前端为 mock。Issue：#7。日期：2026-11-03。

## 1. 目标与非目标

目标：面向《行途技术手记》的内容交付，建立「选题 → 研究 → 成稿 → 审稿 → 设计 → 发布包 → 微信私人草稿 → 人工发布 → 复盘」的可视化工作台，让用户只处理真正需要判断的事项。

非目标：不替代 xingtu-vault、不复制私有稿件到 XSA 公共仓库、不创建新的 Agent Runtime、不控制个人 ChatGPT 会话、不自动群发或合并 PR。

## 2. 信息架构

- **今日工作**：稿件数量、阻塞与待审批、建议下一动作。
- **内容流水线**：各阶段任务卡片、负责人、Evidence/Receipt 状态、门禁。
- **稿件详情**：目标、阶段、风险、审稿及脱敏门禁、证据链接、最近回执。
- **Agent 接力**：根据稿件下一动作生成「可复制」的人工交接提示，不宣称已分发。
- **本地导入**：浏览器端选取 Manifest JSON，解析与校验，不上传、不保存到云端；刷新后恢复演示态。

## 3. 最小契约

输入结构：{schema_version:"xsa.content.v1", generated_at, source, articles:[Article]}。

Article 必备：id / title / stage / owner / status / next_action / gates / receipts。stage 取 idea/research/draft/review/design/package/wechat_draft/published；status 取 queued/working/blocked/ready/done。gates 为 { evidence, independent_review, privacy, quote_license, visual, package_integrity, draft_verified, human_release }，每一项的值为 pending/pass/fail/na；na 仅限确实不适用的事项且需另有解释，发布的强制门禁不可 na。

Receipt：{kind, state, timestamp, evidence_url?}。证据 URL 必须是 http(s)，只作为人工跳转，禁止当作验收通过的充分条件。source.verification 取 mock/unverified/verified；verified 指导入来源有外部核验凭证，而不是前端自行验证。

发布条件：除 human_release 外的七项发布门禁均 pass，且 human_release 必须 pass；工作台只展示“人工标记可进入发布审核”，不能执行真实发布。任何不完整门禁均显示不可发布；真实平台状态未知只能显示未核验。

## 4. 安全与数据治理

- 公共示例只包含合成稿件，不使用私有仓库的真实标题、正文、数据、账号、Token、URL。
- 只读浏览器导入，本地文件数据不发送至服务端；不使用本地持久化或日志收集。
- 渲染用户文本使用 DOM textContent，不拼 HTML；外链只允许 http(s)，target=_blank 与 rel=noopener noreferrer。
- 不自动上传微信草稿、不群发、不对外发送消息、不自动运行 Agent；所有动作仅浏览器模拟或复制提示。
- 首版不含身份认证、服务器存储、并发租约、多 Agent 真实适配器，全部标 mock / design。
- 未来生产版本应私有部署并采用服务端 GitHub/微信适配器，密钥留在安全服务端，不传给浏览器。

## 5. 验收

1. 无依赖本地静态服务打开，手机与桌面双布局。
2. 合法 JSON 可展示；非法 schema、重复 ID、非法阶段或门禁不通过则拒绝。
3. 一切导入状态与模拟状态有明显标签，不能宣称实时。
4. 发布门禁缺少证据或未经人工批准时呈阻断状态。
5. 提示词只读复制，附任务 ID、输入版本、要求回执/证据，提醒禁止自动发布。
6. Node 内建 test runner 测试模型校验、门禁与提示生成。
7. GitHub Draft PR，独立审核后由人决定合并。

## 6. 后续迭代

- P1：私有只读 Adapter 接入 xingtu-vault Manifest、GitHub PR 和 Scheduled Registry，提供服务端鉴权与审计。
- P1：微信草稿回查 Receipt（基于既有 wechat-draft-api，先单独权限评审）。
- P2：事件触发、任务去重、租约与 Watchdog；在事务性持久化前不承诺生产多 Worker。
- P2：内容发布后数据回流与选题反馈闭环。
