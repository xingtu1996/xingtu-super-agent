import { STAGES, GATE_LABELS, validateManifest, parseManifest, releaseGate, gateProgress, dashboardStats, createHandoffPrompt } from "./model.mjs";
import { demoManifest } from "./demo.mjs";

const $ = (id) => document.getElementById(id);
const STATUS_LABEL = { queued: "待开始", working: "执行中", blocked: "阻塞", ready: "待验收", done: "已记录完成" };
const GATE_ICON = { pending: "·", pass: "✓", fail: "!", na: "—" };
let manifest = demoManifest;
let imported = false;
let selected = demoManifest.articles[0].id;
let activeStage = "all";

function el(tag, className, textValue) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (textValue !== undefined) item.textContent = String(textValue);
  return item;
}
function stageName(id) {
  const entry = STAGES.find((part) => part[0] === id);
  return entry ? entry[1] : "未知阶段";
}
function showNotice(message, error = false) {
  const notice = $("notice");
  notice.textContent = message;
  notice.classList.add("visible");
  notice.style.background = error ? "#fff1ed" : "#e9f6ef";
  notice.style.color = error ? "#943b2f" : "#18835a";
}
function renderNav() {
  const target = $("stage-nav");
  target.replaceChildren();
  STAGES.forEach(([id, label]) => {
    const count = manifest.articles.filter((article) => article.stage === id).length;
    const button = el("button", "nav-link" + (activeStage === id ? " active" : ""));
    button.type = "button";
    button.append(el("span", "dot"), el("span", "", label + " · " + count));
    button.addEventListener("click", () => {
      activeStage = id;
      $("stage-filter").value = id;
      render();
    });
    target.append(button);
  });
}
function renderFilters() {
  const select = $("stage-filter");
  select.replaceChildren();
  const all = el("option", "", "全部阶段");
  all.value = "all";
  select.append(all);
  STAGES.forEach(([id, label]) => {
    const option = el("option", "", label);
    option.value = id;
    select.append(option);
  });
  select.value = activeStage;
}
function renderStats() {
  const stats = dashboardStats(manifest);
  $("stat-total").textContent = stats.total;
  $("stat-blocked").textContent = stats.blocked;
  $("stat-approval").textContent = stats.pendingApproval;
  $("stat-packages").textContent = stats.packages;
  $("mode-label").textContent = imported ? "LOCAL IMPORT · 未独立核验" : "MOCK · 离线演示";
  $("mode-label").className = imported ? "tag" : "tag demo";
  $("source-caption").textContent = "来源：" + manifest.source.name + " · 声明状态 " + manifest.source.verification + " · 非实时连接";
}
function filteredArticles() {
  const term = $("search-input").value.trim().toLocaleLowerCase();
  return manifest.articles.filter((article) => {
    if (activeStage !== "all" && article.stage !== activeStage) return false;
    return !term || (article.title + " " + article.id).toLocaleLowerCase().includes(term);
  });
}
function renderArticles() {
  const target = $("article-list");
  const articles = filteredArticles();
  target.replaceChildren();
  if (!articles.length) {
    selected = null;
    target.append(el("div", "empty", "没有匹配的稿件。请更换筛选条件。"));
    return;
  }
  if (!articles.some((article) => article.id === selected)) selected = articles[0].id;
  articles.forEach((article, index) => {
    const button = el("button", "article" + (article.id === selected ? " selected" : ""));
    button.type = "button";
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-pressed", String(article.id === selected));
    const ordinal = el("span", "ordinal", String(index + 1).padStart(2, "0"));
    const body = el("span", "article-body");
    body.append(el("span", "article-title", article.title), el("span", "article-desc", article.next_action));
    const meta = el("span", "meta");
    meta.append(el("span", "pill " + article.status, STATUS_LABEL[article.status]), el("span", "", stageName(article.stage)), el("span", "", "· " + article.owner));
    body.append(meta);
    button.append(ordinal, body);
    button.addEventListener("click", () => {
      selected = article.id;
      renderArticles();
      renderDetail();
    });
    target.append(button);
  });
}
function addReceipt(parent, receipt) {
  const card = el("div", "receipt");
  card.append(el("strong", "", receipt.kind), el("small", "", receipt.state + " · " + receipt.timestamp));
  if (receipt.evidence_url) {
    const link = el("a", "", "打开原始证据");
    link.href = receipt.evidence_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.append(link);
  }
  parent.append(card);
}
function renderDetail() {
  const container = $("detail");
  container.replaceChildren();
  const article = manifest.articles.find((item) => item.id === selected);
  if (!article) {
    container.append(el("div", "empty", "当前筛选结果中没有稿件。"));
    return;
  }
  const top = el("div", "detail-top");
  top.append(el("span", "detail-id", article.id), el("span", "pill " + article.status, STATUS_LABEL[article.status]));
  container.append(top, el("h3", "", article.title), el("p", "detail-desc", article.brief || "尚无摘要，需回源补充。"));
  const next = el("div", "next");
  next.append(el("small", "", "NEXT ACTION · 建议下一步"), el("p", "", article.next_action));
  container.append(next);
  const progress = gateProgress(article);
  const gateHead = el("div", "gate-head");
  gateHead.append(el("strong", "", "发布质量门禁"), el("span", "", progress.passed + " / " + progress.total + " 项通过"));
  container.append(gateHead);
  const progressBar = el("div", "progress");
  const bar = el("span");
  bar.style.width = (100 * progress.passed / progress.total) + "%";
  progressBar.append(bar);
  container.append(progressBar);
  const list = el("div", "gate-list");
  Object.entries(GATE_LABELS).forEach(([key, label]) => {
    const state = article.gates[key];
    const row = el("div", "gate " + state);
    row.append(el("span", "", label), el("i", "", GATE_ICON[state]));
    row.title = label + "：" + ({ pass: "已声明通过", pending: "待核对", fail: "不通过", na: "不适用" }[state]);
    list.append(row);
  });
  container.append(list);
  const gate = releaseGate(article);
  container.append(el("div", "result" + (gate.ready ? " good" : ""), gate.ready
    ? "所有声明门禁已通过；仍须以真实证据和人工操作为准，工作台不会执行发布。"
    : "不可公开发布。仍需通过：" + gate.missing.join("、") + "。"));
  container.append(el("div", "receipt-title", "执行回执 / Evidence"));
  const receipts = el("div", "receipt-list");
  if (article.receipts.length) article.receipts.forEach((receipt) => addReceipt(receipts, receipt));
  else receipts.append(el("div", "receipt", "尚无回执。不能将 Agent 的口头完成声明视为交付。"));
  container.append(receipts);
  const buttons = el("div", "detail-actions");
  const handoff = el("button", "btn brand", "复制 Agent 接力任务");
  handoff.type = "button";
  handoff.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(createHandoffPrompt(article, manifest));
      showNotice("接力任务已复制。此操作不会自动调用任何 Agent。");
    } catch {
      window.prompt("浏览器未允许剪贴板，请手动复制下面的任务：", createHandoffPrompt(article, manifest));
    }
  });
  const source = el("button", "btn", "查看数据说明");
  source.type = "button";
  source.addEventListener("click", () => showNotice("当前状态来自 " + manifest.source.name + "。标记为 " + manifest.source.verification + "，仍不代表平台实时回查。"));
  buttons.append(handoff, source);
  container.append(buttons);
}
function render() {
  renderStats();
  renderNav();
  renderArticles();
  renderDetail();
}
async function importFile(file) {
  if (!file) return;
  if (file.size > 1024 * 1024) { showNotice("文件超过 1 MB，已拒绝导入。", true); return; }
  try {
    const parsed = parseManifest(await file.text());
    if (validateManifest(parsed).length) throw new Error("清单校验未通过");
    manifest = parsed;
    imported = true;
    activeStage = "all";
    selected = parsed.articles[0].id;
    $("search-input").value = "";
    renderFilters();
    render();
    showNotice("已在本地加载 " + parsed.articles.length + " 篇稿件。此数据未连接或独立核验任何外部平台。");
  } catch (error) {
    showNotice("导入失败：" + error.message, true);
  } finally {
    $("file-picker").value = "";
  }
}
$("search-input").addEventListener("input", render);
$("stage-filter").addEventListener("change", (event) => {
  activeStage = event.target.value;
  render();
});
$("file-picker").addEventListener("change", (event) => importFile(event.target.files[0]));
document.querySelector('label[for="file-picker"]').addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    $("file-picker").click();
  }
});
$("reset-button").addEventListener("click", () => {
  manifest = demoManifest;
  imported = false;
  activeStage = "all";
  selected = demoManifest.articles[0].id;
  $("search-input").value = "";
  renderFilters();
  render();
  showNotice("已恢复纯演示数据，没有修改任何远端文件。");
});
renderFilters();
render();
