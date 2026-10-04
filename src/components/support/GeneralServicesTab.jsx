import { ExecutionProCard, KPITable, PageHeader, SectionHeader } from './_shared.jsx'

const WEEKLY = [
  { indicator: 'HQ Repairs Handling Rate',          value: '94%',                      benchmark: 'Target ≥ 90%',            status: 'green', source: 'HQ interventions register' },
  { indicator: 'Branch Repairs Handling Rate',      value: '87% avg',                  benchmark: 'Target ≥ 90%',            status: 'amber', source: 'Branches interventions register' },
  { indicator: 'Company Vehicle Repairs',           value: '96% completion',           benchmark: 'Target ≥ 90%',            status: 'green', source: 'Vehicle repairs register (owned)' },
  { indicator: 'Rental Vehicle Repairs',            value: '91% completion',           benchmark: 'Target ≥ 90%',            status: 'green', source: 'Vehicle repairs register (rented)' },
  { indicator: 'Company Vehicle Incidents',         value: '0.3 incidents/vehicle',    benchmark: 'Target ≤ 1/vehicle',      status: 'green', source: 'Vehicle incidents register' },
  { indicator: 'Rental Vehicle Incidents',          value: '0.5 incidents/vehicle',    benchmark: 'Target ≤ 1/vehicle',      status: 'green', source: 'Vehicle incidents register' },
  { indicator: 'Premises Security Incidents',       value: '0 this week',              benchmark: 'Alert from 1',            status: 'green', source: 'Security incidents register' },
]

const MONTHLY = [
  { indicator: 'HQ Maintenance Plan',              value: '92% completion',  benchmark: 'Target ≥ 90%', status: 'green', source: 'HQ maintenance plan' },
  { indicator: 'Branch Maintenance Plan',          value: '84% completion',  benchmark: 'Target ≥ 90%', status: 'amber', source: 'Branches maintenance plan' },
  { indicator: 'Company Vehicle Maintenance',      value: '95% completion',  benchmark: 'Target ≥ 90%', status: 'green', source: 'Vehicle maintenance (owned)' },
  { indicator: 'Rental Vehicle Maintenance',       value: '88% completion',  benchmark: 'Target ≥ 90%', status: 'amber', source: 'Vehicle maintenance (rented)' },
  { indicator: 'Scheduled Safety Inspections',     value: '91% completion',  benchmark: 'Target ≥ 90%', status: 'green', source: 'Safety inspections register' },
]

export default function GeneralServicesTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader dept="General Services" title="Support Functions — General Services" subtitle="12 indicators · Weekly to Monthly" />
      <ExecutionProCard noProjects />
      <div><SectionHeader label="Weekly" /><KPITable rows={WEEKLY} /></div>
      <div><SectionHeader label="Monthly" /><KPITable rows={MONTHLY} /></div>
    </div>
  )
}
