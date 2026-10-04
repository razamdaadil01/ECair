// ─── Sidebar ─────────────────────────────────────────────────────────────────
// Fixed left nav: logo area + single-open accordion nav groups
// Collapsible: 220px expanded / 64px collapsed, persisted to localStorage

import { useState } from 'react'
import { NAV } from '../App.jsx'

const ICONS = {
  overview:      '🏠',
  strategic:     '📊',
  support:       '🏢',
  risk:          '⚠️',
  decisions:     '✅',
  hr:            '👥',
  communication: '📢',
  legal:         '⚖️',
  audit:         '🔍',
  travel:        '✈️',
  it:            '💻',
  product:       '🛎️',
  procurement:   '📦',
  general:       '🔧',
}

function ChevronDown({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
    >
      <path d="M2 4l4 4 4-4" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NavItem({ item, activeTab, onNavigate, openSection, onToggleSection, collapsed, onExpandAndOpen }) {
  const [hovered, setHovered] = useState(false)
  const hasChildren    = item.children && item.children.length > 0
  const isActive       = activeTab === item.id
  const isOpen         = hasChildren && openSection === item.id
  const isParentActive = hasChildren && item.children.some(c => c.id === activeTab)
  const isHighlighted  = isActive || isParentActive

  if (collapsed) {
    return (
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => hasChildren ? onExpandAndOpen(item.id) : onNavigate(item.id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: 40, cursor: 'pointer',
            backgroundColor: isHighlighted ? 'var(--gold-alpha-7)' : hovered ? 'var(--surface-hover)' : 'transparent',
            borderLeft: isHighlighted ? '3px solid var(--brand-gold)' : '3px solid transparent',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>{ICONS[item.id]}</span>
        </div>
        {hovered && (
          <div style={{
            position: 'absolute', left: 68, top: '50%', transform: 'translateY(-50%)',
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)', fontSize: 12, fontWeight: 500,
            padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', zIndex: 200,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)', pointerEvents: 'none',
          }}>
            {item.label}
          </div>
        )}
      </div>
    )
  }

  const itemStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', padding: '8px 16px', cursor: 'pointer', fontSize: 13,
    fontWeight: isHighlighted ? 500 : 400,
    color: isActive ? 'var(--brand-gold)' : isParentActive ? 'var(--brand-gold-light)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'var(--gold-alpha-7)' : 'transparent',
    borderLeft: isActive ? '3px solid var(--brand-gold)' : '3px solid transparent',
    userSelect: 'none', transition: 'color 0.1s, background-color 0.1s',
  }

  return (
    <div>
      <div
        style={itemStyle}
        onClick={() => hasChildren ? onToggleSection(item.id) : onNavigate(item.id)}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.backgroundColor = 'var(--surface-hover)'
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.color = isParentActive ? 'var(--brand-gold-light)' : 'var(--text-secondary)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        <span>{item.label}</span>
        {hasChildren && <ChevronDown open={isOpen} />}
      </div>

      {hasChildren && isOpen && (
        <div>
          {item.children.map(child => (
            <SubItem key={child.id} item={child} activeTab={activeTab} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

function SubItem({ item, activeTab, onNavigate }) {
  const isActive = activeTab === item.id

  const style = {
    display: 'block', width: '100%', padding: '6px 16px 6px 24px', cursor: 'pointer',
    fontSize: 12, fontWeight: isActive ? 500 : 400,
    color: isActive ? 'var(--brand-gold)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'var(--gold-alpha-7)' : 'transparent',
    borderLeft: isActive ? '3px solid var(--brand-gold)' : '3px solid transparent',
    userSelect: 'none', transition: 'color 0.1s, background-color 0.1s',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  }

  return (
    <div
      style={style}
      onClick={() => onNavigate(item.id)}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.color = 'var(--text-primary)'
          e.currentTarget.style.backgroundColor = 'var(--surface-hover)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {item.label}
    </div>
  )
}

export default function Sidebar({ activeTab, onNavigate, collapsed, onToggleCollapsed }) {
  const [openSection, setOpenSection] = useState(() => {
    const parent = NAV.find(n => n.children?.some(c => c.id === activeTab))
    return parent?.id ?? null
  })

  function handleExpandAndOpen(id) {
    onToggleCollapsed()
    setOpenSection(id)
  }

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        overflowY: collapsed ? 'visible' : 'auto',
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: 48, flexShrink: 0,
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: collapsed ? 0 : 12,
          padding: collapsed ? 0 : '0 16px',
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 6, flexShrink: 0,
            backgroundColor: 'var(--brand-gold)', color: 'var(--bg-primary)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          }}
        >
          EC
        </div>
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em' }}>ECAIR</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 10 }}>CEO Cockpit</span>
          </div>
        )}
      </div>

      {/* Section label — hidden when collapsed */}
      {!collapsed && (
        <div style={{ padding: '18px 16px 6px', fontSize: 10, fontWeight: 600, color: 'var(--border-subtle)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Navigation
        </div>
      )}

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', paddingTop: collapsed ? 8 : 0 }}>
        {NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            onNavigate={onNavigate}
            openSection={openSection}
            onToggleSection={id => setOpenSection(prev => prev === id ? null : id)}
            collapsed={collapsed}
            onExpandAndOpen={handleExpandAndOpen}
          />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Footer — hidden when collapsed */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', fontSize: 11, color: 'var(--text-secondary)' }}>
          Phase 1 · Oct 2026
        </div>
      )}

      {/* Toggle button */}
      <div
        onClick={onToggleCollapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 40, cursor: 'pointer', flexShrink: 0,
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)',
          fontSize: 12, userSelect: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
      >
        {collapsed ? '▶' : '◀'}
      </div>
    </div>
  )
}
