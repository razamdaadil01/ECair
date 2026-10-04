import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const EP = [
  { name: 'Travel Management System', progress: 25, status: 'amber' },
]

const WEEKLY_INIT = [
  { indicator: 'Internal Travel Cost vs Budget',  value: '+8% variance',  benchmark: 'Alert if > 15%',         status: 'green', source: 'Travel budget tracking' },
  { indicator: 'Trips Processed (month)',         value: '34 trips',      benchmark: 'Trend monitoring',       status: 'blue',  source: 'Travel requests register' },
  { indicator: 'Average Request Processing Time', value: '2.1 days',      benchmark: 'Qualitative monitoring', status: 'green', source: 'Travel requests register' },
  { indicator: 'Travel Policy Compliance',        value: '88%',           benchmark: 'Trend monitoring',       status: 'amber', source: 'Travel file compliance check' },
  { indicator: 'Booking Tool Adoption Rate',      value: '—',             benchmark: '—',                      status: 'blue',  source: 'Project: Travel Management System' },
  { indicator: 'Traveller Duty of Care',          value: '—',             benchmark: '—',                      status: 'blue',  source: 'Project: Travel Management System' },
]

const MONTHLY_INIT = [
  { indicator: 'Use of Preferential Agreements', value: '62%', benchmark: 'Trend monitoring', status: 'amber', source: 'Travel supplier agreements' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function TravelTab() {
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
      <PageHeader dept="Travel" title="Support Functions — Travel" subtitle="7 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} period="Week 41 / 2026" />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} period="October 2026" />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Travel" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Travel" />}
    </div>
  )
}
