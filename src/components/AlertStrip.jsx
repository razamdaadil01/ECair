// ─── Alert Strip ─────────────────────────────────────────────────────────────
// Fixed bar below header — 4 priority signals always visible

function Signal({ label, value, dot, sub, isLast }) {
  const DOT_COLOR = { green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)' }
  const GLOW = { green: 'rgba(34,197,94,0.4)', amber: 'rgba(245,158,11,0.4)', red: 'rgba(239,68,68,0.4)', blue: 'rgba(59,130,246,0.4)' }
  const color = DOT_COLOR[dot]
  const glow  = GLOW[dot]

  return (
    <div
      className="flex items-center gap-3"
      style={{ padding: '0 28px', borderRight: isLast ? 'none' : '1px solid var(--border-dim)', height: '100%', minWidth: 200, flexShrink: 0 }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, flexShrink: 0, boxShadow: `0 0 6px ${glow}` }} />
      <div className="flex flex-col" style={{ lineHeight: 1.25 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {value}
        </span>
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 4 }}>{sub}</span>
    </div>
  )
}

export default function AlertStrip() {
  const signals = [
    { label: 'Fleet',        value: '3 / 4 Operational', dot: 'amber', sub: '1 AOG' },
    { label: 'Cash',         value: '$184,200',           dot: 'amber', sub: '⚠ Declining 3 days' },
    { label: 'Payments Due', value: '2 Overdue',          dot: 'red',   sub: 'Fuel $45K · ASECNA $12K' },
    { label: 'AOC / CTA',    value: '47 days',            dot: 'amber', sub: 'Expires Dec 21, 2026' },
  ]

  return (
    <div className="flex h-full">
      {signals.map((s, i) => (
        <Signal key={s.label} {...s} isLast={i === signals.length - 1} />
      ))}
    </div>
  )
}
