# WorkBuddy → XSA 适配映射

> 状态：`verified`（本文件基于 2026-11-03 对一台 macOS 主机的只读盘点，数字均有磁盘凭证；涉及内部路径的部分已脱敏，全量私有版本保留在本地交接中心）。
> 定位：补 XSA `examples/` 与通用架构之间的缺口——回答「WorkBuddy 本地资产如何映射到 XSA 的 Goal / Trigger / Capability / Receipt」。
> 配套：`examples/workbuddy-receipt-example.jsonl`（真实脱敏回执样例）。

## 一、结论

1. **WorkBuddy 本地资产已具备接入 XSA 的全部原料**：Skills / Automations / GitHub 仓 / Receipt schema 四要素齐全，且 XSA 的 `task-event-receipt.schema.json` 已定义 Task/Event/Receipt 三 schema 与幂等键（`task_id + kind + input_revision`）。
2. **当前接力方式 = 人工转发 + GitHub 作为事实中介**（XSA ARCHITECTURE §「跨 Agent 接力时序」实线部分）。Event Bridge 自动接力仍是 `design`，未实现。
3. **首批可提交成果 = 本文件 + 一个真实回执样例**，覆盖 P0（资产清单）与 P1（最小 GitHub 落盘），P2（跨端自动验证）标记 `to-verify`。

## 二、资产总账（脱敏，数字带口径）

> 口径：统计于 2026-11-03，基于磁盘 `ls` / `find` / `du` 与各仓 `.git`。枚举类清单不复述，指向真源文件（防 B-044 副本腐烂）。

| 资产域 | 数量 | 真源文件（取值以此为准） | 可信度 |
|---|---|---|---|
| 工作区 Skills（`.agents/skills/`） | 71 实体 | `<workspace>/.agents/skills/LEDGER.md` | verified |
| 用户级 Skills（WB 池） | 96 项 | `~/.workbuddy/skills/` 目录列举 | verified |
| 用户级 Skills（通用池） | 59 项 | `~/.agents/skills/POOL_LEDGER.md` | verified |
| 三池同名镜像（工作区↔WB） | 53 | `comm -12` 实测 | verified |
| 三池同名镜像（工作区↔通用） | 5 | 同上 | verified |
| WorkBuddy 自动化（ACTIVE） | 15 | `<workspace>/.harness/scheduled/AUTOMATIONS.yaml` | verified |
| WorkBuddy 自动化（PAUSED/失效） | 2 | 同上 T-WB-09 / T-WB-10 | verified |
| cron / 豆包本机任务 | 7 | `<workspace>/.harness/scheduled/README.md` §一 | verified |
| Codex heartbeat | 1 | `weekly-content-action-plan/spec.md` | submitted-unverified |
| GitHub 仓（本地克隆） | 48 | `<workspace>/github/` 目录列举 | verified |
| 其中公开仓 | 47 | `gh api repos/<owner>/<repo> --jq .visibility` | verified |
| 其中私有仓 | 1（vault，内容真源） | 同上 | verified |
| outputs 产物 | 185M / 967 文件 | `du -sh` + `find -type f` | verified |
| local_only 隔离区 | 489M / 4498 文件 | 同上 | verified |
| tools 工具脚本 | 300 .py + 25 .sh | `find -name` | verified |

**去重说明**：Skills 三池存在大量同名镜像（53+5），这是跨工具兼容设计的**必需副本**（HARNESS.md §四铁律 4：同一红线在 AGENTS.md / CLAUDE.md / WB memory 各出现一次是必需的，只有同工具内的复述才应收口）。是否真存在 B-010 型 shadow（同名不同内容、静默顶替），需 `skill_pool_audit.py` 逐项 md5 比对，**标记 to-verify**。

## 三、WorkBuddy → XSA 适配映射

