// ─── Header ──────────────────────────────────────────────────────────────────
// Fixed top bar: ECAir brand mark · live clock · theme toggle · CEO label · avatar

import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

function LiveClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
      {dateStr} &nbsp;·&nbsp; {timeStr}
    </span>
  )
}

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-between w-full px-5" style={{ height: 48 }}>
      {/* ── Brand mark ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-md"
          style={{ width: 28, height: 28, backgroundColor: 'var(--brand-gold)', color: 'var(--bg-primary)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}
        >
          EC
        </div>
        <span style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, letterSpacing: '0.12em' }}>
          AIR
        </span>
        <div style={{ width: 1, height: 18, backgroundColor: 'var(--border-subtle)' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em' }}>
          CEO Cockpit
        </span>
      </div>

      {/* ── Right side ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <LiveClock />
        <div style={{ width: 1, height: 18, backgroundColor: 'var(--border-subtle)' }} />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 6px', borderRadius: 6, fontSize: 16, lineHeight: 1,
            color: 'var(--text-secondary)', transition: 'color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-gold)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <div style={{ width: 1, height: 18, backgroundColor: 'var(--border-subtle)' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em' }}>
          CEO View
        </span>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 30, height: 30, backgroundColor: 'var(--border-subtle)', border: '1px solid #2a3f5f', color: 'var(--brand-gold)', fontSize: 12, fontWeight: 600 }}
        >
          CEO
        </div>
      </div>
    </div>
  )
}
