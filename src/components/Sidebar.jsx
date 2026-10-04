// ─── Sidebar ─────────────────────────────────────────────────────────────────
// Fixed left nav: logo area + single-open accordion nav groups

import { useState } from 'react'
import { NAV } from '../App.jsx'

// ── Chevron icon ──────────────────────────────────────────────────────────────
function ChevronDown({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
    >
      <path d="M2 4l4 4 4-4" stroke="#7A92B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Top-level nav item (may have children) ────────────────────────────────────
function NavItem({ item, activeTab, onNavigate, openSection, onToggleSection }) {
  const hasChildren = item.children && item.children.length > 0
  const isActive    = activeTab === item.id
  const isOpen      = hasChildren && openSection === item.id
  const isParentActive = hasChildren && item.children.some(c => c.id === activeTab)

  function handleClick() {
    if (hasChildren) {
      onToggleSection(item.id)
    } else {
      onNavigate(item.id)
    }
  }

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: isActive || isParentActive ? 500 : 400,
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
        {hasChildren && <ChevronDown open={isOpen} />}
      </div>

      {/* Sub-items — shown only when this section is open */}
      {hasChildren && isOpen && (
        <div>
          {item.children.map(child => (
            <SubItem
              key={child.id}
              item={child}
              activeTab={activeTab}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Sub-item (depth 1, no further nesting) ────────────────────────────────────
function SubItem({ item, activeTab, onNavigate }) {
  const isActive = activeTab === item.id

  const style = {
    display: 'block',
    width: '100%',
    padding: '6px 16px 6px 24px',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: isActive ? 500 : 400,
    color: isActive ? '#C9A84C' : '#7A92B0',
    backgroundColor: isActive ? 'rgba(201,168,76,0.07)' : 'transparent',
    borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
    userSelect: 'none',
    transition: 'color 0.1s, background-color 0.1s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  return (
    <div
      style={style}
      onClick={() => onNavigate(item.id)}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.color = '#F0F4F8'
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.color = '#7A92B0'
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {item.label}
    </div>
  )
}

// ── Sidebar root ──────────────────────────────────────────────────────────────
export default function Sidebar({ activeTab, onNavigate }) {
  // Only one accordion section open at a time; null = all collapsed
  const [openSection, setOpenSection] = useState(() => {
    // Pre-open the section that contains the active tab on mount
    const parent = NAV.find(n => n.children?.some(c => c.id === activeTab))
    return parent?.id ?? null
  })

  function handleToggleSection(id) {
    setOpenSection(prev => prev === id ? null : id)
  }

  return (
    <div className="flex flex-col h-full" style={{ overflowY: 'auto' }}>
      {/* Logo area */}
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
            openSection={openSection}
            onToggleSection={handleToggleSection}
          />
        ))}
      </nav>

      <div className="flex-1" />

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1A2B45', fontSize: 11, color: '#1A2B45' }}>
        Phase 1 · Oct 2026
      </div>
    </div>
  )
}
