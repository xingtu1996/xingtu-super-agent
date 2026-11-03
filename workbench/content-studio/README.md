# XSA Content Studio｜行途内容创作工作台

> **Research Preview / mock**：这是一个可运行的只读前端原型，不连接真实 GitHub、公众号、Codex、Muse 或 WorkBuddy。所有内置稿件均为合成演示数据。

## 定位

服务《行途技术手记》的内容生产链路：选题 → 研究 → 成稿 → 独立审稿 → 封面配图 → 发布包 → 微信私人草稿 → 人工发布 → 复盘。

XSA 提供统一任务、门禁和回执的展示契约；**私有 xingtu-vault 仍是内容真源**。本仓公开代码不存储真实稿件、授权材料、账号和凭据。

## 本地运行

在仓库根目录执行：

    python3 -m http.server 8765 --directory workbench/content-studio

浏览器打开 http://127.0.0.1:8765/ 。

不需要 npm install、服务器数据库或任何 API Key。浏览器需要原生 ES modules 支持。

## 已有功能（mock）

- 响应式内容总览、阶段筛选与搜索。
- 稿件状态、下一动作、8 项质量门禁与 Receipt。
- 本地 JSON 导入（上限 1 MB，最多 100 篇；严格 Schema 和 URL 校验）。
- 单篇稿件的 Agent 接力文本复制，携带输入时间、当前证据、禁止自动发布的约束。
- 重置为合成演示态。

导入只在当前页面内存处理；关闭或刷新会丢弃，**不会发送到任何服务器，也不代表后台已完成核验**。自报 verified 状态不等于独立验收通过。

## 清单格式

最简 JSON 示例：

    {
      "schema_version": "xsa.content.v1",
      "generated_at": "2026-11-03T08:00:00+08:00",
      "source": {"name": "已脱敏的本地清单", "verification": "unverified"},
      "articles": [{
        "id": "LOCAL-001",
        "title": "示例标题",
        "stage": "review",
        "status": "blocked",
        "owner": "Chat · 审稿",
        "next_action": "核对事实与引语授权",
        "gates": {
          "evidence": "pending",
          "independent_review": "pending",
          "privacy": "pending",
          "quote_license": "pending",
          "visual": "pending",
          "package_integrity": "pending",
          "draft_verified": "pending",
          "human_release": "pending"
        },
        "receipts": []
      }]
    }

- stage：idea / research / draft / review / design / package / wechat_draft / published。
- status：queued / working / blocked / ready / done。
- gates：pending / pass / fail / na。首版为保守门禁，八项都必须 pass 才能显示审核通过；真正发布动作始终由用户操作。
- receipts：数组，每项 {kind, state, timestamp, evidence_url?}。证据 URL 仅人工跳转，并不等同于验证。
- source.verification：mock / unverified / verified；本地导入来源不能自动证明真实性。

## 测试

    node --test tests/content-studio.test.mjs

CI 同时检查 JavaScript 语法与模型测试。

## 下一步（design）

1. 私有、最小权限的只读服务端 Adapter，把 xingtu-vault Manifest、PR、发布包 hash、公众号草稿回查结果映射为同一数据契约。
2. 增加由其他 Agent 签名或带可验证证据的 Receipt，不信任单纯的前端 JSON 声明。
3. 加入 Event Bridge、任务去重、Watchdog 与人工审批回执；生产上线前必须有持久化队列、租约、安全审查。
4. 补发布后数据回流，支持选题与内容复盘。

当前 UI **不会上传草稿、不会群发、不会自动合并 PR 或触发执行器**；严禁将这份静态页面作为生产审批系统使用。

关联：Issue #7、docs/sdd/XSA_CONTENT_STUDIO_MVP_V0.1.md。
