// ─── Commercial Tab ───────────────────────────────────────────────────────────
// Strategic Indicators > Commercial — 5 KPIs: Weekly (3) · Monthly (1) · Quarterly (1)

import { useState } from 'react'
import KPIUpdateModal from '../forms/KPIUpdateModal.jsx'
import { useRole } from '../../context/RoleContext.jsx'

const C = {
  gold: 'var(--brand-gold)', bg: 'var(--bg-primary)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)',
}
const SC = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }
const GLOW = { green: 'rgba(34,197,94,0.33)', amber: 'rgba(245,158,11,0.33)', red: 'rgba(239,68,68,0.33)', blue: 'rgba(59,130,246,0.33)' }

function StatusDot({ color, size = 8 }) {
  const bg = SC[color] || color
  return <span style={{ display: 'inline-block', flexShrink: 0, width: size, height: size, borderRadius: '50%', backgroundColor: bg, boxShadow: `0 0 5px ${GLOW[color] || 'transparent'}` }} />
}
function StatusLine({ color, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <StatusDot color={color} size={7} />
      <span style={{ fontSize: 12, color: SC[color], fontWeight: 500 }}>{text}</span>
    </div>
  )
}
function CadenceBadge({ label }) {
  return <span style={{ fontSize: 10, color: C.textSecondary, fontWeight: 500, backgroundColor: 'var(--surface-subtle)', border: `1px solid ${C.border}`, padding: '2px 7px', borderRadius: 4 }}>{label}</span>
}
function SourceLine({ text }) {
  return <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 'auto', paddingTop: 10 }}>Source: {text}</div>
}
function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>
  )
}
function CardWrap({ children, style }) {
  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      {children}
    </div>
  )
}
function CardHeader({ title, badge, onEdit }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.gold, lineHeight: 1.4 }}>{title}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {badge && <CadenceBadge label={badge} />}
        {onEdit && (
          <button onClick={onEdit} title="Update value" style={{
            background: 'none', border: `1px solid ${C.border}`, borderRadius: 4,
            cursor: 'pointer', padding: '2px 6px', fontSize: 11, color: C.textSecondary, lineHeight: 1,
          }}>✏️</button>
        )}
      </div>
    </div>
  )
}

// ── Section 1: Weekly ─────────────────────────────────────────────────────────

const LOAD_FACTOR_ROUTES_INIT = [
  { route: 'BZV — LBV', lf: '58%', status: 'red',   label: 'Critical (< 60%)' },
  { route: 'BZV — DLA', lf: '72%', status: 'green',  label: 'On Track' },
  { route: 'BZV — LFW', lf: '64%', status: 'amber',  label: 'Warning' },
]

