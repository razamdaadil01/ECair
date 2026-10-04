import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'Internal Newsletter Development', progress: 35, status: 'amber' },
  { name: 'MBOTE Magazine Design',           progress: 55, status: 'green' },
]

const WEEKLY = [
  { indicator: 'Media Coverage',                    value: '12 mentions · 83% positive',      benchmark: 'Trend monitoring',        status: 'green', source: 'Press review / media monitoring' },
  { indicator: 'Website + Social Media Audience',   value: '8,400 visitors · 14,200 social',  benchmark: 'Trend monitoring',        status: 'green', source: 'Website + social analytics' },
  { indicator: 'Press Requests Handled',            value: '4/4 this week',                   benchmark: 'Target 100%',             status: 'green', source: 'Press requests register' },
  { indicator: 'Average Press Response Time',       value: '3.2 hours',                       benchmark: 'Trend monitoring',        status: 'green', source: 'Press requests register' },
  { indicator: 'Newsletter Open / Engagement Rate', value: '—',                               benchmark: '—',                       status: 'blue',  source: 'Project: Internal Newsletter' },
  { indicator: 'Crisis Communication Response',     value: 'Event-driven',                    benchmark: 'Target < 60 min',         status: 'blue',  source: 'Crisis communications log' },
]

const MONTHLY = [
  { indicator: 'Partnership Calendar Completion',    value: '67%',          benchmark: 'Trend monitoring',    status: 'amber', source: 'Partnership calendar' },
  { indicator: 'Competitive Intelligence Notes',    value: '1 this month', benchmark: '≥ 1 note/month',      status: 'green', source: 'Intelligence notes' },
  { indicator: 'MBOTE Magazine Publication',        value: '—',            benchmark: '—',                   status: 'blue',  source: 'Project: MBOTE Magazine' },
]

export default function CommunicationTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="Communication" title="Support Functions — Communication" subtitle="9 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
