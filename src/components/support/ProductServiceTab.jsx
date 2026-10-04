import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'Ebène VIP Lounge Commissioning',            progress: 70, status: 'green' },
  { name: 'ECAir Beach Brazza Rehabilitation',         progress: 45, status: 'amber' },
  { name: 'High-loader + Catering Vehicle Acquisition', progress: 80, status: 'green' },
]

const WEEKLY = [
  { indicator: 'On-board Product Satisfaction',         value: '74% satisfaction',          benchmark: 'Trend monitoring',   status: 'amber', source: 'Post-flight survey (on-board)' },
  { indicator: 'Catering Incidents',                   value: '2 flights (3.2%)',           benchmark: 'Trend monitoring',   status: 'amber', source: 'Catering incidents register' },
  { indicator: 'Catering Cost / Passenger vs Budget',  value: '+6% variance',              benchmark: 'Alert if > 10%',     status: 'green', source: 'Catering budget tracking' },
  { indicator: 'Stock-outs — Standard Products',       value: '1 flight affected',         benchmark: 'Trend monitoring',   status: 'amber', source: 'On-board stock-outs register' },
  { indicator: 'VIP Lounges — Occupancy / Satisfaction', value: '68% occ. · 81% sat.',    benchmark: 'Trend monitoring',   status: 'green', source: 'VIP lounge register' },
  { indicator: 'Ebène VIP Lounge',                    value: '—',                         benchmark: '—',                  status: 'blue',  source: 'Project: Ebène VIP Lounge' },
  { indicator: 'Ramp Vehicles Availability',           value: '—',                         benchmark: '—',                  status: 'blue',  source: 'Project: Vehicle Acquisition' },
]

const MONTHLY = [
  { indicator: 'ECAir Beach Brazza Space Utilisation', value: '—', benchmark: '—', status: 'blue', source: 'Project: Beach Brazza Rehabilitation' },
]

const QUARTERLY = [
  { indicator: 'Industry Benchmarks Conducted', value: '1 this quarter', benchmark: '≥ 1 per quarter', status: 'green', source: 'Benchmark notes' },
]

export default function ProductServiceTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Product & Service" title="Support Functions — Product & Service" subtitle="9 indicators · Weekly to Quarterly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
      <div><SectionHeader label="Quarterly" /><KPITable rows={QUARTERLY} /></div>
    </div>
  )
}
