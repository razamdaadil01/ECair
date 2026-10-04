import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'

const WEEKLY_INIT = [
  { indicator: 'HQ Repairs Handling Rate',          value: '94%',                   benchmark: 'Target ≥ 90%',       status: 'green', source: 'HQ interventions register' },
  { indicator: 'Branch Repairs Handling Rate',      value: '87% avg',               benchmark: 'Target ≥ 90%',       status: 'amber', source: 'Branches interventions register' },
  { indicator: 'Company Vehicle Repairs',           value: '96% completion',        benchmark: 'Target ≥ 90%',       status: 'green', source: 'Vehicle repairs register (owned)' },
  { indicator: 'Rental Vehicle Repairs',            value: '91% completion',        benchmark: 'Target ≥ 90%',       status: 'green', source: 'Vehicle repairs register (rented)' },
  { indicator: 'Company Vehicle Incidents',         value: '0.3 incidents/vehicle', benchmark: 'Target ≤ 1/vehicle', status: 'green', source: 'Vehicle incidents register' },
  { indicator: 'Rental Vehicle Incidents',          value: '0.5 incidents/vehicle', benchmark: 'Target ≤ 1/vehicle', status: 'green', source: 'Vehicle incidents register' },
  { indicator: 'Premises Security Incidents',       value: '0 this week',           benchmark: 'Alert from 1',       status: 'green', source: 'Security incidents register' },
]

const MONTHLY_INIT = [
  { indicator: 'HQ Maintenance Plan',              value: '92% completion', benchmark: 'Target ≥ 90%', status: 'green', source: 'HQ maintenance plan' },
  { indicator: 'Branch Maintenance Plan',          value: '84% completion', benchmark: 'Target ≥ 90%', status: 'amber', source: 'Branches maintenance plan' },
  { indicator: 'Company Vehicle Maintenance',      value: '95% completion', benchmark: 'Target ≥ 90%', status: 'green', source: 'Vehicle maintenance (owned)' },
  { indicator: 'Rental Vehicle Maintenance',       value: '88% completion', benchmark: 'Target ≥ 90%', status: 'amber', source: 'Vehicle maintenance (rented)' },
  { indicator: 'Scheduled Safety Inspections',     value: '91% completion', benchmark: 'Target ≥ 90%', status: 'green', source: 'Safety inspections register' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function GeneralServicesTab() {
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
      <PageHeader dept="General Services" title="Support Functions — General Services" subtitle="12 indicators · Weekly to Monthly" />
      <ExecutionProCard noProjects />
      <div>
        <SectionHeader label="Weekly" action={<button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button>} />
        <KPITable rows={weekly} onUpdateRow={updateWeeklyRow} period="Week 41 / 2026" />
      </div>
      <div>
        <SectionHeader label="Monthly" action={<button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button>} />
        <KPITable rows={monthly} onUpdateRow={updateMonthlyRow} period="October 2026" />
      </div>
      {weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="General Services" />}
      {monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="General Services" />}
    </div>
  )
}
