// XSA Content Studio · pure model (mock adapter, no network)
export const SCHEMA = "xsa.content.v1";
export const STAGES = Object.freeze([
  ["idea", "选题"], ["research", "研究"], ["draft", "成稿"],
  ["review", "独立审稿"], ["design", "封面与配图"],
  ["package", "发布包"], ["wechat_draft", "私人草稿"], ["published", "已发布"]
]);
export const STATUSES = Object.freeze(["queued", "working", "blocked", "ready", "done"]);
export const GATE_LABELS = Object.freeze({
  evidence: "事实与来源",
  independent_review: "独立审稿",
  privacy: "隐私与脱敏",
  quote_license: "引语及授权",
  visual: "封面与配图",
  package_integrity: "发布包校验",
  draft_verified: "草稿箱回查",
  human_release: "人工发布批准"
});
export const GATE_VALUES = Object.freeze(["pending", "pass", "fail", "na"]);
const REQUIRED_KEYS = Object.keys(GATE_LABELS);
const STAGE_IDS = STAGES.map((value) => value[0]);
const LIMIT = 100;

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function safeString(value, max = 300) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
function safeUrl(value) {
  if (typeof value !== "string" || value.length > 2000) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
export function validateManifest(input) {
  const errors = [];
  if (!isObject(input)) return ["清单必须是 JSON 对象"];
  if (input.schema_version !== SCHEMA) errors.push("schema_version 必须是 " + SCHEMA);
  if (!safeString(input.generated_at, 80) || Number.isNaN(Date.parse(input.generated_at))) errors.push("generated_at 必须是有效时间");
  if (!isObject(input.source) || !safeString(input.source.name, 100) || !["mock", "unverified", "verified"].includes(input.source.verification)) errors.push("source 需包含 name 与 verification");
  if (!Array.isArray(input.articles) || input.articles.length === 0 || input.articles.length > LIMIT) {
    errors.push("articles 必须包含 1 到 " + LIMIT + " 条记录");
    return errors;
  }
  const ids = new Set();
  input.articles.forEach((article, index) => {
    const prefix = "articles[" + index + "]";
    if (!isObject(article)) { errors.push(prefix + " 必须是对象"); return; }
    if (!safeString(article.id, 64) || !/^[A-Za-z0-9._-]+$/.test(article.id)) errors.push(prefix + ".id 无效");
    else if (ids.has(article.id)) errors.push(prefix + ".id 重复");
    else ids.add(article.id);
    if (!safeString(article.title, 160)) errors.push(prefix + ".title 无效");
    if (!STAGE_IDS.includes(article.stage)) errors.push(prefix + ".stage 无效");
    if (!STATUSES.includes(article.status)) errors.push(prefix + ".status 无效");
    if (!safeString(article.owner, 80)) errors.push(prefix + ".owner 无效");
    if (!safeString(article.next_action, 500)) errors.push(prefix + ".next_action 无效");
    if (!isObject(article.gates)) errors.push(prefix + ".gates 缺失");
    else REQUIRED_KEYS.forEach((key) => {
      if (!GATE_VALUES.includes(article.gates[key])) errors.push(prefix + ".gates." + key + " 无效");
    });
    if (!Array.isArray(article.receipts) || article.receipts.length > 30) errors.push(prefix + ".receipts 必须是数组且不多于 30 条");
    else article.receipts.forEach((receipt, receiptIndex) => {
      const place = prefix + ".receipts[" + receiptIndex + "]";
      if (!isObject(receipt) || !safeString(receipt.kind, 80) || !safeString(receipt.state, 80) || !safeString(receipt.timestamp, 80) || Number.isNaN(Date.parse(receipt.timestamp))) errors.push(place + " 回执格式无效");
      if (receipt && receipt.evidence_url != null && !safeUrl(receipt.evidence_url)) errors.push(place + ".evidence_url 必须为 http(s)");
    });
    if (article.brief != null && !safeString(article.brief, 800)) errors.push(prefix + ".brief 无效");
  });
  return errors;
}
export function parseManifest(jsonText) {
  if (typeof jsonText !== "string" || jsonText.length > 1024 * 1024) throw new Error("文件超过 1 MB，或内容不是文本");
  let data;
  try { data = JSON.parse(jsonText); } catch { throw new Error("JSON 格式错误"); }
  const errors = validateManifest(data);
  if (errors.length) throw new Error(errors.slice(0, 6).join("；"));
  return data;
}
export function releaseGate(article) {
  const entries = REQUIRED_KEYS.map((key) => ({ key, value: article.gates[key] }));
  const missing = entries.filter((entry) => entry.value !== "pass").map((entry) => GATE_LABELS[entry.key]);
  return { ready: missing.length === 0, missing };
}
export function gateProgress(article) {
  const passed = REQUIRED_KEYS.filter((key) => article.gates[key] === "pass").length;
  return { passed, total: REQUIRED_KEYS.length };
}
export function dashboardStats(manifest) {
  const articles = manifest.articles;
  return {
    total: articles.length,
    blocked: articles.filter((article) => article.status === "blocked").length,
    pendingApproval: articles.filter((article) => article.gates.human_release === "pending" && article.stage !== "idea").length,
    packages: articles.filter((article) => ["package", "wechat_draft"].includes(article.stage)).length
  };
}
export function createHandoffPrompt(article, manifest) {
  const gate = releaseGate(article);
  const issues = gate.missing.join("、") || "无";
  const evidence = article.receipts.length ? article.receipts.map((receipt) => receipt.kind + ": " + receipt.state + (receipt.evidence_url ? " (" + receipt.evidence_url + ")" : "")).join("\n") : "暂无核验回执";
  return [
    "# 行途 XSA 内容接力任务（人工复制，不会自动分发）",
    "任务 ID：" + article.id,
    "稿件：" + article.title,
    "阶段：" + (STAGES.find((entry) => entry[0] === article.stage) || ["", "未知"])[1],
    "负责人：" + article.owner,
    "输入快照：" + manifest.generated_at + " / " + manifest.source.name + " / " + manifest.source.verification,
    "下一动作：" + article.next_action,
    "尚未通过的门禁：" + issues,
    "现有回执：\n" + evidence,
    "执行要求：先核对真实源数据与当前 Commit/Manifest，再操作；不得把演示数据当作实时状态。",
    "完成标准：返回变更内容、产物链接、证据与指纹、风险、人工待审批事项。",
    "边界：不得自动群发、公开发布、合并 PR、删除资料或扩大授权。"
  ].join("\n");
}
