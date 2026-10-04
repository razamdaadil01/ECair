// ─── Header ──────────────────────────────────────────────────────────────────
// Fixed top bar: ECAir brand mark · live clock · CEO label · avatar

import { useState, useEffect } from 'react'

function LiveClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <span style={{ color: '#7A92B0', fontSize: 13 }}>
      {dateStr} &nbsp;·&nbsp; {timeStr}
    </span>
  )
}

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full px-5" style={{ height: 48 }}>
      {/* ── Brand mark ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Gold "EC" badge */}
        <div
          className="flex items-center justify-center rounded-md"
          style={{
            width: 28,
            height: 28,
            backgroundColor: '#C9A84C',
            color: '#070D1A',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          EC
        </div>

        {/* AIR wordmark */}
        <span style={{ color: '#F0F4F8', fontSize: 15, fontWeight: 600, letterSpacing: '0.12em' }}>
          AIR
        </span>

        {/* Divider */}
        <div style={{ width: 1, height: 18, backgroundColor: '#1A2B45' }} />

        {/* View label */}
        <span style={{ color: '#7A92B0', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em' }}>
          CEO Cockpit
        </span>
      </div>

      {/* ── Right side ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <LiveClock />

        {/* Divider */}
        <div style={{ width: 1, height: 18, backgroundColor: '#1A2B45' }} />

        {/* CEO View label */}
        <span style={{ color: '#7A92B0', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em' }}>
          CEO View
        </span>

        {/* Avatar placeholder */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#1A2B45',
            border: '1px solid #2a3f5f',
            color: '#C9A84C',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          CEO
        </div>
      </div>
    </div>
  )
}
