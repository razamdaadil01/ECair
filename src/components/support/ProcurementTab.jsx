import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const WEEKLY = [
  { indicator: 'Average Lead Time — Purchase to Award', value: '18 days',          benchmark: 'Trend monitoring', status: 'green', source: 'Purchase requests register' },
  { indicator: 'Critical Suppliers at Risk',            value: '1 supplier at risk', benchmark: 'Alert from 1',   status: 'red',   source: 'At-risk supplier map' },
]

const MONTHLY = [
  { indicator: 'Procurement Plan Completion',      value: '44% YTD',          benchmark: 'Trend monitoring',   status: 'amber', source: 'Procurement budget tracking' },
  { indicator: 'Savings Achieved (negotiation YTD)', value: '$28,400 cumul.',  benchmark: 'Trend monitoring',   status: 'green', source: 'Savings tracking table' },
  { indicator: 'Contracts Renewed on Time',        value: '5 of 6 renewed',   benchmark: 'Alert if late',      status: 'amber', source: 'Supplier contracts register' },
  { indicator: 'Formal Competitive Bidding Rate',  value: '91%',              benchmark: 'Target 100%',        status: 'amber', source: 'Calls for tenders register' },
]

export default function ProcurementTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Procurement" title="Support Functions — Procurement" subtitle="6 indicators · Weekly to Monthly" />
      <ExecutionProCard noProjects />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
