import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'Travel Management System', progress: 25, status: 'amber' },
]

const WEEKLY = [
  { indicator: 'Internal Travel Cost vs Budget',  value: '+8% variance',  benchmark: 'Alert if > 15%',         status: 'green', source: 'Travel budget tracking' },
  { indicator: 'Trips Processed (month)',         value: '34 trips',      benchmark: 'Trend monitoring',       status: 'blue',  source: 'Travel requests register' },
  { indicator: 'Average Request Processing Time', value: '2.1 days',      benchmark: 'Qualitative monitoring', status: 'green', source: 'Travel requests register' },
  { indicator: 'Travel Policy Compliance',        value: '88%',           benchmark: 'Trend monitoring',       status: 'amber', source: 'Travel file compliance check' },
  { indicator: 'Booking Tool Adoption Rate',      value: '—',             benchmark: '—',                      status: 'blue',  source: 'Project: Travel Management System' },
  { indicator: 'Traveller Duty of Care',          value: '—',             benchmark: '—',                      status: 'blue',  source: 'Project: Travel Management System' },
]

const MONTHLY = [
  { indicator: 'Use of Preferential Agreements', value: '62%', benchmark: 'Trend monitoring', status: 'amber', source: 'Travel supplier agreements' },
]

export default function TravelTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Travel" title="Support Functions — Travel" subtitle="7 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
