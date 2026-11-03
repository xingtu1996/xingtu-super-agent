import test from "node:test";
import assert from "node:assert/strict";
import { SCHEMA, validateManifest, parseManifest, releaseGate, gateProgress, dashboardStats, createHandoffPrompt } from "../workbench/content-studio/model.mjs";
import { demoManifest } from "../workbench/content-studio/demo.mjs";

const clone = (value) => JSON.parse(JSON.stringify(value));

test("演示清单符合基础协议，且仅标 mock", () => {
  assert.equal(demoManifest.schema_version, SCHEMA);
  assert.equal(demoManifest.source.verification, "mock");
  assert.deepEqual(validateManifest(demoManifest), []);
  assert.equal(parseManifest(JSON.stringify(demoManifest)).articles.length, 4);
});

test("严格拒绝未知协议版本", () => {
  const data = clone(demoManifest);
  data.schema_version = "unknown";
  assert.match(validateManifest(data).join(" "), /schema_version/);
});

test("严格拒绝重复任务 ID 与非法阶段", () => {
  const data = clone(demoManifest);
  data.articles[1].id = data.articles[0].id;
  data.articles[2].stage = "public_send";
  const errors = validateManifest(data).join(";");
  assert.match(errors, /重复/);
  assert.match(errors, /stage/);
});

test("拒绝脚本 URL，避免导入数据产生主动执行链接", () => {
  const data = clone(demoManifest);
  data.articles[0].receipts[0].evidence_url = "javascript:alert(1)";
  assert.match(validateManifest(data).join(";"), /http/);
});

test("事实、授权、审稿、草稿回查缺失时阻断公开发布", () => {
  for (const article of demoManifest.articles) {
    assert.equal(releaseGate(article).ready, false);
  }
  const article = clone(demoManifest.articles[0]);
  for (const key of Object.keys(article.gates)) article.gates[key] = "pass";
  assert.equal(releaseGate(article).ready, true);
  article.gates.human_release = "pending";
  assert.equal(releaseGate(article).ready, false);
  article.gates.human_release = "na";
  assert.equal(releaseGate(article).ready, false);
});

test("门禁进度为实际 pass 项数，不把 na 当作通过", () => {
  const article = clone(demoManifest.articles[0]);
  const progress = gateProgress(article);
  assert.equal(progress.total, 8);
  assert.equal(progress.passed, 2);
});

test("任务统计只基于已导入清单", () => {
  const stats = dashboardStats(demoManifest);
  assert.equal(stats.total, 4);
  assert.equal(stats.blocked, 1);
  assert.equal(stats.packages, 1);
});

test("接力提示词保留输入版本、证据义务和发布边界", () => {
  const prompt = createHandoffPrompt(demoManifest.articles[0], demoManifest);
  assert.match(prompt, /DEMO-001/);
  assert.match(prompt, /2026-11-03/);
  assert.match(prompt, /不得自动群发/);
  assert.match(prompt, /证据与指纹/);
});

test("拒绝巨大文件与 JSON 解析错误", () => {
  assert.throws(() => parseManifest("x".repeat(1024 * 1024 + 1)), /1 MB/);
  assert.throws(() => parseManifest("{broken"), /JSON/);
});