| XSA 概念 | WorkBuddy 本地载体 | 当前状态 | 接入动作 |
|---|---|---|---|
| **Goal** | boss 在 `inbox/待发.md` 的 `[决策]`/`[指令]` 标签 + RULER.md 角色预设 | verified | Goal 文本经脱敏后写入 XSA Task.objective；inbox 条目本身不上公开仓 |
| **Source** | `~/.workbuddy/projects/**/*.jsonl`（会话原文，私有）+ `<workspace>/会话留档_*/`（蒸馏存档） | verified | Source 仅声明读取位置与身份边界，不传原文；`payload_ref` 指向脱敏引用 |
| **Trigger** | WorkBuddy automation 到时触发 / cron 到点 / 手动指令 | verified | Trigger 记录 event_id + task_id + input_revision，不携带聊天正文 |
| **Task** | AGENTS.md 技能路由表 + workflows/ + specs/ | verified | Task.kind 用技能 slug（如 `mp-publish-sop`）；input_revision 用源文件 sha256 前 12 位 |
| **Policy** | `rules/RULES.md` + `rules/RULES.d/` + SAF-010 隐私红线 + BUL-001~008 防弹工作法 | verified | Policy 按 Source 划分允许名单；隐私扫描 `privacy_scan.py` 是硬门禁（但 B-053：全绿须双通道 grep 交叉） |
| **Capability** | Skills 四池（.agents / ~/.workbuddy / ~/.agents / 公开仓 xingtu-skills） | verified | Capability 声明用 `templates/adapter-capability-declaration.md` 模板；跨 Agent 可复用 vs WB 专有需标注 |
| **Executor** | WorkBuddy / Claude Code / Codex / 豆包 / ZCode / 千问办公（六工具共用同一 workspace） | verified | Executor 不自研，走适配器；六工具发现顺序不同致同名 skill 生效版本不同（B-010） |
| **Receipt** | `task-event-receipt.schema.json` + `examples/workbuddy-receipt-example.jsonl`（本批新增） | submitted-unverified | Receipt.evidence_sha 用产物 sha256；output_ref 指向 GitHub commit SHA 或私有 vault 路径 |
| **Watchdog** | `.harness/memory/bad-case-index.md`（B-001~B-066）+ `tools/fact_drift_lint.py` | verified | Watchdog 按证据巡检；B-050 教训：共享表写后必须复核，不能信回执 |

## 四、跨账号接力断层（已识别，5 类）

> 来源：坏例索引 B-010/B-044/B-047/B-048/B-050 + AUTOMATIONS.yaml 备注栏 + CHANGELOG 近期纠偏条目。

| # | 断层类型 | 一手证据 | 影响 | 建议 |
|---|---|---|---|---|
| 1 | **多套定时任务重叠** | T-06（晨间决策日报）在 WorkBuddy / ZCode / 豆包本机三侧均有登记，09:30 双跑会双推送；T-01 元宝抓取在云电脑 + 豆包本机两环境各一 ID | 重复推送打扰 boss；水位线幂等任务双跑无害，但推送类任务双跑有害 | 裁决保留单一执行平台；推送类任务强制 single-source；幂等类任务可容忍双跑 |
| 2 | **失效任务未清理** | T-WB-09（工作空间收纳）PAUSED + validUntil 已过；T-WB-10（云端 AI 资讯）prompt 单句无产物，能力劣于 T-WB-02；两条旧数据回流自动化 lastRun 停在 2026-09-13 | 注册表与运行时事实分叉；新 Agent 读档案会误以为在跑 | `automation_governance.py` 软删 + 「无第二代正牌同姓不删」原则 |
| 3 | **Skills 同名 shadow 风险** | 工作区↔WB 用户级 53 同名、↔通用 5 同名；B-010 实证 session-sediment 曾被用户级静默顶替 | 同名 skill 在不同工具生效版本不同，行为异常难排查 | 逐项 md5 比对（`skill_pool_audit.py`）；同名双份必须声明哪份为准 |
| 4 | **共享表写覆盖丢行** | B-050：`changelog_append.py` 曾裸 read-modify-write，并发会 lost update；已修为 fcntl.flock + 锁内重读 + 原子替换 + 写后复核 | 跨工具留痕会丢行，「回显已插入」≠「文件里有」 | 任何跨工具共享登记表（CHANGELOG / 产出索引 / LEDGER / 坏例索引）写前问「有没有第二支笔」 |
| 5 | **会话描述当运行证据** | B-009：批量成稿凭空编造第三方机制；B-053：privacy_scan 全绿但 grep 命中真名；B-058：凭排期档反推「已消费」连错 6 轮 | 模型自述与脚本回执都不是完成凭证 | 完成判定查磁盘/远端 SHA，不问模型也不问单通道扫描器 |

