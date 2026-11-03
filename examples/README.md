# 示例

当前阶段只有一个可运行示例：离线 Event Bridge 原型。它无网络、无真实 Agent、无生产写入，用来演示 Task 路由、幂等去重与 Receipt 回执。

## 运行演示

```bash
cd experiments/event-bridge-v0.1
python3 bridge.py
```

预期输出：两条任务的回执 JSON——`demo-001`（content）由 `mock-muse` 执行、`demo-002`（code_review）由 `mock-codex` 执行，状态均为 `succeeded`，并带输入内容的 SHA-256 指纹与 `memory://mock/...` 形式的产物引用。

## 运行测试

```bash
cd experiments/event-bridge-v0.1
python3 -m unittest discover -s . -p 'test_*.py'
# 或在仓库根目录：
python3 -m unittest discover -s tests -p 'test_*.py'
```

3 条测试分别验证：内容任务路由与重复事件不二次执行；代码审核回执与输入 SHA 对应；模拟失败、审批门禁与不可用适配器被拒。

## 自己组一个任务包

按 `templates/task-event-receipt.schema.json` 的字段组装 Task（task_id、objective、kind、input_revision、owner、approval_required、state、created_at、updated_at），执行后按 Receipt 字段回收执（worker、status、output_ref、evidence_sha、error_code、completed_at）。适配器接入前先用 `templates/adapter-capability-declaration.md` 做能力声明。

## WorkBuddy 适配样例（`workbuddy-receipt-example.jsonl`）

基于一台 macOS 主机的真实只读盘点任务生成的脱敏回执，三行分别对应 Task / Event / Receipt。状态 `mock`：由人工触发、离线生成，非生产 Event Bridge 产出。配套文档 `docs/adapters/workbuddy-adapter.md` 解释 WorkBuddy 本地资产如何映射到 XSA 的 Goal / Trigger / Capability / Receipt。
