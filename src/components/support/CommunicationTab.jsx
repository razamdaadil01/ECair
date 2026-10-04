import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const EP = [
  { name: 'Internal Newsletter Development', progress: 35, status: 'amber' },
  { name: 'MBOTE Magazine Design',           progress: 55, status: 'green' },
]

const WEEKLY_INIT = [
  { indicator: 'Media Coverage',                    value: '12 mentions · 83% positive',      benchmark: 'Trend monitoring',        status: 'green', source: 'Press review / media monitoring' },
  { indicator: 'Website + Social Media Audience',   value: '8,400 visitors · 14,200 social',  benchmark: 'Trend monitoring',        status: 'green', source: 'Website + social analytics' },
  { indicator: 'Press Requests Handled',            value: '4/4 this week',                   benchmark: 'Target 100%',             status: 'green', source: 'Press requests register' },
  { indicator: 'Average Press Response Time',       value: '3.2 hours',                       benchmark: 'Trend monitoring',        status: 'green', source: 'Press requests register' },
  { indicator: 'Newsletter Open / Engagement Rate', value: '—',                               benchmark: '—',                       status: 'blue',  source: 'Project: Internal Newsletter' },
  { indicator: 'Crisis Communication Response',     value: 'Event-driven',                    benchmark: 'Target < 60 min',         status: 'blue',  source: 'Crisis communications log' },
]

const MONTHLY_INIT = [
  { indicator: 'Partnership Calendar Completion',    value: '67%',          benchmark: 'Trend monitoring',    status: 'amber', source: 'Partnership calendar' },
  { indicator: 'Competitive Intelligence Notes',    value: '1 this month', benchmark: '≥ 1 note/month',      status: 'green', source: 'Intelligence notes' },
  { indicator: 'MBOTE Magazine Publication',        value: '—',            benchmark: '—',                   status: 'blue',  source: 'Project: MBOTE Magazine' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function CommunicationTab() {
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
      <PageHeader dept="Communication" title="Support Functions — Communication" subtitle="9 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Communication" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Communication" />}
    </div>
  )
}
