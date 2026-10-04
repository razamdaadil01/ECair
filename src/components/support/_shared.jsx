// ─── Support Functions — shared primitives ────────────────────────────────────
// Imported by every Support Function department tab.

import { useState } from 'react'
import KPIUpdateModal from '../forms/KPIUpdateModal.jsx'

export const C = {
  gold: 'var(--brand-gold)', bg: 'var(--bg-primary)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)',
}
export const SC = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }

// Explicit rgba glow values for StatusDot shadows (same in both themes — decorative only)
const GLOW = {
  green: 'rgba(34,197,94,0.33)', amber: 'rgba(245,158,11,0.33)',
  red: 'rgba(239,68,68,0.33)',   blue: 'rgba(59,130,246,0.33)',
}

export function StatusDot({ color, size = 8 }) {
  const bg = SC[color] || color
  return <span style={{ display: 'inline-block', flexShrink: 0, width: size, height: size, borderRadius: '50%', backgroundColor: bg, boxShadow: `0 0 5px ${GLOW[color] || 'transparent'}` }} />
}

export function StatusLine({ color, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <StatusDot color={color} size={7} />
      <span style={{ fontSize: 12, color: SC[color], fontWeight: 500 }}>{text}</span>
    </div>
  )
}

export function CadenceBadge({ label }) {
  return <span style={{ fontSize: 10, color: C.textSecondary, fontWeight: 500, backgroundColor: 'var(--surface-subtle)', border: `1px solid ${C.border}`, padding: '2px 7px', borderRadius: 4 }}>{label}</span>
}

export function SourceLine({ text }) {
  return <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 'auto', paddingTop: 10 }}>Source: {text}</div>
}

export function SectionHeader({ label, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
      {action && action}
    </div>
  )
}

export function CardWrap({ children, style }) {
  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      {children}
    </div>
  )
}

export function CardHeader({ title, badge }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.gold, lineHeight: 1.4 }}>{title}</span>
      {badge && <CadenceBadge label={badge} />}
    </div>
  )
}

export function ProgressBar({ pct, color }) {
  return (
    <div style={{ height: 5, backgroundColor: C.border, borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', backgroundColor: SC[color] || color, borderRadius: 3 }} />
    </div>
  )
}

// ── KPI Table ─────────────────────────────────────────────────────────────────

export function KPITable({ rows, onUpdateRow, period }) {
  const [editingRow, setEditingRow] = useState(null)

  return (
    <>
      <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.gold}` }}>
              {['Indicator', 'Value', 'Benchmark', '', 'Source', ...(onUpdateRow ? [''] : [])].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: C.textSecondary, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const upcoming = row.value === '—'
              const rowBg = i % 2 === 0 ? C.bgSecondary : C.bgCard
              return (
                <tr key={row.indicator + i} style={{ backgroundColor: rowBg, opacity: upcoming ? 0.7 : 1 }}>
                  <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>
                    <span style={{ color: C.textPrimary, fontWeight: 500 }}>{row.indicator}</span>
                    {upcoming && (
                      <div style={{ fontSize: 10, color: C.blue, fontStyle: 'italic', marginTop: 3 }}>
                        Activates on: {row.source.replace('Project: ', '')}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '11px 14px', color: C.textPrimary, fontWeight: 600, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>
                    {upcoming
                      ? <span style={{ fontSize: 10, color: C.blue, backgroundColor: 'var(--blue-alpha-12)', padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>Upcoming</span>
                      : row.value
                    }
                  </td>
                  <td style={{ padding: '11px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top', lineHeight: 1.5 }}>
                    {upcoming ? '—' : row.benchmark}
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'center', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                    <StatusDot color={row.status} size={10} />
                  </td>
                  <td style={{ padding: '11px 14px', color: C.textSecondary, fontSize: 11, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>
                    {row.source}
                  </td>
                  {onUpdateRow && (
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'center' }}>
                      {!upcoming && (
                        <button
                          onClick={() => setEditingRow(i)}
                          title="Update value"
                          style={{
                            background: 'none', border: `1px solid ${C.border}`, borderRadius: 4,
                            cursor: 'pointer', padding: '3px 7px', fontSize: 12, color: C.textSecondary,
                            lineHeight: 1,
                          }}
                        >✏️</button>
                      )}
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {editingRow !== null && (
        <KPIUpdateModal
          row={rows[editingRow]}
          rowIndex={editingRow}
          onClose={() => setEditingRow(null)}
          onSubmit={(idx, newValue) => {
            onUpdateRow(idx, newValue)
            setEditingRow(null)
          }}
          period={period}
        />
      )}
    </>
  )
}

// ── Execution Pro Card ────────────────────────────────────────────────────────

const EP_STATUS_LABEL = { green: 'On Track', amber: 'At Risk', red: 'Delayed', blue: 'Upcoming' }

export function ExecutionProCard({ projects, noProjects }) {
  if (noProjects) {
    return (
      <div style={{
        backgroundColor: C.bgCard,
        border: `1px solid var(--amber-border-dim)`,
        borderLeft: `4px solid ${C.amber}`,
        borderRadius: 8,
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>Action Plan Progress — Execution Pro</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '12px 14px', backgroundColor: 'var(--amber-alpha-7)', borderRadius: 6 }}>
          <span style={{ color: C.amber, fontSize: 14, flexShrink: 0 }}>⚠</span>
          <p style={{ margin: 0, fontSize: 12, color: C.amber, lineHeight: 1.6 }}>
            No projects currently tracked in Execution Pro for this function. A dedicated project should be created, or confirm that day-to-day indicators are sufficient.
          </p>
        </div>
        <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>
          Detailed project view available in Execution Pro
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: C.bgCard,
      border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${C.gold}`,
      borderRadius: 8,
      padding: '18px 20px',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.gold }}>Action Plan Progress — Execution Pro</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map(p => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 48px 110px', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: p.status === 'blue' ? C.textSecondary : C.textPrimary }}>{p.name}</span>
            <ProgressBar pct={p.progress} color={p.status} />
            <span style={{ fontSize: 12, fontWeight: 600, color: SC[p.status], textAlign: 'right' }}>{p.progress}%</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <StatusDot color={p.status} size={7} />
              <span style={{ fontSize: 11, color: SC[p.status], fontWeight: 500 }}>{EP_STATUS_LABEL[p.status]}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
        <div style={{ fontSize: 11, color: C.textSecondary }}>Source: Execution Pro</div>
        <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic', marginTop: 3 }}>
          Detailed project view available in Execution Pro
        </div>
      </div>
    </div>
  )
}

// ── Page header ───────────────────────────────────────────────────────────────

export function PageHeader({ dept, title, subtitle }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
        Support Functions <span style={{ margin: '0 6px', color: C.border }}>/</span>
        <span style={{ color: C.textPrimary }}>{dept}</span>
      </div>
      <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>{title}</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>{subtitle}</p>
      </div>
    </div>
  )
}
