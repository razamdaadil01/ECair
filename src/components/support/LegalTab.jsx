import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const EP = [
  { name: 'Contract Templates Development',       progress: 40, status: 'green' },
  { name: 'Legal Monitoring Tools Implementation', progress: 15, status: 'blue'  },
]

const WEEKLY_INIT = [
  { indicator: 'Open Disputes (total)',                   value: '4 disputes · Est. $280,000',  benchmark: 'Qualitative monitoring',  status: 'amber', source: 'Disputes register' },
  { indicator: 'Critical Contracts Expiring < 90 days',  value: '2 contracts',                  benchmark: 'Alert from 1',            status: 'red',   source: 'Contracts register' },
  { indicator: 'Formal Notices / Regulatory Proceedings', value: '1 in progress',               benchmark: 'Alert from 1',            status: 'red',   source: 'Regulatory disputes register' },
  { indicator: 'Time to Detect Regulatory Change',       value: '—',                            benchmark: '—',                       status: 'blue',  source: 'Project: Legal Monitoring Tools' },
]

const MONTHLY_INIT = [
  { indicator: 'Average Case Handling Time',      value: '47 days',    benchmark: 'Trend monitoring',  status: 'amber', source: 'Legal cases register' },
  { indicator: 'Standard Contract Template Usage', value: '—',         benchmark: '—',                 status: 'blue',  source: 'Project: Contract Templates' },
  { indicator: 'Board Minutes Circulation Time',  value: '8 days avg', benchmark: 'Trend monitoring',  status: 'green', source: 'Board minutes register' },
]

const QUARTERLY_INIT = [
  { indicator: 'Board Statutory Calendar', value: '100% compliance', benchmark: 'Target 100%', status: 'green', source: 'Board statutory calendar' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function LegalTab() {
  const [weekly, setWeekly] = useState(WEEKLY_INIT)
  const [monthly, setMonthly] = useState(MONTHLY_INIT)
  const [quarterly, setQuarterly] = useState(QUARTERLY_INIT)
  const [weeklyModal, setWeeklyModal] = useState(false)
  const [monthlyModal, setMonthlyModal] = useState(false)
  const [quarterlyModal, setQuarterlyModal] = useState(false)

  function updateWeeklyRow(index, newValue) {
    setWeekly(prev => prev.map((r, i) => i === index ? { ...r, value: newValue } : r))
  }
  function updateMonthlyRow(index, newValue) {
    setMonthly(prev => prev.map((r, i) => i === index ? { ...r, value: newValue } : r))
  }
  function updateQuarterlyRow(index, newValue) {
    setQuarterly(prev => prev.map((r, i) => i === index ? { ...r, value: newValue } : r))
  }
  function submitWeekly(updates) {
    setWeekly(prev => { const next = [...prev]; updates.forEach(u => { next[u.index] = { ...next[u.index], value: u.value } }); return next })
  }
  function submitMonthly(updates) {
    setMonthly(prev => { const next = [...prev]; updates.forEach(u => { next[u.index] = { ...next[u.index], value: u.value } }); return next })
  }
  function submitQuarterly(updates) {
    setQuarterly(prev => { const next = [...prev]; updates.forEach(u => { next[u.index] = { ...next[u.index], value: u.value } }); return next })
  }

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Legal" title="Support Functions — Legal" subtitle="8 indicators · Weekly to Quarterly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} />
      </div>
      <div>
        <SectionHeader label="Quarterly" action={<button style={BTN} onClick={() => setQuarterlyModal(true)}>+ Enter Quarterly Data</button>} />
        <KPITable rows={quarterly} onUpdateRow={updateQuarterlyRow} />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Legal" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Legal" />}
      {quarterlyModal && <DepartmentDataEntryModal rows={quarterly} onSubmit={submitQuarterly} onClose={() => setQuarterlyModal(false)} cadence="Quarterly" dept="Legal" />}
    </div>
  )
}
