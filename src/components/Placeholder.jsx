// ─── Placeholder ──────────────────────────────────────────────────────────────
// Shown for all Phase 2 tabs

import { NAV } from '../App.jsx'

// Flatten nav tree to find a label for any id
function findLabel(id, items = NAV) {
  for (const item of items) {
    if (item.id === id) return item.label
    if (item.children) {
      const found = findLabel(id, item.children)
      if (found) return found
    }
  }
  return id
}

export default function Placeholder({ tab }) {
  const label = findLabel(tab)

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: '100%', padding: '60px 40px', color: 'var(--text-secondary)' }}
    >
      {/* Gold icon placeholder */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          backgroundColor: 'var(--gold-alpha-12)',
          border: '1px solid var(--gold-alpha-12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="var(--brand-gold)" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="var(--brand-gold)" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="var(--brand-gold)" strokeWidth="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="var(--brand-gold)" strokeWidth="1.5" />
        </svg>
      </div>

      <h3 style={{ color: 'var(--brand-gold)', fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>
        {label}
      </h3>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, textAlign: 'center', maxWidth: 320 }}>
        This section is coming in Phase 2.
      </p>
    </div>
  )
}
