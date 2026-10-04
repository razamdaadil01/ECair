import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'
import { useRole } from '../../context/RoleContext.jsx'

const WEEKLY_INIT = [
  { indicator: 'Average Lead Time — Purchase to Award', value: '18 days',           benchmark: 'Trend monitoring', status: 'green', source: 'Purchase requests register' },
  { indicator: 'Critical Suppliers at Risk',            value: '1 supplier at risk', benchmark: 'Alert from 1',   status: 'red',   source: 'At-risk supplier map' },
]

const MONTHLY_INIT = [
  { indicator: 'Procurement Plan Completion',      value: '44% YTD',         benchmark: 'Trend monitoring',   status: 'amber', source: 'Procurement budget tracking' },
  { indicator: 'Savings Achieved (negotiation YTD)', value: '$28,400 cumul.', benchmark: 'Trend monitoring',   status: 'green', source: 'Savings tracking table' },
  { indicator: 'Contracts Renewed on Time',        value: '5 of 6 renewed',  benchmark: 'Alert if late',      status: 'amber', source: 'Supplier contracts register' },
  { indicator: 'Formal Competitive Bidding Rate',  value: '91%',             benchmark: 'Target 100%',        status: 'amber', source: 'Calls for tenders register' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function ProcurementTab() {
  const { canEdit } = useRole()
  const ce = canEdit('supportProcurement')
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
      <PageHeader dept="Procurement" title="Support Functions — Procurement" subtitle="6 indicators · Weekly to Monthly" />
      <ExecutionProCard noProjects />
      <div>
        <SectionHeader label="Weekly" action={ce ? <button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button> : null} />
        <KPITable rows={weekly} onUpdateRow={ce ? updateWeeklyRow : undefined} period="Week 41 / 2026" />
      </div>
      <div>
        <SectionHeader label="Monthly" action={ce ? <button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button> : null} />
        <KPITable rows={monthly} onUpdateRow={ce ? updateMonthlyRow : undefined} period="October 2026" />
      </div>
      {ce && weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Procurement" />}
      {ce && monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Procurement" />}
    </div>
  )
}
