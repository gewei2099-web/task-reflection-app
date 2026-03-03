import React, { useState, useEffect } from 'react'
import { getApiConfig, saveApiConfig } from '../utils/storage'

export default function Settings() {
  const [config, setConfig] = useState(getApiConfig())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    saveApiConfig(config)
    setSaved(true)
    const t = setTimeout(() => setSaved(false), 1500)
    return () => clearTimeout(t)
  }, [config])

  const update = (k, v) => setConfig(prev => ({ ...prev, [k]: v }))

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>LLM 配置</h1>
      <p style={styles.hint}>
        用于「深度行为分析」功能，手机直接访问第三方 API。API Key 仅存于本机 localStorage，不会上传。
      </p>
      <div style={styles.field}>
        <label>API Key</label>
        <input
          type="password"
          placeholder="sk-xxx"
          value={config.apiKey ?? ''}
          onChange={e => update('apiKey', e.target.value)}
          autoComplete="off"
        />
      </div>
      <div style={styles.field}>
        <label>接口地址 (OpenAI 兼容)</label>
        <input
          placeholder="https://api.xxx.com/v1"
          value={config.baseUrl ?? ''}
          onChange={e => update('baseUrl', e.target.value)}
        />
      </div>
      <div style={styles.field}>
        <label>模型名称</label>
        <input
          placeholder="gpt-4o-mini"
          value={config.model ?? ''}
          onChange={e => update('model', e.target.value)}
        />
      </div>
      {saved && <div style={styles.saved}>已保存</div>}
      <p style={styles.warn}>
        提示：部分 API 可能因 CORS 限制无法在浏览器直接调用，需选择支持跨域的供应商。
      </p>
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  hint: { fontSize: 14, color: '#666', marginBottom: 16 },
  field: { marginBottom: 16 },
  saved: { color: '#0a0', fontSize: 14, marginBottom: 8 },
  warn: { fontSize: 13, color: '#999', marginTop: 16 }
}
