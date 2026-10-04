import { useState } from 'react'
import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'
import DepartmentDataEntryModal from '../forms/DepartmentDataEntryModal.jsx'
import { useRole } from '../../context/RoleContext.jsx'

const EP = [
  { name: 'Ebène VIP Lounge Commissioning',            progress: 70, status: 'green' },
  { name: 'ECAir Beach Brazza Rehabilitation',         progress: 45, status: 'amber' },
  { name: 'High-loader + Catering Vehicle Acquisition', progress: 80, status: 'green' },
]

const WEEKLY_INIT = [
  { indicator: 'On-board Product Satisfaction',         value: '74% satisfaction',       benchmark: 'Trend monitoring',   status: 'amber', source: 'Post-flight survey (on-board)' },
  { indicator: 'Catering Incidents',                   value: '2 flights (3.2%)',        benchmark: 'Trend monitoring',   status: 'amber', source: 'Catering incidents register' },
  { indicator: 'Catering Cost / Passenger vs Budget',  value: '+6% variance',           benchmark: 'Alert if > 10%',     status: 'green', source: 'Catering budget tracking' },
  { indicator: 'Stock-outs — Standard Products',       value: '1 flight affected',      benchmark: 'Trend monitoring',   status: 'amber', source: 'On-board stock-outs register' },
  { indicator: 'VIP Lounges — Occupancy / Satisfaction', value: '68% occ. · 81% sat.', benchmark: 'Trend monitoring',   status: 'green', source: 'VIP lounge register' },
  { indicator: 'Ebène VIP Lounge',                    value: '—',                      benchmark: '—',                  status: 'blue',  source: 'Project: Ebène VIP Lounge' },
  { indicator: 'Ramp Vehicles Availability',           value: '—',                      benchmark: '—',                  status: 'blue',  source: 'Project: Vehicle Acquisition' },
]

const MONTHLY_INIT = [
  { indicator: 'ECAir Beach Brazza Space Utilisation', value: '—', benchmark: '—', status: 'blue', source: 'Project: Beach Brazza Rehabilitation' },
]

const QUARTERLY_INIT = [
  { indicator: 'Industry Benchmarks Conducted', value: '1 this quarter', benchmark: '≥ 1 per quarter', status: 'green', source: 'Benchmark notes' },
]

const BTN = {
  fontSize: 10, fontWeight: 600, color: 'var(--brand-gold)',
  backgroundColor: 'var(--gold-alpha-7)', border: '1px solid var(--gold-alpha-12)',
  borderRadius: 5, padding: '3px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
}

export default function ProductServiceTab() {
  const { canEdit } = useRole()
  const ce = canEdit('supportProduct')
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
      <PageHeader dept="Product & Service" title="Support Functions — Product & Service" subtitle="9 indicators · Weekly to Quarterly" />
      <ExecutionProCard projects={EP} />
      <div>
        <SectionHeader label="Weekly" action={ce ? <button style={BTN} onClick={() => setWeeklyModal(true)}>+ Enter Weekly Data</button> : null} />
        <KPITable rows={weekly} onUpdateRow={ce ? updateWeeklyRow : undefined} period="Week 41 / 2026" />
      </div>
      <div>
        <SectionHeader label="Monthly" action={ce ? <button style={BTN} onClick={() => setMonthlyModal(true)}>+ Enter Monthly Data</button> : null} />
        <KPITable rows={monthly} onUpdateRow={ce ? updateMonthlyRow : undefined} period="October 2026" />
      </div>
      <div>
        <SectionHeader label="Quarterly" action={ce ? <button style={BTN} onClick={() => setQuarterlyModal(true)}>+ Enter Quarterly Data</button> : null} />
        <KPITable rows={quarterly} onUpdateRow={ce ? updateQuarterlyRow : undefined} period="Q4 2026" />
      </div>
      {ce && weeklyModal && <DepartmentDataEntryModal rows={weekly} onSubmit={submitWeekly} onClose={() => setWeeklyModal(false)} cadence="Weekly" dept="Product & Service" />}
      {ce && monthlyModal && <DepartmentDataEntryModal rows={monthly} onSubmit={submitMonthly} onClose={() => setMonthlyModal(false)} cadence="Monthly" dept="Product & Service" />}
      {ce && quarterlyModal && <DepartmentDataEntryModal rows={quarterly} onSubmit={submitQuarterly} onClose={() => setQuarterlyModal(false)} cadence="Quarterly" dept="Product & Service" />}
    </div>
  )
}
