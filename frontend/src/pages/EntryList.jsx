import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries, deleteEntry } from '../utils/storage'

export default function EntryList() {
  const [entries, setEntries] = useState(getEntries())

  const handleDelete = id => {
    if (confirm('确定删除这条记录？')) {
      setEntries(deleteEntry(id))
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>历史记录</h1>
      <div style={styles.list}>
        {entries.length === 0 ? (
          <div style={styles.empty}>
            暂无记录，<Link to="/entry">去写今日反思</Link>
          </div>
        ) : (
          entries.map(e => (
            <div key={e.id} style={styles.item}>
              <Link to={`/detail/${e.id}`} style={styles.link}>
                <div style={styles.date}>{e.date}</div>
                <div style={styles.preview}>
                  {e.tasks?.slice(0, 2).map(t => t.title).join('、') || e.reflection?.slice(0, 30) || '无'}
                </div>
                <div style={styles.meta}>
                  {e.emotion && <span>情绪: {e.emotion}</span>}
                  {e.goal_alignment_score != null && (
                    <span> 评分: {e.goal_alignment_score}</span>
                  )}
                </div>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(e.id)}
                style={styles.delBtn}
              >
                删除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  list: {},
  empty: { textAlign: 'center', padding: 40, color: '#666' },
  item: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  link: { flex: 1 },
  date: { fontWeight: 600, marginBottom: 4 },
  preview: { fontSize: 14, color: '#666' },
  meta: { fontSize: 12, color: '#999', marginTop: 4 },
  delBtn: { background: '#c00', padding: '8px 12px', fontSize: 13 }
}
