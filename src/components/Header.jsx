// ─── Header ──────────────────────────────────────────────────────────────────
// Fixed top bar: ECAir brand mark · live clock · theme toggle · role switcher

import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useRole, ROLES, DEPARTMENTS } from '../context/RoleContext.jsx'

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

const ROLE_ORDER = ['CEO', 'FINANCE_TEAM', 'COMMERCIAL_TEAM', 'OPS_TEAM', 'MCC_TECHNICAL', 'SAFETY_OFFICER', 'DEPARTMENT_HEAD', 'EXECUTIVE_MGMT', 'ADMIN']

function RoleSwitcher() {
  const { role, activeDepartment, setRole, setActiveDepartment } = useRole()
  const [open, setOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  function calcPos() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
    }
  }

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    function handleResize() {
      if (open) calcPos()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  const currentRole = ROLES[role]
  const label = role === 'DEPARTMENT_HEAD' && activeDepartment
    ? `Dept Head — ${activeDepartment}`
    : currentRole.label

  function handleButtonClick() {
    if (!open) calcPos()
    setOpen(o => !o)
  }

  const dropdown = open ? ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed', top: dropdownPos.top, right: dropdownPos.right,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 8, padding: '4px 0',
        minWidth: 220, zIndex: 99999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {ROLE_ORDER.map((id, idx) => {
        if (id === 'ADMIN' && ROLE_ORDER[idx - 1] !== 'ADMIN') {
          // separator before Admin
        }
        const r = ROLES[id]
        const isAdminWithSep = id === 'ADMIN'
        return (
          <div key={r.id}>
            {isAdminWithSep && <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />}
            <div
              onClick={() => {
                setRole(r.id)
                if (r.id !== 'DEPARTMENT_HEAD') setOpen(false)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 14px', cursor: 'pointer', fontSize: 12,
                color: 'var(--text-primary)',
                backgroundColor: role === r.id ? 'var(--surface-subtle)' : 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--surface-subtle)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = role === r.id ? 'var(--surface-subtle)' : 'transparent' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: r.color, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{r.label}</span>
              {role === r.id && <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>✓</span>}
            </div>
          </div>
        )
      })}

      {role === 'DEPARTMENT_HEAD' && (
        <>
          <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />
          <div style={{ padding: '5px 14px 3px', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Department
          </div>
          {DEPARTMENTS.map(dept => (
            <div
              key={dept}
              onClick={() => { setActiveDepartment(dept); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 14px 7px 30px', cursor: 'pointer', fontSize: 12,
                color: 'var(--text-primary)',
                backgroundColor: activeDepartment === dept ? 'var(--surface-subtle)' : 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--surface-subtle)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = activeDepartment === dept ? 'var(--surface-subtle)' : 'transparent' }}
            >
              <span style={{ flex: 1 }}>{dept}</span>
              {activeDepartment === dept && <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>✓</span>}
            </div>
          ))}
        </>
      )}
    </div>,
    document.body
  ) : null

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid var(--border-subtle)',
          borderRadius: 6, cursor: 'pointer', padding: '4px 10px',
          fontSize: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-gold)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: currentRole.color, flexShrink: 0 }} />
        <span>{label}</span>
        <span style={{ fontSize: 9, color: 'var(--text-secondary)', marginLeft: 2 }}>{open ? '▲' : '▼'}</span>
      </button>
      {dropdown}
    </>
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
        <RoleSwitcher />
      </div>
    </div>
  )
}
