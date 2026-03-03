import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveEntry, getEntryById } from '../utils/storage'

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const emptyTask = () => ({ title: '', type: '主动', energy: 5 })

export default function EntryForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    tasks: [emptyTask()],
    emotion: '',
    cognition: '',
    behavior_bias: '',
    goal_alignment_score: 5,
    reflection: '',
    improvement: ''
  })

  useEffect(() => {
    if (id) {
      const e = getEntryById(id)
      if (e) setForm({ ...e, tasks: e.tasks?.length ? e.tasks : [emptyTask()] })
    }
  }, [id])

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const addTask = () => setForm(prev => ({ ...prev, tasks: [...prev.tasks, emptyTask()] }))
  const updateTask = (i, k, v) => {
    setForm(prev => ({
      ...prev,
      tasks: prev.tasks.map((t, j) => (j === i ? { ...t, [k]: v } : t))
    }))
  }
  const removeTask = i => {
    setForm(prev => ({ ...prev, tasks: prev.tasks.filter((_, j) => j !== i) }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const entry = {
      ...form,
      id: form.id || uuid(),
      tasks: form.tasks.filter(t => t.title.trim())
    }
    saveEntry(entry)
    navigate('/list')
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{id ? '编辑记录' : '今日反思'}</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label>日期</label>
          <input
            type="date"
            value={form.date}
            onChange={e => update('date', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>今日任务</label>
          {form.tasks.map((t, i) => (
            <div key={i} style={styles.taskRow}>
              <input
                placeholder="任务标题"
                value={t.title}
                onChange={e => updateTask(i, 'title', e.target.value)}
                style={{ flex: 2 }}
              />
              <select
                value={t.type}
                onChange={e => updateTask(i, 'type', e.target.value)}
                style={{ flex: 1, minWidth: 70 }}
              >
                <option value="主动">主动</option>
                <option value="被动">被动</option>
              </select>
              <input
                type="number"
                min={1}
                max={10}
                value={t.energy}
                onChange={e => updateTask(i, 'energy', +e.target.value)}
                style={{ width: 50 }}
              />
              {form.tasks.length > 1 && (
                <button type="button" onClick={() => removeTask(i)} style={styles.delBtn}>
                  删
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTask} style={styles.addBtn}>
            + 添加任务
          </button>
        </div>
        <div style={styles.field}>
          <label>情绪</label>
          <input
            placeholder="如：焦虑、平静"
            value={form.emotion}
            onChange={e => update('emotion', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>认知偏差</label>
          <input
            placeholder="如：担心成长慢"
            value={form.cognition}
            onChange={e => update('cognition', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>行为偏差</label>
          <input
            placeholder="如：拖延"
            value={form.behavior_bias}
            onChange={e => update('behavior_bias', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>目标一致性评分 (1-10)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={form.goal_alignment_score}
            onChange={e => update('goal_alignment_score', +e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>反思</label>
          <textarea
            placeholder="效率一般..."
            value={form.reflection}
            onChange={e => update('reflection', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>明日修正</label>
          <textarea
            placeholder="早上优先做核心任务"
            value={form.improvement}
            onChange={e => update('improvement', e.target.value)}
          />
        </div>
        <button type="submit" style={styles.submit}>
          保存
        </button>
      </form>
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  field: { marginBottom: 16 },
  taskRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8
  },
  delBtn: { background: '#c00', padding: '8px 12px', fontSize: 13 },
  addBtn: { background: '#666', marginTop: 4 },
  submit: { width: '100%', padding: 14, marginTop: 8 }
}
