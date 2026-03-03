import React from 'react'
import { Link } from 'react-router-dom'
import { getEntries } from '../utils/storage'
import ScoreCard from '../components/ScoreCard'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function last7Days() {
  const entries = getEntries()
  return entries.filter(e => {
    const d = new Date(e.date).getTime()
    const now = Date.now()
    return d >= now - 7 * 24 * 60 * 60 * 1000
  })
}

function emotionStats(entries) {
  const map = {}
  entries.forEach(e => {
    const k = e.emotion || '未填写'
    map[k] = (map[k] || 0) + 1
  })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

export default function Dashboard() {
  const entries = getEntries()
  const today = todayStr()
  const todayDone = entries.some(e => e.date === today)
  const recent7 = last7Days()
  const avgScore = recent7.length
    ? Math.round(
        recent7.reduce((s, e) => s + (e.goal_alignment_score || 0), 0) / recent7.length
      )
    : '-'
  const emotions = emotionStats(recent7)

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>今日概览</h1>
      <div style={styles.card}>
        <div style={styles.today}>
          <span>今日记录</span>
          <span style={{ color: todayDone ? '#0a0' : '#c00', fontWeight: 600 }}>
            {todayDone ? '已完成' : '未完成'}
          </span>
        </div>
        {!todayDone && (
          <Link to="/entry" style={styles.link}>
            <button style={styles.btn}>去记录</button>
          </Link>
        )}
      </div>
      <ScoreCard label="最近7天成长平均分" score={avgScore === '-' ? 0 : avgScore} />
      {emotions.length > 0 && (
        <div style={styles.card}>
          <div style={styles.label}>最近情绪</div>
          <div style={styles.emotionWrap}>
            {emotions.slice(0, 5).map(([name, count]) => (
              <span key={name} style={styles.emotionTag}>
                {name} {count}
              </span>
            ))}
          </div>
        </div>
      )}
      <nav style={styles.nav}>
        <Link to="/entry">写今日反思</Link>
        <Link to="/list">历史记录</Link>
        <Link to="/goals">长期目标</Link>
      </nav>
    </div>
  )
}

const styles = {
  page: { padding: 16, paddingBottom: 80 },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 600 },
  card: {
    background: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  today: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  link: { display: 'block' },
  btn: { width: '100%', padding: 12 },
  label: { fontSize: 13, color: '#666', marginBottom: 8 },
  emotionWrap: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  emotionTag: {
    background: '#eee',
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 13
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px 0',
    gap: 8
  }
}
