// ─── Safety Tab ───────────────────────────────────────────────────────────────
// Strategic Indicators > Safety — 5 KPIs: Daily (1) · Weekly (1) · Monthly (2) · Quarterly (1)
// Design note: section headers use amber instead of text-secondary — safety is never routine.

import { useState } from 'react'
import KPIUpdateModal from '../forms/KPIUpdateModal.jsx'

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
// Safety section headers use amber — safety is never routine
function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.amber, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: 'var(--status-amber-20)' }} />
    </div>
  )
}
function CardWrap({ children, style }) {
  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
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

// ── Daily: Today's incidents ──────────────────────────────────────────────────

function IncidentsTodayCard() {
  const [value, setValue] = useState('0')
  const [modal, setModal] = useState(false)
  const count = parseInt(value, 10) || 0
  const row = { indicator: 'Safety Incidents — Today', value, source: 'SMS / SGS register' }
  return (
    <CardWrap>
      <CardHeader title="Safety Incidents — Today" badge="Daily" onEdit={() => setModal(true)} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <span style={{ fontSize: 64, fontWeight: 700, color: count === 0 ? C.green : C.red, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 14, color: C.textSecondary, paddingBottom: 8 }}>{count === 0 ? 'No events reported today' : `${count} incident${count > 1 ? 's' : ''} reported today`}</span>
      </div>
      <StatusLine color={count === 0 ? 'green' : 'red'} text={count === 0 ? 'On Track' : 'Alert: Safety incident reported'} />
      <div style={{ padding: '12px 14px', backgroundColor: C.bgSecondary, borderRadius: 6, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 4, fontWeight: 600, letterSpacing: '0.06em' }}>LAST INCIDENT</div>
        <div style={{ fontSize: 12, color: C.textPrimary }}>September 28, 2026 — Bird strike on landing (BZV)</div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 4 }}>Category: Minor · Status: Closed</div>
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Immediate alert on ANY flight safety incident — no threshold</div>
      <div style={{ padding: '8px 12px', backgroundColor: 'var(--amber-alpha-7)', border: `1px solid var(--amber-border-dim)`, borderRadius: 6, fontSize: 11, color: C.amber }}>
        Any incident triggers immediate CEO notification regardless of category.
      </div>
      <SourceLine text="SMS / SGS register" />
      {modal && <KPIUpdateModal row={row} rowIndex={0} onClose={() => setModal(false)} onSubmit={(_, v) => setValue(v)} period="Oct 4, 2026" />}
    </CardWrap>
  )
}

// ── Weekly: Training expiry ───────────────────────────────────────────────────

const TRAINING_ROWS = [
  { name: 'Capt. Moukala',   role: 'Captain',      training: 'Type Rating Renewal', expiry: 'Dec 18, 2026', days: 75, status: 'amber' },
  { name: 'F/O Bissangou',   role: 'First Officer', training: 'Line Check',          expiry: 'Nov 30, 2026', days: 57, status: 'amber' },
  { name: 'PNC Ngoma',       role: 'Cabin Crew',    training: 'Safety Demo',         expiry: 'Nov 15, 2026', days: 42, status: 'red'   },
  { name: 'PNC Loutaya',     role: 'Cabin Crew',    training: 'First Aid',           expiry: 'Dec 01, 2026', days: 58, status: 'amber' },
]

function TrainingCard() {
  return (
    <CardWrap>
      <CardHeader title="Mandatory Training Expiring — Next 90 Days" badge="Weekly" />
      <StatusLine color="amber" text="4 training courses expiring within 90 days" />
      <div style={{ fontSize: 11, marginTop: 4 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 100px 1fr 100px 90px',
          gap: 8, padding: '6px 0', borderBottom: `1px solid ${C.gold}`,
          color: C.textSecondary, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
        }}>
          <span>Name</span><span>Role</span><span>Training Type</span><span>Expiry</span><span style={{ textAlign: 'right' }}>Days</span>
        </div>
        {TRAINING_ROWS.map((r, i) => (
          <div key={r.name} style={{
            display: 'grid', gridTemplateColumns: '1fr 100px 1fr 100px 90px',
            gap: 8, padding: '9px 0', alignItems: 'center',
            borderBottom: i < TRAINING_ROWS.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{ color: C.textPrimary, fontWeight: 500 }}>{r.name}</span>
            <span style={{ color: C.textSecondary }}>{r.role}</span>
            <span style={{ color: C.textSecondary }}>{r.training}</span>
            <span style={{ color: C.textSecondary }}>{r.expiry}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
              <StatusDot color={r.status} size={7} />
              <span style={{ color: SC[r.status], fontWeight: 600 }}>{r.days}d</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Must be scheduled before expiry</div>
      <SourceLine text="HR / Training" />
    </CardWrap>
  )
}

// ── Monthly card 1: AOC Validity ──────────────────────────────────────────────

function AOCCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="AOC / CTA Validity" badge="Monthly" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, paddingTop: 4 }}>
        <span style={{ fontSize: 56, fontWeight: 700, color: C.amber, lineHeight: 1 }}>47</span>
        <span style={{ fontSize: 13, color: C.amber, fontWeight: 500 }}>days remaining</span>
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>Expires: December 21, 2026</div>
      <StatusLine color="amber" text="Warning: Less than 90 days" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Warning &lt; 90 days · Critical &lt; 30 days</div>
      <SourceLine text="ANAC Congo / Compliance" />
    </CardWrap>
  )
}

