// Fictional demonstration data only. Never place private article materials here.
const baseGates = {
  evidence: "pending", independent_review: "pending", privacy: "pending",
  quote_license: "pending", visual: "pending", package_integrity: "pending",
  draft_verified: "pending", human_release: "pending"
};
export const demoManifest = {
  schema_version: "xsa.content.v1",
  generated_at: "2026-11-03T08:00:00+08:00",
  source: { name: "XSA 合成演示资料", verification: "mock" },
  articles: [
    {
      id: "DEMO-001", title: "一次 AI 交付复盘，如何做到有证据",
      brief: "用虚构案例演示证据链、独立审稿和稿件风险判定。",
      stage: "review", status: "blocked", owner: "Chat · 审稿",
      next_action: "补齐示例事实核对记录，再交给独立审稿 Agent。",
      gates: { ...baseGates, evidence: "fail", privacy: "pass", quote_license: "pass" },
      receipts: [{ kind: "写作回执", state: "mock · 草稿完成", timestamp: "2026-11-03T07:45:00+08:00" }]
    },
    {
      id: "DEMO-002", title: "AI Agent 工作台：从聊天转向交付",
      brief: "概念稿，准备配图和发布包的可视化教学示例。",
      stage: "design", status: "working", owner: "Muse · 视觉",
      next_action: "设计一张封面与两张正文信息图，核对标题不重复。",
      gates: { ...baseGates, evidence: "pass", independent_review: "pass", privacy: "pass", quote_license: "pass" },
      receipts: [{ kind: "交叉审稿", state: "mock · 已形成审核意见", timestamp: "2026-11-03T06:30:00+08:00" }]
    },
    {
      id: "DEMO-003", title: "Token 效率观察：一份最小实验记录",
      brief: "完全合成的数据，专用于演示公众号私人草稿待审核。",
      stage: "wechat_draft", status: "ready", owner: "人工 · Boss",
      next_action: "核对草稿箱回执，确认公开范围及最终人工批准。",
      gates: { ...baseGates, evidence: "pass", independent_review: "pass", privacy: "pass", quote_license: "pass", visual: "pass", package_integrity: "pass" },
      receipts: [{ kind: "发布包校验", state: "mock · 完成", timestamp: "2026-11-03T06:00:00+08:00" }]
    },
    {
      id: "DEMO-004", title: "把一次问题修复写成技术文章",
      brief: "演示选题池中的待研究内容。",
      stage: "idea", status: "queued", owner: "Chat · 研究",
      next_action: "收集可公开的第一手资料和复现步骤。",
      gates: { ...baseGates },
      receipts: []
    }
  ]
};
