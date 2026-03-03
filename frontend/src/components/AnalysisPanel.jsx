import React, { useState } from 'react'
import { analyze } from '../api'

export default function AnalysisPanel({ entry, goals }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const { analysis } = await analyze({ entry, goals })
      setResult(analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.panel}>
      <button
        onClick={handleAnalyze}
        disabled={loading || !entry}
        style={styles.btn}
      >
        {loading ? '分析中...' : '生成深度行为分析'}
      </button>
      {error && <div style={styles.error}>{error}</div>}
      {result && (
        <div style={styles.result}>
          <h4 style={styles.resultTitle}>分析结果</h4>
          <pre style={styles.pre}>{result}</pre>
        </div>
      )}
    </div>
  )
}

const styles = {
  panel: {
    background: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  btn: {
    width: '100%',
    padding: 12,
    background: '#111',
    color: '#fff',
    borderRadius: 8,
    fontWeight: 500
  },
  error: {
    marginTop: 10,
    padding: 10,
    background: '#fee',
    color: '#c00',
    borderRadius: 8,
    fontSize: 14
  },
  result: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: '1px solid #eee'
  },
  resultTitle: {
    marginBottom: 10,
    fontSize: 15,
    color: '#333'
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.6,
    color: '#444'
  }
}
