// IT tab has custom Daily cards in addition to the shared table pattern

import { useState } from 'react'
import { C, SC, StatusDot, StatusLine, ExecutionProCard, KPITable, PageHeader, SectionHeader, CardWrap, CardHeader, CadenceBadge, SourceLine, ProgressBar } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const EP = [
  { name: 'Backup System Implementation',          progress: 60, status: 'green' },
  { name: 'Server Acquisition + Redundancy',       progress: 20, status: 'amber' },
  { name: 'CCTV + Access Control Restoration',     progress: 10, status: 'blue'  },
]

const WEEKLY_INIT = [
  { indicator: 'Major IT Incidents (month)',        value: '3 incidents · avg 4.2h',     benchmark: 'Trend monitoring',         status: 'amber', source: 'IT incidents register' },
  { indicator: 'Cybersecurity Incidents',           value: '1 unpatched critical vuln.', benchmark: 'Alert from 1 critical',    status: 'red',   source: 'Cybersecurity register' },
  { indicator: 'Internal User Satisfaction',       value: '72% satisfaction',           benchmark: 'Trend monitoring',         status: 'amber', source: 'User satisfaction survey' },
  { indicator: 'Server Infrastructure Availability', value: '—',                        benchmark: '—',                        status: 'blue',  source: 'Project: Server Acquisition' },
  { indicator: 'CCTV Coverage — Server Rooms',     value: '—',                          benchmark: '—',                        status: 'blue',  source: 'Project: CCTV Restoration' },
]

const MONTHLY_INIT = [
  { indicator: 'Backup Success Rate',               value: '—',   benchmark: '—',               status: 'blue',  source: 'Project: Backup System' },
  { indicator: 'Staff Trained on IT/Cybersecurity', value: '48%', benchmark: 'Trend monitoring', status: 'amber', source: 'IS training register' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

// ── Daily: Critical Systems + Network (custom cards) ─────────────────────────

const SYSTEMS = [
  { name: 'Ticketing PSS',  uptime: '99.8%', status: 'green', label: 'Operational' },
  { name: 'Payroll System', uptime: '100%',  status: 'green', label: 'Operational' },
  { name: 'Finance System', uptime: '99.1%', status: 'amber', label: 'Degraded (< 99.5%)' },
]

function SystemsCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Critical Systems Availability" badge="Daily" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SYSTEMS.map((s, i) => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 0',
            borderBottom: i < SYSTEMS.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{ fontSize: 12, color: C.textPrimary }}>{s.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: SC[s.status] }}>{s.uptime}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <StatusDot color={s.status} size={7} />
                <span style={{ fontSize: 11, color: SC[s.status] }}>{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <StatusLine color="amber" text="Finance system below 99.5% threshold" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Target &gt; 99.5%</div>
      <SourceLine text="IS infrastructure monitoring" />
    </CardWrap>
  )
}

function NetworkCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Network / Internet Availability" badge="Daily" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.amber, lineHeight: 1 }}>99.4%</span>
        <span style={{ fontSize: 12, color: C.textSecondary }}>rolling 24h</span>
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>HQ: 99.8% · Branches: 98.6%</div>
      <ProgressBar pct={99.4} color="amber" />
      <StatusLine color="amber" text="Branches below 99% threshold" />
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Target &gt; 99%</div>
      <SourceLine text="Network supervision" />
    </CardWrap>
  )
}

export default function ITTab() {
  const [weekly, setWeekly] = useState(WEEKLY_INIT)
  const [monthly, setMonthly] = useState(MONTHLY_INIT)
  const [weeklyModal, setWeeklyModal] = useState(false)
  const [monthlyModal, setMonthlyModal] = useState(false)

  function updateWeeklyRow(index, newValue) {
    setWeekly(prev => prev.map((r, i) => i === index ? { ...r, value: newValue } : r))
  }
  function updateMonthlyRow(index, newValue) {
    setMonthly(prev => prev.map((r, i) => i === index ? { ...r, value: newValue } : r))
  }
  function submitWeekly(updates) {
    setWeekly(prev => { const next = [...prev]; updates.forEach(u => { next[u.index] = { ...next[u.index], value: u.value } }); return next })
  }
  function submitMonthly(updates) {
    setMonthly(prev => { const next = [...prev]; updates.forEach(u => { next[u.index] = { ...next[u.index], value: u.value } }); return next })
  }

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="IT" title="Support Functions — IT" subtitle="9 indicators · Daily to Monthly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Daily" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <SystemsCard />
          <NetworkCard />
        </div>
      </div>
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} period="Week 41 / 2026" />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} period="October 2026" />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="IT" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="IT" />}
    </div>
  )
}
