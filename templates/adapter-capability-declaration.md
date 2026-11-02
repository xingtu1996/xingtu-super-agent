# Adapter 能力声明模板

每个接入 XSA 的适配器必须复制本模板逐项填写，并随代码一同提交 PR。任何一项未核验，写 `unverified` 并说明原因，禁止写「应该可用」。

| 项 | 内容 |
|---|---|
| adapter_name | （适配器名称与版本） |
| capability | 能做什么（动词 + 对象，写清边界） |
| authorization | 用户如何授权（OAuth / API Key / 本地登录态 / 人工转发），授权保存在哪里 |
| permissions | 所需最小权限范围；是否区分只读与写入 |
| quota | 额度与成本口径（限流、计费方式），未知写 unverified |
| actual_transport | native / adapter / manual / unsupported（四选一） |
| dry_run_default | 默认 true；如不是，说明理由 |
| publish_default | 默认 manual |
| merge_default | 默认 manual |
| failure_fallback | 失败时的回退方式（重试预算、人工接管路径） |
| verified_at | 最近一次真实核验时间与环境 |
| verification_evidence | 核验记录链接（提交 / 日志 / 回执） |
| status | design / mock / verified / production |

## 红线

- 不读取未经用户授权的聊天记录与私有数据。
- 用户已有订阅不等于可用的 API 额度，不得这样声明。
- 没有开放接口的平台只能声明 manual。
- 状态转换不是授权；发布、合并、删除等动作永远单独等待人工批准。
