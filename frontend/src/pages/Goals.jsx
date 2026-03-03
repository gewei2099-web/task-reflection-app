import React, { useState, useEffect } from 'react'
import { getGoals, saveGoals } from '../utils/storage'

export default function Goals() {
  const [goals, setGoals] = useState(getGoals())

  useEffect(() => {
    saveGoals(goals)
  }, [goals])

  const update = (k, v) => setGoals(prev => ({ ...prev, [k]: v }))

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>长期目标</h1>
      <div style={styles.form}>
        <div style={styles.field}>
          <label>愿景</label>
          <textarea
            placeholder="构建智能系统能力"
            value={goals.vision ?? ''}
            onChange={e => update('vision', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>季度目标</label>
          <textarea
            placeholder="本季度要达成的..."
            value={goals.quarter_goal ?? ''}
            onChange={e => update('quarter_goal', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>本月聚焦</label>
          <textarea
            placeholder="本月重点..."
            value={goals.month_focus ?? ''}
            onChange={e => update('month_focus', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>身份宣言</label>
          <input
            placeholder="成为持续进化的人"
            value={goals.identity_statement ?? ''}
            onChange={e => update('identity_statement', e.target.value)}
          />
        </div>
        <div style={styles.hint}>自动保存至本地</div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  form: {},
  field: { marginBottom: 16 },
  hint: { fontSize: 13, color: '#999', marginTop: 8 }
}
