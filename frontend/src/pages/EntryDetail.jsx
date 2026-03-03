import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEntryById } from '../utils/storage'
import { getGoals } from '../utils/storage'
import AnalysisPanel from '../components/AnalysisPanel'

export default function EntryDetail() {
  const { id } = useParams()
  const entry = getEntryById(id)
  const goals = getGoals()

  if (!entry) {
    return (
      <div style={styles.page}>
        <p>记录不存在</p>
        <Link to="/list">返回列表</Link>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.actions}>
        <Link to="/list" style={styles.back}>← 返回</Link>
        <Link to={`/entry/${entry.id}`} style={styles.edit}>编辑</Link>
      </div>
      <h1 style={styles.title}>{entry.date}</h1>
      <div style={styles.card}>
        <h3 style={styles.section}>任务</h3>
        {entry.tasks?.map((t, i) => (
          <div key={i} style={styles.task}>
            {t.title} [{t.type}] 精力: {t.energy}
          </div>
        ))}
      </div>
      <div style={styles.card}>
        <h3 style={styles.section}>反思</h3>
        <div style={styles.row}><b>情绪</b> {entry.emotion || '-'}</div>
        <div style={styles.row}><b>认知</b> {entry.cognition || '-'}</div>
        <div style={styles.row}><b>行为偏差</b> {entry.behavior_bias || '-'}</div>
        <div style={styles.row}><b>目标一致性</b> {entry.goal_alignment_score ?? '-'}</div>
        <div style={styles.row}><b>反思</b> {entry.reflection || '-'}</div>
        <div style={styles.row}><b>明日修正</b> {entry.improvement || '-'}</div>
      </div>
      <AnalysisPanel entry={entry} goals={goals} />
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 40 },
  actions: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
  back: { fontSize: 14 },
  edit: { fontSize: 14, color: '#111', textDecoration: 'underline' },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  card: {
    background: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  section: { fontSize: 15, marginBottom: 10 },
  task: { padding: '6px 0', fontSize: 14 },
  row: { padding: '6px 0', fontSize: 14 }
}
