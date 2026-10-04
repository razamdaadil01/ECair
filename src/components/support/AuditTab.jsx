import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'Processes and Procedures Development', progress: 30, status: 'amber' },
]

const WEEKLY = [
  { indicator: 'Open Recommendations',               value: '7 open · 2 critical', benchmark: 'Alert if critical overdue', status: 'red',   source: 'Audit recommendations register' },
  { indicator: 'Anomalies / Potential Fraud Detected', value: '0 this week',       benchmark: 'Alert from 1',             status: 'green', source: 'Reports register' },
]

const MONTHLY = [
  { indicator: 'Annual Audit Plan Completion',    value: '58% (7 of 12)',  benchmark: 'Target 100% at year end',  status: 'amber', source: 'Annual audit plan' },
  { indicator: 'Recommendation Closure Rate',     value: '71%',            benchmark: 'Trend monitoring',         status: 'amber', source: 'Audit recommendations register' },
  { indicator: 'Critical Processes Coverage',     value: '—',              benchmark: '—',                        status: 'blue',  source: 'Project: Processes and Procedures' },
  { indicator: 'Field Compliance by Sampling',    value: '87%',            benchmark: 'Target ≥ 90%',             status: 'amber', source: 'Field inspection reports' },
  { indicator: 'Reporting Calendar to Management', value: '100%',          benchmark: 'Target 100%',              status: 'green', source: 'Reporting calendar' },
]

export default function AuditTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Audit" title="Support Functions — Audit" subtitle="7 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
