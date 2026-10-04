// ─── Fleet Tab ────────────────────────────────────────────────────────────────
// Strategic Indicators > Fleet — 4 KPIs: Daily (1) · Weekly (2) · Quarterly (1)

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

// ── Daily: Fleet Status ───────────────────────────────────────────────────────

const AIRCRAFT = [
  { reg: '7T-VEA', type: 'Boeing 737-700', status: 'green', label: 'Operational' },
  { reg: '7T-VEB', type: 'Boeing 737-700', status: 'green', label: 'Operational' },
  { reg: '7T-VEC', type: 'Boeing 757-200', status: 'green', label: 'Operational' },
  { reg: '7T-VED', type: 'Boeing 757-200', status: 'red',   label: 'AOG — Engine fault' },
]

function AircraftBlock({ reg, type, status, label }) {
  const isAOG = status === 'red'
  return (
    <div style={{
      flex: 1,
      borderRadius: 8,
      border: `2px solid ${SC[status]}`,
      backgroundColor: isAOG ? 'var(--red-alpha-8)' : 'var(--green-alpha-6)',
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 6,
      backgroundImage: isAOG
        ? 'repeating-linear-gradient(45deg, rgba(239,68,68,0.06) 0px, rgba(239,68,68,0.06) 4px, transparent 4px, transparent 12px)'
        : 'none',
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: SC[status] }}>{reg}</span>
      <span style={{ fontSize: 11, color: C.textSecondary }}>{type}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
        <StatusDot color={status} size={7} />
        <span style={{ fontSize: 11, color: SC[status], fontWeight: 500 }}>{label}</span>
      </div>
    </div>
  )
}

function FleetStatusCard() {
  return (
    <CardWrap>
      <CardHeader title="Fleet Status — Real Time" badge="Daily" />
      <div style={{ display: 'flex', gap: 12 }}>
        {AIRCRAFT.map(a => <AircraftBlock key={a.reg} {...a} />)}
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: C.textPrimary }}>3 / 4</span>
          <span style={{ fontSize: 12, color: C.textSecondary }}>Available</span>
        </div>
        <span style={{ color: C.border }}>·</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StatusDot color="red" size={8} />
          <span style={{ fontSize: 13, color: C.red, fontWeight: 600 }}>1 AOG</span>
        </div>
      </div>
      <StatusLine color="amber" text="Warning: 1 aircraft grounded" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Critical if &lt; 1 aircraft available</div>
      <SourceLine text="MCC / Technical monitoring" />
    </CardWrap>
  )
}

// ── Weekly: Technical Reliability + Utilisation ───────────────────────────────

function TechReliabilityCard({ canEdit }) {
  const [value, setValue] = useState('97.2%')
  const [modal, setModal] = useState(false)
  const row = { indicator: 'Technical Reliability — 7 Days', value, source: 'Maintenance / MRO' }
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Technical Reliability — 7 Days" badge="Weekly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ fontSize: 32, fontWeight: 700, color: C.green, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>
        1 − (delayed/cancelled for tech reasons ÷ total departures)
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>2 of 71 departures delayed for technical reasons</div>
      <StatusLine color="green" text="On Track" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Warning &lt; 95% · Critical &lt; 90%</div>
      <SourceLine text="Maintenance / MRO" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Week 41 / 2026" />}
    </CardWrap>
  )
}

function UtilisationCard({ canEdit }) {
  const [value, setValue] = useState('6.8')
  const [modal, setModal] = useState(false)
  const row = { indicator: 'Fleet Utilisation Rate', value, source: 'MCC / Network Planning' }
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Fleet Utilisation Rate" badge="Weekly" onEdit={canEdit ? () => setModal(true) : undefined} />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Flight hours / aircraft / day</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: C.blue, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 13, color: C.textSecondary }}>hrs / aircraft / day</span>
      </div>
      <StatusLine color="blue" text="Trend monitoring — target to be defined with MCC" />
      <div style={{ fontSize: 11, color: C.amber, fontStyle: 'italic' }}>An aircraft on the ground generates no revenue.</div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Qualitative monitoring — target to be defined with MCC</div>
      <SourceLine text="MCC / Network Planning" />
      {canEdit && modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Week 41 / 2026" />}
    </CardWrap>
  )
}

// ── Quarterly: Fleet Composition ─────────────────────────────────────────────

const FLEET_SPLIT = [
  { label: 'Owned / Operated directly', count: 2, type: 'Boeing 737-700' },
  { label: 'ACMI Lease',                count: 2, type: 'Boeing 757-200' },
]

function FleetCompositionCard() {
  return (
    <CardWrap>
      <CardHeader title="Fleet Composition — Owned vs ACMI" badge="Quarterly" />
      <div style={{ display: 'flex', gap: 16, paddingTop: 4 }}>
        {FLEET_SPLIT.map(f => (
          <div key={f.label} style={{
            flex: 1, padding: '14px 16px', borderRadius: 8,
            backgroundColor: C.bgSecondary, border: `1px solid ${C.border}`,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <span style={{ fontSize: 11, color: C.textSecondary }}>{f.label}</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary }}>{f.count}</span>
            <span style={{ fontSize: 12, color: C.textSecondary }}>{f.type}</span>
          </div>
        ))}
      </div>
      <StatusLine color="blue" text="Fixed status — reviewed only if change" />
      <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>
        Status fixed over 3-year horizon. Reviewed only in case of fleet change.
      </div>
      <SourceLine text="MCC / Technical Department" />
    </CardWrap>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function FleetTab() {
  const { canEdit } = useRole()
  const ce = canEdit('strategicFleet')

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          Strategic Indicators <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Fleet</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>Strategic Indicators — Fleet</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>4 indicators · Daily to Quarterly</p>
        </div>
      </div>

      <div>
        <SectionHeader label="Daily" />
        <FleetStatusCard />
      </div>

      <div>
        <SectionHeader label="Weekly" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TechReliabilityCard canEdit={ce} />
          <UtilisationCard canEdit={ce} />
        </div>
      </div>

      <div>
        <SectionHeader label="Quarterly" />
        <FleetCompositionCard />
      </div>
    </div>
  )
}
