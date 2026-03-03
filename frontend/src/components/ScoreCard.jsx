import React from 'react'

export default function ScoreCard({ label, score, max = 10 }) {
  const pct = Math.min(100, (score / max) * 100)
  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.scoreRow}>
        <div style={styles.barBg}>
          <div style={{ ...styles.barFill, width: `${pct}%` }} />
        </div>
        <span style={styles.num}>{score}</span>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  barBg: {
    flex: 1,
    height: 8,
    background: '#eee',
    borderRadius: 4,
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg,#111,#333)',
    borderRadius: 4,
    transition: 'width 0.3s'
  },
  num: {
    fontWeight: 600,
    minWidth: 24,
    textAlign: 'right'
  }
}
