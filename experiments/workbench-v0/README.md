# XSA Workbench v0：真实 PR 只读工作台

最短路径：读取 GitHub 开放 PR → 风险预筛查 → 生成 Markdown 和 JSON 报告。**不写仓库、不合并、不发布、不读取私有资料到公开仓库。**

```bash
python3 experiments/workbench-v0/workbench.py --repo xingtu1996/xingtu-super-agent
cat outputs/workbench/status.md
```

私有仓需在本地设置有读取权限的 `GITHUB_TOKEN`；不要提交 Token 或包含私有 PR 信息的报告。输出目录默认在本地。也可通过 `--fixture fixtures/sample-prs.json` 离线演示。

**当前边界**：仅获取前 100 个开放 PR，未分页；规则是保守关键词预筛查，不读取 CI、审批、diff 或真实可合并性。所有非 Draft PR 都必须经过独立审核，绝不自动合并。下一步才接 CI 与 Receipt。