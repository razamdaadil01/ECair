import { C, ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const EP = [
  { name: 'HRIS Implementation',                     progress: 45, status: 'amber' },
  { name: 'Workforce Satisfaction Survey 2025',       progress: 20, status: 'blue'  },
  { name: 'Staff Appraisal 2025',                     progress: 65, status: 'green' },
  { name: 'Recruitment Phase 2 – Regional Flights',   progress: 10, status: 'blue'  },
]

const WEEKLY = [
  { indicator: 'Ground/Admin Staff Absenteeism',       value: '4.2%',                            benchmark: 'Target < 5%',                               status: 'green', source: 'HRIS' },
  { indicator: 'Average Time to Hire',                 value: '38 days',                         benchmark: 'Target < 30 days',                          status: 'red',   source: 'Recruitment tracking' },
  { indicator: 'Key Positions Vacant > 90 days',      value: '2 positions',                     benchmark: 'Alert from 1',                              status: 'red',   source: 'Key positions map' },
  { indicator: 'Open Employee Grievances',             value: '3 open',                          benchmark: 'Qualitative monitoring',                    status: 'amber', source: 'Grievances register' },
  { indicator: 'Flight Crew Coverage — Regional',      value: '—',                               benchmark: '—',                                         status: 'blue',  source: 'Project: Recruitment Phase 2' },
  { indicator: 'Unresolved HR Claims',                 value: '1 overdue',                       benchmark: 'Alert from 1 overdue',                      status: 'red',   source: 'HR claims register' },
  { indicator: 'Flight Crew Turnover Rate',            value: '+0 this week',                    benchmark: 'Alert if increase 2 consecutive weeks',     status: 'green', source: 'HR' },
]

const MONTHLY = [
  { indicator: 'Overall Turnover Rate (12m rolling)', value: '14.2%',    benchmark: 'Alert if increase 2 consecutive quarters', status: 'amber', source: 'HRIS' },
  { indicator: 'Training Plan Completion',             value: '61%',      benchmark: 'Trend monitoring',                         status: 'blue',  source: 'Training plan' },
  { indicator: 'Formalised Job Descriptions',         value: '73%',      benchmark: 'Target 100%',                              status: 'amber', source: 'Job description repository' },
  { indicator: 'Workplace Accidents (admin/ground)',  value: '0 this month', benchmark: 'Trend monitoring',                     status: 'green', source: 'Workplace accidents register' },
  { indicator: 'Staff Satisfaction Score',             value: '—',        benchmark: '—',                                       status: 'blue',  source: 'Project: Workforce Satisfaction Survey' },
  { indicator: 'Annual Appraisal Completion',         value: '—',        benchmark: '—',                                       status: 'blue',  source: 'Project: Staff Appraisal 2025' },
]

export default function HRTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="HR" title="Support Functions — Human Resources" subtitle="13 indicators · Weekly to Monthly" />
      <ExecutionProCard projects={EP} />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
