import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'Contract Templates Development',       progress: 40, status: 'green' },
  { name: 'Legal Monitoring Tools Implementation', progress: 15, status: 'blue'  },
]

const WEEKLY = [
  { indicator: 'Open Disputes (total)',                   value: '4 disputes · Est. $280,000',  benchmark: 'Qualitative monitoring',  status: 'amber', source: 'Disputes register' },
  { indicator: 'Critical Contracts Expiring < 90 days',  value: '2 contracts',                  benchmark: 'Alert from 1',            status: 'red',   source: 'Contracts register' },
  { indicator: 'Formal Notices / Regulatory Proceedings', value: '1 in progress',               benchmark: 'Alert from 1',            status: 'red',   source: 'Regulatory disputes register' },
  { indicator: 'Time to Detect Regulatory Change',       value: '—',                            benchmark: '—',                       status: 'blue',  source: 'Project: Legal Monitoring Tools' },
]

const MONTHLY = [
  { indicator: 'Average Case Handling Time',      value: '47 days',   benchmark: 'Trend monitoring',  status: 'amber', source: 'Legal cases register' },
  { indicator: 'Standard Contract Template Usage', value: '—',        benchmark: '—',                 status: 'blue',  source: 'Project: Contract Templates' },
  { indicator: 'Board Minutes Circulation Time',  value: '8 days avg', benchmark: 'Trend monitoring', status: 'green', source: 'Board minutes register' },
]

const QUARTERLY = [
  { indicator: 'Board Statutory Calendar', value: '100% compliance', benchmark: 'Target 100%', status: 'green', source: 'Board statutory calendar' },
]

export default function LegalTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Legal" title="Support Functions — Legal" subtitle="8 indicators · Weekly to Quarterly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
      <div><SectionHeader label="Quarterly" /><KPITable rows={QUARTERLY} /></div>
    </div>
  )
}
