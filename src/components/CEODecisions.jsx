// ─── CEO Decisions ────────────────────────────────────────────────────────────

import { useState } from 'react'

const C = {
  gold: 'var(--brand-gold)', bg: 'var(--bg-primary)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)',
}

const PENDING = [
  {
    id: 'D-2025-14',
    title: 'Fleet Maintenance Contract Renewal',
    due: '2025-10-10',
    domain: 'Operations',
    options: [
      { label: 'Renew current supplier', note: '+8% rate increase, 24-month term' },
      { label: 'Switch to AeroCare MRO', note: 'Competitive rate, 3-month transition risk' },
      { label: 'Hybrid model', note: 'Keep line maintenance in-house, outsource heavy checks' },
    ],
    recommendation: 'Option 2 — AeroCare MRO offers a 12% cost saving vs renewal and has completed the pre-qualification audit. Transition risk is manageable with a 90-day parallel-run clause.',
    facts: ['Current contract expires 2025-11-30', 'Annual spend: $1.2M', 'AeroCare audit score: 94/100', '3 competing bids received'],
  },
  {
    id: 'D-2025-15',
    title: 'New Route: Brazzaville – Nairobi',
    due: '2025-10-15',
    domain: 'Commercial',
    options: [
      { label: 'Launch Q1 2026 (3× weekly)', note: 'Full committed slot at NBO, $480K pre-launch cost' },
      { label: 'Launch Q2 2026 (2× weekly)', note: 'Reduced capex, lower initial frequency' },
      { label: 'Defer to 2027', note: 'Avoids cash pressure, cedes first-mover advantage' },
    ],
    recommendation: 'Option 1 — Demand analysis shows 78% projected load factor in Month 3. Kenya Aviation Authority slot approval is valid only until Dec 2025; deferral forfeits the slot.',
    facts: ['Slot valid until 2025-12-31', 'Break-even: Month 5 at 72% LF', 'No direct competitor on route', 'Nairobi hub connects 11 onward destinations'],
  },
  {
    id: 'D-2025-16',
    title: 'HR Salary Review 2025',
    due: '2025-10-20',
    domain: 'HR',
    options: [
      { label: '4% across-the-board increase', note: 'Budget impact +$190K/yr, high staff approval' },
      { label: 'Merit-based 0–6%', note: 'Budget impact +$140–220K/yr, differentiated reward' },
      { label: 'Freeze salaries', note: 'No budget impact; high retention risk in current market' },
    ],
    recommendation: 'Option 2 — Merit-based increase aligns with the 2025–2028 HR strategy. The CHRO proposes 3% base + up to 3% merit. Retains top performers without blanket cost.',
    facts: ['Current total payroll: $4.7M/yr', 'Turnover rate: 11.4% (industry avg 9%)', 'Last increase: 2023 (2.5%)', 'Staff satisfaction score: 64/100'],
  },
]

const DECIDED = [
  { id: 'D-2025-11', title: 'Aircraft Wet Lease Extension — B737 YA-ECA', decided: '2025-09-15', outcome: 'Approved — 6-month extension at current rate' },
  { id: 'D-2025-12', title: 'IT Server Acquisition (Dual-Redundancy)',     decided: '2025-09-28', outcome: 'Approved — Budget $320K, procurement to begin Oct 2025' },
  { id: 'D-2025-13', title: 'Catering Supplier Change — International Routes', decided: '2025-10-01', outcome: 'Deferred — Additional cost-benefit analysis requested by CFO' },
]

function StatCards() {
  const cards = [
    { label: 'Pending Decision', value: PENDING.length, color: C.red,   icon: '⏳' },
    { label: 'Scheduled',        value: 1,               color: C.blue,  icon: '📅' },
    { label: 'Decided (Oct)',    value: DECIDED.length,  color: C.green, icon: '✅' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {cards.map(c => (
        <div key={c.label} style={{
          backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${c.color}`,
          borderRadius: 8, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 28 }}>{c.icon}</span>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 4 }}>{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DecisionCard({ d }) {
  const domainColor = { Operations: C.amber, Commercial: C.blue, HR: C.green }
  const domainBg    = { Operations: 'var(--amber-alpha-12)', Commercial: 'var(--blue-alpha-12)', HR: 'var(--green-alpha-12)' }
  const dc  = domainColor[d.domain] || C.gold
  const dcBg = domainBg[d.domain]  || 'var(--gold-alpha-12)'

  return (
    <div style={{
      backgroundColor: C.bgCard, border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${C.red}`, borderRadius: 8, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>{d.id}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, color: dc,
              backgroundColor: dcBg, padding: '2px 8px', borderRadius: 4,
            }}>{d.domain}</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>{d.title}</h3>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: C.textSecondary, marginBottom: 2 }}>Decision due</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{d.due}</div>
        </div>
      </div>

      {/* 3-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 16 }}>
        {/* Options */}
        <div style={{ backgroundColor: C.bgSecondary, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Options</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.options.map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', backgroundColor: C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: C.textSecondary }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 2, lineHeight: 1.4 }}>{o.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div style={{ backgroundColor: 'var(--gold-alpha-7)', border: `1px solid var(--gold-alpha-12)`, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Recommendation</div>
          <p style={{ margin: 0, fontSize: 12, color: C.textPrimary, lineHeight: 1.65 }}>{d.recommendation}</p>
        </div>

        {/* Key Facts */}
        <div style={{ backgroundColor: C.bgSecondary, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Key Facts</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.facts.map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: 4, width: 5, height: 5, borderRadius: '50%', backgroundColor: C.gold }} />
                <span style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function DecidedCard({ d }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      backgroundColor: C.bgCard, border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${C.green}`, borderRadius: 8, overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, flexShrink: 0 }}>{d.id}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, textAlign: 'left' }}>{d.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: C.textSecondary }}>{d.decided}</span>
          <span style={{ fontSize: 10, color: C.green, backgroundColor: 'var(--green-alpha-12)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Decided</span>
          <span style={{ fontSize: 14, color: C.textSecondary }}>{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 18px 16px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 12, fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>
            <strong style={{ color: C.textPrimary }}>Outcome:</strong> {d.outcome}
          </div>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>
  )
}

export default function CEODecisions() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          ECAir CEO Cockpit <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>CEO Decisions</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>CEO Decisions</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>3 pending · 1 scheduled · 3 decided this month</p>
        </div>
      </div>

      <StatCards />

      <div>
        <SectionHeader label="Pending Decision" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {PENDING.map(d => <DecisionCard key={d.id} d={d} />)}
        </div>
      </div>

      <div>
        <SectionHeader label="Decided" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {DECIDED.map(d => <DecidedCard key={d.id} d={d} />)}
        </div>
      </div>
    </div>
  )
}
