// ─── Sidebar ─────────────────────────────────────────────────────────────────
// Fixed left nav: logo area + collapsible nav groups

import { useState } from 'react'
import { NAV } from '../App.jsx'

// ── Icons (inline SVG, minimal) ───────────────────────────────────────────────
function ChevronDown({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M2 4l4 4 4-4" stroke="#7A92B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Nav item component ────────────────────────────────────────────────────────
function NavItem({ item, activeTab, onNavigate, depth = 0 }) {
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeTab === item.id
  const isParentActive = hasChildren && item.children.some(c => c.id === activeTab)

  const [open, setOpen] = useState(isParentActive)

  function handleClick() {
    if (hasChildren) {
      setOpen(o => !o)
    } else {
      onNavigate(item.id)
    }
  }

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: depth === 0 ? '8px 16px' : '6px 16px 6px 28px',
    cursor: 'pointer',
    fontSize: depth === 0 ? 13 : 12,
    fontWeight: isActive ? 500 : 400,
    color: isActive ? '#C9A84C' : isParentActive ? '#E8C97A' : '#7A92B0',
    backgroundColor: isActive ? 'rgba(201,168,76,0.07)' : 'transparent',
    borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
    userSelect: 'none',
    transition: 'color 0.1s, background-color 0.1s',
  }

  return (
    <div>
      <div
        style={itemStyle}
        onClick={handleClick}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.color = '#F0F4F8'
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.color = isParentActive ? '#E8C97A' : '#7A92B0'
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        <span>{item.label}</span>
        {hasChildren && <ChevronDown open={open} />}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div>
          {item.children.map(child => (
            <NavItem
              key={child.id}
              item={child}
              activeTab={activeTab}
              onNavigate={onNavigate}
              depth={1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Sidebar root ──────────────────────────────────────────────────────────────
export default function Sidebar({ activeTab, onNavigate }) {
  return (
    <div className="flex flex-col h-full" style={{ overflowY: 'auto' }}>
      {/* Logo area — mirrors header brand mark */}
      <div
        className="flex items-center gap-3 px-4"
        style={{ height: 48, borderBottom: '1px solid #1A2B45', flexShrink: 0 }}
      >
        <div
          className="flex items-center justify-center rounded-md"
          style={{
            width: 28, height: 28,
            backgroundColor: '#C9A84C',
            color: '#070D1A',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          }}
        >
          EC
        </div>
        <div className="flex flex-col" style={{ lineHeight: 1.2 }}>
          <span style={{ color: '#F0F4F8', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em' }}>
            ECAIR
          </span>
          <span style={{ color: '#7A92B0', fontSize: 10 }}>
            CEO Cockpit
          </span>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: '18px 16px 6px', fontSize: 10, fontWeight: 600, color: '#1A2B45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Navigation
      </div>

      {/* Nav items */}
      <nav className="flex flex-col">
        {NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            onNavigate={onNavigate}
            depth={0}
          />
        ))}
      </nav>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div
        style={{ padding: '12px 16px', borderTop: '1px solid #1A2B45', fontSize: 11, color: '#1A2B45' }}
      >
        Phase 1 · Oct 2026
      </div>
    </div>
  )
}