## 五、风险与边界

- **不上公开仓的内容**：原始 Session / 完整日志 / 生产凭据 / 内部项目名 / 客户名 / 真名 / 手机号 / 邮箱 / 绝对个人路径（SAF-010 + 任务书 §四）。本文件所有路径已脱敏为 `<workspace>` 或 `~/.workbuddy/`。
- **不修改生产配置**：本批仅新增 docs + examples，不改 main、不自动合并 PR、不启停定时任务、不重配自动化。
- **未验证项**：P2 跨端自动验证（WorkBuddy 执行 → GitHub 保存 → GPT/Codex 自动读取并理解下一步）标记 `to-verify`；当前接力靠人工转发 + GitHub 作为事实中介，不宣称已打通。
- **Receipt 样例局限**：`examples/workbuddy-receipt-example.jsonl` 基于本次盘点任务本身生成，是离线样例（`mock`），非生产 Event Bridge 产出。

## 六、GPT / Codex 下轮任务（交接清单）

> 优先级从高到低，每项带所需 Capability 与验收条件。

1. **[P1] Skills 同名 shadow 全量 md5 比对**
   - 输入：`.agents/skills/` + `~/.workbuddy/skills/` + `~/.agents/skills/`
   - Capability：`skill_pool_audit.py`（已存在）
   - 验收：产出三池 md5 对照表，同名不同内容者列「以哪份为准」裁决建议
   - 风险：B-010 型 shadow 会导致行为异常难排查

2. **[P1] 定时任务 single-source 裁决**
   - 输入：AUTOMATIONS.yaml + cron README §一 + 豆包本机任务清单
   - Capability：`automation_governance.py`
   - 验收：每个任务标注唯一执行平台；推送类任务强制 single-source；失效任务软删
   - 风险：T-06 双跑已实害（双推送打扰 boss）

3. **[P2] 历史会话蒸馏到 vault**
   - 输入：`会话留档_2026-10-27/`（96 文件）+ `~/.workbuddy/projects/` + `local_only/历史归档/`
   - Capability：`session-distill` / `session-sediment` skill
   - 验收：提炼可复用工程知识与失败案例，落 vault `04_会话与复盘/`；不复制全文，只留引用与教训
   - 风险：会话含内部信息，禁止上公开仓

4. **[P2] XSA Event Bridge 最小原型**
   - 输入：`task-event-receipt.schema.json` + `experiments/event-bridge-v0.1/`
   - Capability：XSA Executor 适配器（design）
   - 验收：一个真实 Task 从 WorkBuddy 触发 → GitHub 保存 Receipt → 另一 Agent 读取并继续
   - 风险：无事务性状态存储前不得宣称多 Worker 生产可用

## 七、可信度标记图例

| 标记 | 含义 |
|---|---|
| `verified` | 有可核对的磁盘/远端证据（文件存在、SHA 匹配、命令输出） |
| `submitted-unverified` | 已提交到仓库但未经独立执行验证 |
| `historical-claim` | 历史资料或会话声明，无独立证据复核 |
| `to-verify` | 待验证的假设或能力，不得读作已实现 |

## 八、关联

- XSA 架构：`docs/ARCHITECTURE.md`
- Receipt schema：`templates/task-event-receipt.schema.json`
- Capability 声明模板：`templates/adapter-capability-declaration.md`
- 定时任务 Registry：`xingtu-automations/registry/AUTOMATIONS.yaml`（公开镜像，prompt 已脱敏）
- 规则工程化：`xingtu-rules/`
- 坏例索引（私有）：`<workspace>/.harness/memory/bad-case-index.md` B-001~B-066
- 私有全量版本：`<workspace>/交接中心/05_会话留档/workbuddy-distillation-2026-11-03/`（含内部路径，不上公开仓）