// ── Monthly card 2: Rolling 12-month incidents ────────────────────────────────

const INCIDENT_BREAKDOWN = [
  { category: 'Bird strikes',        count: 3 },
  { category: 'Hard landings',       count: 2 },
  { category: 'Runway excursions',   count: 0 },
  { category: 'Hydraulic failures',  count: 1 },
  { category: 'Crew incapacitation', count: 0 },
]
const INCIDENT_TOTAL = INCIDENT_BREAKDOWN.reduce((s, r) => s + r.count, 0)

function RollingIncidentsCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Safety Incidents — Rolling 12 Months" badge="Monthly" />
      <div style={{ fontSize: 11 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 50px',
          gap: 8, padding: '5px 0', borderBottom: `1px solid ${C.gold}`,
          color: C.textSecondary, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
        }}>
          <span>Category</span><span style={{ textAlign: 'center' }}>Count</span>
        </div>
        {INCIDENT_BREAKDOWN.map((r, i) => (
          <div key={r.category} style={{
            display: 'grid', gridTemplateColumns: '1fr 50px',
            gap: 8, padding: '8px 0', alignItems: 'center',
            borderBottom: `1px solid ${C.border}`,
          }}>
            <span style={{ color: C.textPrimary }}>{r.category}</span>
            <span style={{ color: r.count > 0 ? C.amber : C.textSecondary, fontWeight: r.count > 0 ? 700 : 400, textAlign: 'center' }}>{r.count}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px', gap: 8, padding: '8px 0', alignItems: 'center' }}>
          <span style={{ color: C.textPrimary, fontWeight: 600 }}>Total</span>
          <span style={{ color: C.blue, fontWeight: 700, textAlign: 'center' }}>{INCIDENT_TOTAL}</span>
        </div>
      </div>
      <StatusLine color="blue" text="Trend monitoring" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Alert on any flight safety incident</div>
      <SourceLine text="SMS / SGS register" />
    </CardWrap>
  )
}

// ── Quarterly: Audit results ──────────────────────────────────────────────────

const AUDIT_FINDINGS = [
  { finding: 'Emergency equipment checklist incomplete', severity: 'Major', due: 'Oct 31, 2026', status: 'In Progress', statusColor: 'amber' },
  { finding: 'Crew rest facility below standard',        severity: 'Minor', due: 'Nov 15, 2026', status: 'Planned',     statusColor: 'blue'  },
  { finding: 'SMS reporting form outdated',              severity: 'Minor', due: 'Oct 15, 2026', status: 'Overdue',     statusColor: 'red'   },
]

function AuditCard() {
  return (
    <CardWrap>
      <CardHeader title="Safety Audit Results — Latest" badge="Quarterly" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: C.textSecondary }}>Internal Safety Audit — September 2026</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: C.amber, lineHeight: 1 }}>84</span>
            <span style={{ fontSize: 16, color: C.textSecondary }}> / 100</span>
          </div>
        </div>
        <StatusLine color="amber" text="3 open corrective actions" />
      </div>
      {/* Open actions table */}
      <div style={{ fontSize: 11, marginTop: 4 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 60px 110px 100px',
          gap: 8, padding: '6px 0', borderBottom: `1px solid ${C.gold}`,
          color: C.textSecondary, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
        }}>
          <span>Finding</span><span>Severity</span><span>Due Date</span><span>Status</span>
        </div>
        {AUDIT_FINDINGS.map((f, i) => (
          <div key={f.finding} style={{
            display: 'grid', gridTemplateColumns: '1fr 60px 110px 100px',
            gap: 8, padding: '10px 0', alignItems: 'center',
            borderBottom: i < AUDIT_FINDINGS.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{ color: C.textPrimary, lineHeight: 1.4 }}>{f.finding}</span>
            <span style={{ color: f.severity === 'Major' ? C.red : C.textSecondary, fontWeight: f.severity === 'Major' ? 600 : 400 }}>{f.severity}</span>
            <span style={{ color: C.textSecondary }}>{f.due}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <StatusDot color={f.statusColor} size={7} />
              <span style={{ color: SC[f.statusColor], fontWeight: 500, fontSize: 11 }}>{f.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Alert if a major corrective action is overdue</div>
      <SourceLine text="SMS/SGS / Quality" />
    </CardWrap>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function SafetyTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          Strategic Indicators <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Safety</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>Strategic Indicators — Safety</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>5 indicators · Daily to Quarterly</p>
        </div>
      </div>

      <div>
        <SectionHeader label="Daily" />
        <IncidentsTodayCard />
      </div>

      <div>
        <SectionHeader label="Weekly" />
        <TrainingCard />
      </div>

      <div>
        <SectionHeader label="Monthly" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <AOCCard />
          <RollingIncidentsCard />
        </div>
      </div>

      <div>
        <SectionHeader label="Quarterly" />
        <AuditCard />
      </div>
    </div>
  )
}
