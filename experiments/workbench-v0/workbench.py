#!/usr/bin/env python3
"""XSA Workbench v0: read-only GitHub PR triage, Python standard library only."""
import argparse
import datetime as dt
import json
import os
import pathlib
import urllib.error
import urllib.request

API = "https://api.github.com"
def fetch_prs(repo, token=None):
    req = urllib.request.Request(
        f"{API}/repos/{repo}/pulls?state=open&per_page=100",
        headers={"Accept":"application/vnd.github+json",
                 "User-Agent":"xingtu-xsa-readonly",
                 **({"Authorization":f"Bearer {token}"} if token else {})})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.load(response)

def classify(pr):
    title = pr.get("title", "")
    body = pr.get("body") or ""
    draft = bool(pr.get("draft"))
    flags = [word for word in ("privacy", "secret", "production", "deploy", "publish",
                               "隐私", "密钥", "生产", "发布", "授权")
             if word.lower() in (title + " " + body).lower()]
    if flags:
        return "manual_review", "敏感词命中：" + ", ".join(flags)
    if draft:
        return "draft", "Draft PR，等待作者确认"
    return "review_needed", "非 Draft；仍需 CI 与独立审核，不自动合并"

def build(repo, prs):
    rows = []
    for p in prs:
        state, reason = classify(p)
        rows.append({"number":p["number"],"title":p.get("title",""),
                     "url":p.get("html_url",""),"state":state,"reason":reason,
                     "updated_at":p.get("updated_at"),"draft":bool(p.get("draft"))})
    rows.sort(key=lambda x:(x["state"],x["number"]))
    return {"repo":repo,"generated_at":dt.datetime.now(dt.timezone.utc).isoformat(),
            "source":"GitHub REST open PR list; no CI or review verification",
            "count":len(rows),"items":rows}

def markdown(data):
    lines = [f"# XSA 工作台 · {data['repo']}", "",
             f"采集时间：{data['generated_at']}；开放 PR：{data['count']}",
             "", "> 只读预筛查；非 CI 结论，不代表可合并。", "",
             "| PR | 状态 | 依据 |", "|---|---|---|"]
    for x in data["items"]:
        title = x["title"].replace("|","/").replace("\n"," ")
        lines.append(f"| [#{x['number']} {title}]({x['url']}) | {x['state']} | {x['reason']} |")
    if not data["items"]:
        lines.append("| — | 无开放 PR | — |")
    return "\n".join(lines)+"\n"

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--repo",default="xingtu1996/xingtu-super-agent")
    p.add_argument("--fixture",help="本地 JSON 数组，避免联网")
    p.add_argument("--out",default="outputs/workbench")
    a = p.parse_args()
    prs = json.loads(pathlib.Path(a.fixture).read_text(encoding="utf-8")) if a.fixture else fetch_prs(a.repo,os.getenv("GITHUB_TOKEN"))
    data = build(a.repo,prs)
    out = pathlib.Path(a.out)
    out.mkdir(parents=True,exist_ok=True)
    (out/"status.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    (out/"status.md").write_text(markdown(data),encoding="utf-8")
    print(f"read-only: {data['count']} open PRs; output={out}/status.md")
if __name__=="__main__":
    main()
