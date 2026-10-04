import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const EP = [
  { name: 'Processes and Procedures Development', progress: 30, status: 'amber' },
]

const WEEKLY_INIT = [
  { indicator: 'Open Recommendations',               value: '7 open · 2 critical', benchmark: 'Alert if critical overdue', status: 'red',   source: 'Audit recommendations register' },
  { indicator: 'Anomalies / Potential Fraud Detected', value: '0 this week',       benchmark: 'Alert from 1',             status: 'green', source: 'Reports register' },
]

const MONTHLY_INIT = [
  { indicator: 'Annual Audit Plan Completion',    value: '58% (7 of 12)',  benchmark: 'Target 100% at year end',  status: 'amber', source: 'Annual audit plan' },
  { indicator: 'Recommendation Closure Rate',     value: '71%',            benchmark: 'Trend monitoring',         status: 'amber', source: 'Audit recommendations register' },
  { indicator: 'Critical Processes Coverage',     value: '—',              benchmark: '—',                        status: 'blue',  source: 'Project: Processes and Procedures' },
  { indicator: 'Field Compliance by Sampling',    value: '87%',            benchmark: 'Target ≥ 90%',             status: 'amber', source: 'Field inspection reports' },
  { indicator: 'Reporting Calendar to Management', value: '100%',          benchmark: 'Target 100%',              status: 'green', source: 'Reporting calendar' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function AuditTab() {
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
      <PageHeader dept="Audit" title="Support Functions — Audit" subtitle="7 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Audit" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Audit" />}
    </div>
  )
}
