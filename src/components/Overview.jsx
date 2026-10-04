// ─── Overview Tab ─────────────────────────────────────────────────────────────
// CEO dashboard default view:
//   A. Strategic Domain KPI cards (5)
//   B. Active Alerts list
//   C. CEO Decisions Pending
//   D. Quick Stats bar

// ── Color constants ───────────────────────────────────────────────────────────
const C = {
  gold:      'var(--brand-gold)',
  goldLight: 'var(--brand-gold-light)',
  bg:        'var(--bg-primary)',
  bgCard:    'var(--bg-card)',
  bgSecondary: 'var(--bg-secondary)',
  border:    'var(--border-subtle)',
  textPrimary:   'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)',
  amber: 'var(--status-amber)',
  red:   'var(--status-red)',
  blue:  'var(--status-blue)',
}

const STATUS_COLOR = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }

// ── Shared primitives ─────────────────────────────────────────────────────────

const STATUS_GLOW = { green: 'rgba(34,197,94,0.4)', amber: 'rgba(245,158,11,0.4)', red: 'rgba(239,68,68,0.4)', blue: 'rgba(59,130,246,0.4)' }

function StatusDot({ color, size = 8 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size, height: size,
        borderRadius: '50%',
        backgroundColor: STATUS_COLOR[color] || color,
        flexShrink: 0,
        boxShadow: `0 0 5px ${STATUS_GLOW[color] || 'transparent'}`,
      }}
    />
  )
}

