// ─── Alert Strip ─────────────────────────────────────────────────────────────
// Fixed bar below header — 4 priority signals always visible

// Status dot colors
const DOT = {
  green: '#22C55E',
  amber: '#F59E0B',
  red:   '#EF4444',
  blue:  '#3B82F6',
}

// ── Individual signal cell ────────────────────────────────────────────────────
function Signal({ label, value, dot, sub, isLast }) {
  return (
    <div
      className="flex items-center gap-3 flex-1"
      style={{
        padding: '0 20px',
        borderRight: isLast ? 'none' : '1px solid #1A2B45',
        height: '100%',
      }}
    >
      {/* Status dot */}
      <div
        style={{
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: DOT[dot],
          flexShrink: 0,
          boxShadow: `0 0 6px ${DOT[dot]}66`,
        }}
      />

      {/* Text block */}
      <div className="flex flex-col" style={{ lineHeight: 1.25 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#7A92B0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F4F8' }}>
          {value}
        </span>
      </div>

      {/* Subtext */}
      <span style={{ fontSize: 11, color: '#7A92B0', marginLeft: 4 }}>
        {sub}
      </span>
    </div>
  )
}

// ── Strip root ────────────────────────────────────────────────────────────────
export default function AlertStrip() {
  const signals = [
    {
      label: 'Fleet',
      value: '3 / 4 Operational',
      dot: 'amber',
      sub: '1 AOG',
    },
    {
      label: 'Cash',
      value: '$184,200',
      dot: 'amber',
      sub: '⚠ Declining 3 days',
    },
    {
      label: 'Payments Due',
      value: '2 Overdue',
      dot: 'red',
      sub: 'Fuel $45K · ASECNA $12K',
    },
    {
      label: 'AOC / CTA',
      value: '47 days',
      dot: 'amber',
      sub: 'Expires Dec 21, 2026',
    },
  ]

  return (
    <div className="flex h-full">
      {signals.map((s, i) => (
        <Signal key={s.label} {...s} isLast={i === signals.length - 1} />
      ))}
    </div>
  )
}
