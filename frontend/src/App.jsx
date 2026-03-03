import React from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import EntryForm from './pages/EntryForm'
import EntryList from './pages/EntryList'
import EntryDetail from './pages/EntryDetail'
import Goals from './pages/Goals'
import Settings from './pages/Settings'

export default function App() {
  return (
    <HashRouter>
      <div style={styles.app}>
        <header style={styles.header}>
          <Link to="/" style={styles.logo}>反思系统</Link>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navA}>首页</Link>
            <Link to="/entry" style={styles.navA}>记录</Link>
            <Link to="/list" style={styles.navA}>历史</Link>
            <Link to="/goals" style={styles.navA}>目标</Link>
            <Link to="/settings" style={styles.navA}>设置</Link>
          </nav>
        </header>
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/entry" element={<EntryForm />} />
            <Route path="/entry/:id" element={<EntryForm />} />
            <Route path="/list" element={<EntryList />} />
            <Route path="/detail/:id" element={<EntryDetail />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

const styles = {
  app: { minHeight: '100%', display: 'flex', flexDirection: 'column' },
  header: {
    background: '#111',
    color: '#fff',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  logo: { color: '#fff', fontWeight: 600, fontSize: 18 },
  nav: { display: 'flex', gap: 16, fontSize: 14 },
  navA: { color: 'rgba(255,255,255,0.9)' },
  main: { flex: 1, padding: 0 }
}