function LoadFactorCard() {
  const [routes] = useState(LOAD_FACTOR_ROUTES_INIT)
  return (
    <CardWrap>
      <CardHeader title="Load Factor by Route" badge="Weekly" />
      <div style={{ fontSize: 11 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 8, padding: '5px 0', borderBottom: `1px solid ${C.gold}`, color: C.textSecondary, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>
          <span>Route</span><span style={{ textAlign: 'center' }}>LF</span><span>Status</span>
        </div>
        {routes.map((r, i) => (
          <div key={r.route} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 8, padding: '8px 0', borderBottom: i < routes.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
            <span style={{ color: C.textPrimary, fontWeight: 500 }}>{r.route}</span>
            <span style={{ color: SC[r.status], fontWeight: 700, textAlign: 'center' }}>{r.lf}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <StatusDot color={r.status} size={7} />
              <span style={{ color: SC[r.status], fontSize: 10 }}>{r.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Warning if &lt; 60% on any route</div>
      <SourceLine text="Revenue Control / Ticketing PSS" />
    </CardWrap>
  )
}

function RevenueVarianceCard({ canEdit }) {
  const [value, setValue] = useState('−8%')
  const [modal, setModal] = useState(false)
  const row = { indicator: 'Revenue vs Budget Variance', value, source: 'Revenue Control / Ticketing PSS' }
  return (
    <CardWrap>
      <CardHeader title="Revenue vs Budget Variance" badge="Weekly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ fontSize: 32, fontWeight: 700, color: C.red, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>Actual revenue below budget this week</div>
      <StatusLine color="amber" text="Warning: Variance > 10% threshold approaching" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Warning if variance &gt; 10%</div>
      <SourceLine text="Revenue Control / Ticketing PSS" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Week 41 / 2026" />}
    </CardWrap>
  )
}

function ComplaintsCard({ canEdit }) {
  const [value, setValue] = useState('5')
  const [modal, setModal] = useState(false)
  const total = parseInt(value, 10) || 0
  const target = 3
  const row = { indicator: 'Passenger Complaints', value, source: 'Customer Experience' }
  return (
    <CardWrap>
      <CardHeader title="Passenger Complaints" badge="Weekly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.red, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 12, color: C.textSecondary }}>this week</span>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
          <span key={i} style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: i < target ? C.red : C.amber }} />
        ))}
        <span style={{ fontSize: 10, color: C.textSecondary, marginLeft: 4 }}>target: {target}</span>
      </div>
      <StatusLine color="red" text={`${total > target ? 'Above' : 'Below'} target of ${target} / week`} />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Target &lt; 3 / week</div>
      <SourceLine text="Customer Experience" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Week 41 / 2026" />}
    </CardWrap>
  )
}

// ── Section 2: Monthly ────────────────────────────────────────────────────────

function YieldCard({ canEdit }) {
  const [value, setValue] = useState('$187')
  const [modal, setModal] = useState(false)
  const row = { indicator: 'Yield — Net Revenue per Passenger', value, source: 'Revenue Control / Ticketing PSS' }
  return (
    <CardWrap>
      <CardHeader title="Yield — Net Revenue per Passenger" badge="Monthly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.red, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 14, color: C.textSecondary }}> / pax</span>
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>vs Budget: $210 / pax</div>
      <StatusLine color="red" text="Alert: Drop > 5% vs budget excluding seasonal effect" />
      <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic', paddingTop: 4 }}>
        Distinct from RASK — measured per passenger carried, not per seat offered.
      </div>
      <SourceLine text="Revenue Control / Ticketing PSS" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="October 2026" />}
    </CardWrap>
  )
}

// ── Section 3: Quarterly ──────────────────────────────────────────────────────

function SatisfactionCard({ canEdit }) {
  const [value, setValue] = useState('NPS: 34 · CSAT: 71%')
  const [modal, setModal] = useState(false)
  const row = { indicator: 'Customer Satisfaction — NPS / CSAT', value, source: 'Post-flight passenger survey' }
  return (
    <CardWrap>
      <CardHeader title="Customer Satisfaction — NPS / CSAT" badge="Quarterly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ fontSize: 28, fontWeight: 700, color: C.red, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>vs Previous period: NPS −6 points vs Q2 2026</div>
      <StatusLine color="red" text="Alert: Drop > 5 points vs previous period" />
      <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic', paddingTop: 4 }}>
        Post-flight passenger survey. Distinct from on-board product satisfaction tracked by Product Development.
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Alert if drop &gt; 5 points vs previous period</div>
      <SourceLine text="Post-flight passenger survey" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Q3 2026" />}
    </CardWrap>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function CommercialTab() {
  const { canEdit } = useRole()
  const ce = canEdit('strategicCommercial')

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          Strategic Indicators <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Commercial</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>Strategic Indicators — Commercial</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>5 indicators · Weekly to Quarterly</p>
        </div>
      </div>

      <div>
        <SectionHeader label="Weekly" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <LoadFactorCard />
          <RevenueVarianceCard canEdit={ce} />
          <ComplaintsCard canEdit={ce} />
        </div>
      </div>

      <div>
        <SectionHeader label="Monthly" />
        <YieldCard canEdit={ce} />
      </div>

      <div>
        <SectionHeader label="Quarterly" />
        <SatisfactionCard canEdit={ce} />
      </div>
    </div>
  )
}