function SectionHeader({ title }) {
  return (
    <h2 style={{ color: C.gold, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', margin: 0 }}>
      {title}
    </h2>
  )
}

// ── Section A: Domain KPI cards ───────────────────────────────────────────────

const DOMAIN_DATA = [
  {
    id: 'commercial',
    name: 'Commercial',
    status: 'amber',
    statusLabel: 'Warning',
    metrics: [
      { label: 'Load Factor', value: '71%', note: 'target 80%', noteColor: C.amber },
      { label: 'Revenue vs Budget', value: '−8%', note: 'variance', noteColor: C.amber },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    status: 'red',
    statusLabel: 'Critical',
    metrics: [
      { label: 'Cash', value: '$184,200', note: null },
      { label: '30-Day Forecast', value: '$142,000', note: 'declining', noteColor: C.red },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    status: 'green',
    statusLabel: 'On Track',
    metrics: [
      { label: 'OTP Today', value: '86%', note: null },
      { label: 'Cancellations (7d)', value: '3%', note: null },
    ],
  },
  {
    id: 'fleet',
    name: 'Fleet',
    status: 'amber',
    statusLabel: 'Warning',
    metrics: [
      { label: 'Available', value: '3 / 4', note: '1 AOG', noteColor: C.amber },
      { label: 'Tech Reliability', value: '97.2%', note: null },
    ],
  },
  {
    id: 'safety',
    name: 'Safety',
    status: 'green',
    statusLabel: 'On Track',
    metrics: [
      { label: 'Incidents Today', value: '0', note: null },
      { label: 'AOC Validity', value: '47 days', note: 'action needed', noteColor: C.amber },
    ],
  },
]

function DomainCard({ domain }) {
  return (
    <div
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
          {domain.name}
        </span>
        <div className="flex items-center gap-2">
          <StatusDot color={domain.status} size={7} />
          <span style={{ color: STATUS_COLOR[domain.status], fontSize: 11, fontWeight: 500 }}>
            {domain.statusLabel}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-4">
        {domain.metrics.map(m => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span style={{ color: C.textSecondary, fontSize: 11 }}>{m.label}</span>
            <div className="flex items-baseline gap-1.5">
              <span style={{ color: C.textPrimary, fontSize: 24, fontWeight: 700, lineHeight: 1.1 }}>
                {m.value}
              </span>
              {m.note && (
                <span style={{ color: m.noteColor || C.textSecondary, fontSize: 10 }}>
                  {m.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View link */}
      <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
        <span
          style={{ color: C.gold, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
          onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
        >
          View Details →
        </span>
      </div>
    </div>
  )
}

function DomainCards() {
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title="Strategic Domains" />
      <div className="flex gap-3">
        {DOMAIN_DATA.map(d => (
          <DomainCard key={d.id} domain={d} />
        ))}
      </div>
    </div>
  )
}

// ── Section B: Active Alerts ──────────────────────────────────────────────────

const ALERTS = [
  {
    id: 1, level: 'red',
    text: 'Fuel payment overdue — $45,000 unpaid',
    domain: 'Finance',
    time: '2h ago',
  },
  {
    id: 2, level: 'red',
    text: 'ASECNA navigation charges overdue — $12,000',
    domain: 'Finance',
    time: '2h ago',
  },
  {
    id: 3, level: 'amber',
    text: 'Cash declining for 3 consecutive days',
    domain: 'Finance',
    time: 'Today',
  },
  {
    id: 4, level: 'amber',
    text: 'Load factor below 60% on BZV–LBV route',
    domain: 'Commercial',
    time: 'Yesterday',
  },
  {
    id: 5, level: 'amber',
    text: 'AOC expiry in 47 days — renewal action required',
    domain: 'Safety',
    time: '3d ago',
  },
]

const DOMAIN_COLORS = {
  Finance:    { bg: 'var(--blue-alpha-12)',  text: C.blue },
  Commercial: { bg: 'var(--gold-alpha-12)',  text: C.gold },
  Safety:     { bg: 'var(--green-alpha-12)', text: C.green },
  Fleet:      { bg: 'var(--amber-alpha-12)', text: C.amber },
  Operations: { bg: 'var(--green-alpha-12)', text: C.green },
}

function DomainPill({ domain }) {
  const style = DOMAIN_COLORS[domain] || { bg: 'var(--surface-subtle)', text: C.textSecondary }
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        fontSize: 10,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 4,
        whiteSpace: 'nowrap',
      }}
    >
      {domain}
    </span>
  )
}

function AlertsSection() {
  return (
    <div
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '16px 18px',
        flex: 1,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <SectionHeader title="Active Alerts" />
      </div>
      <div className="flex flex-col gap-0">
        {ALERTS.map((a, i) => (
          <div
            key={a.id}
            className="flex items-center gap-3"
            style={{
              padding: '10px 0',
              borderBottom: i < ALERTS.length - 1 ? `1px solid ${C.border}` : 'none',
            }}
          >
            <StatusDot color={a.level} size={7} />
            <span style={{ color: C.textPrimary, fontSize: 13, flex: 1 }}>{a.text}</span>
            <DomainPill domain={a.domain} />
            <span style={{ color: C.textSecondary, fontSize: 11, whiteSpace: 'nowrap' }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section C: CEO Decisions ──────────────────────────────────────────────────

const DECISIONS = [
  {
    id: 1,
    topic: 'Second grounded aircraft — repair or lease replacement?',
    deadline: 'Oct 15, 2026',
    daysLeft: 11,
    status: 'Pending',
  },
  {
    id: 2,
    topic: 'BZV–LBV route continuation decision',
    deadline: 'Oct 30, 2026',
    daysLeft: 26,
    status: 'Pending',
  },
  {
    id: 3,
    topic: 'State subsidy tranche follow-up',
    deadline: 'Oct 20, 2026',
    daysLeft: 16,
    status: 'Scheduled',
  },
]

function DecisionsSection() {
  return (
    <div
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '16px 18px',
        minWidth: 340,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <SectionHeader title="Decisions Required" />
      </div>
      <div className="flex flex-col gap-0">
        {DECISIONS.map((d, i) => (
          <div
            key={d.id}
            className="flex flex-col gap-1"
            style={{
              padding: '10px 0',
              borderBottom: i < DECISIONS.length - 1 ? `1px solid ${C.border}` : 'none',
            }}
          >
            <span style={{ color: C.textPrimary, fontSize: 13, lineHeight: 1.4 }}>{d.topic}</span>
            <div className="flex items-center gap-3">
              <span style={{ color: C.textSecondary, fontSize: 11 }}>
                Deadline: {d.deadline}
              </span>
              <span
                style={{
                  color: d.daysLeft < 14 ? C.red : C.amber,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {d.daysLeft}d remaining
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: 4,
                  backgroundColor: d.status === 'Scheduled' ? 'var(--blue-alpha-12)' : 'var(--amber-alpha-12)',
                  color: d.status === 'Scheduled' ? C.blue : C.amber,
                }}
              >
                {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section D: Quick Stats bar ────────────────────────────────────────────────

const QUICK_STATS = [
  { label: 'Flights Today',    value: '6 / 6',              sub: 'operated / scheduled' },
  { label: 'OTP (7 days)',     value: '83%',                sub: 'on-time performance' },
  { label: 'Open Risks',       value: '3 Critical · 2 High', sub: 'active on risk register', valueColor: C.amber },
  { label: 'Decisions Pending', value: '2',                 sub: 'require CEO action', valueColor: C.red },
]

function QuickStatsBar() {
  return (
    <div
      className="flex"
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {QUICK_STATS.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 flex-1"
          style={{
            padding: '14px 20px',
            borderRight: i < QUICK_STATS.length - 1 ? `1px solid ${C.border}` : 'none',
          }}
        >
          <span style={{ color: C.textSecondary, fontSize: 11, letterSpacing: '0.04em' }}>
            {s.label}
          </span>
          <span style={{ color: s.valueColor || C.textPrimary, fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
            {s.value}
          </span>
          <span style={{ color: C.textSecondary, fontSize: 11 }}>{s.sub}</span>
        </div>
      ))}
    </div>
  )
}

// ── Overview root ─────────────────────────────────────────────────────────────

export default function Overview() {
  return (
    <div
      className="flex flex-col gap-5"
      style={{ padding: '24px 28px', minHeight: '100%' }}
    >
      {/* Section A */}
      <DomainCards />

      {/* Sections B + C side by side */}
      <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
        <AlertsSection />
        <DecisionsSection />
      </div>

      {/* Section D */}
      <QuickStatsBar />
    </div>
  )
}
