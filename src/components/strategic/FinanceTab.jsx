// ─── Finance Tab ──────────────────────────────────────────────────────────────
// Strategic Indicators > Finance — 18 KPIs across 4 cadence groups:
//   Daily (2) · Weekly (5) · Monthly (9) · Quarterly (3)

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  gold:        '#C9A84C',
  bg:          '#070D1A',
  bgCard:      '#111E33',
  bgSecondary: '#0D1626',
  border:      '#1A2B45',
  textPrimary:   '#F0F4F8',
  textSecondary: '#7A92B0',
  green: '#22C55E',
  amber: '#F59E0B',
  red:   '#EF4444',
  blue:  '#3B82F6',
}
const STATUS_COLOR = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }

// ── Shared primitives ─────────────────────────────────────────────────────────

function StatusDot({ color, size = 8 }) {
  const bg = STATUS_COLOR[color] || color
  return (
    <span style={{
      display: 'inline-block', flexShrink: 0,
      width: size, height: size, borderRadius: '50%',
      backgroundColor: bg, boxShadow: `0 0 5px ${bg}55`,
    }} />
  )
}

function StatusLine({ color, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <StatusDot color={color} size={7} />
      <span style={{ fontSize: 12, color: STATUS_COLOR[color], fontWeight: 500 }}>{text}</span>
    </div>
  )
}

function CadenceBadge({ label }) {
  return (
    <span style={{
      fontSize: 10, color: C.textSecondary, fontWeight: 500,
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: `1px solid ${C.border}`,
      padding: '2px 7px', borderRadius: 4,
    }}>
      {label}
    </span>
  )
}

function SourceLine({ text }) {
  return (
    <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 'auto', paddingTop: 10 }}>
      Source: {text}
    </div>
  )
}

function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{
        fontSize: 10, fontWeight: 700, color: C.textSecondary,
        letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>
  )
}

function CardWrap({ children, style }) {
  return (
    <div style={{
      backgroundColor: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style,
    }}>
      {children}
    </div>
  )
}

function CardHeader({ title, badge }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.gold, lineHeight: 1.4 }}>{title}</span>
      {badge && <CadenceBadge label={badge} />}
    </div>
  )
}

// ── Section 1 — Daily ─────────────────────────────────────────────────────────

const CASH_BARS = [
  { day: 'Mon', value: 210000 },
  { day: 'Tue', value: 198000 },
  { day: 'Wed', value: 191000 },
  { day: 'Thu', value: 188000 },
  { day: 'Fri', value: 185000 },
  { day: 'Sat', value: 184200 },
  { day: 'Sun', value: 178000, projected: true },
]

function CashBarChart() {
  const maxV = Math.max(...CASH_BARS.map(d => d.value))
  const CHART_H = 72

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: CHART_H }}>
        {CASH_BARS.map((d, i) => {
          const barH = Math.max(Math.round((d.value / maxV) * CHART_H), 4)
          const declining = i > 0 && d.value < CASH_BARS[i - 1].value
          const barColor = i === 0 ? C.green : declining ? C.red : C.green

          return (
            <div key={d.day} style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%',
                height: barH,
                borderRadius: '2px 2px 0 0',
                backgroundColor: d.projected ? 'transparent' : barColor,
                border: d.projected ? `1.5px dashed ${barColor}` : 'none',
                opacity: d.projected ? 0.55 : 1,
              }} />
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
        {CASH_BARS.map(d => (
          <div key={d.day} style={{
            flex: 1, textAlign: 'center',
            fontSize: 9, color: d.projected ? C.textSecondary + '99' : C.textSecondary,
          }}>
            {d.day}
          </div>
        ))}
      </div>
    </div>
  )
}

function CashPositionCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Cash Position & 7-Day Forecast" badge="Daily" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, lineHeight: 1 }}>$184,200</span>
      </div>
      <StatusLine color="red" text="Critical — Declining 3 consecutive days" />
      <CashBarChart />
      <div style={{ fontSize: 12, color: C.amber, fontWeight: 500 }}>
        7-day projection: $178,000
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>
        Alert threshold: net movement negative 3 consecutive days
      </div>
      <SourceLine text="Finance Dept. / Daily bank reconciliation" />
    </CardWrap>
  )
}

const PAYMENTS = [
  { supplier: 'Fuel Supplier',     amount: '$45,000',  due: 'Oct 02, 2026', status: 'OVERDUE',       statusColor: 'red'   },
  { supplier: 'ASECNA / Nav Charges', amount: '$12,000', due: 'Oct 02, 2026', status: 'OVERDUE',     statusColor: 'red'   },
  { supplier: 'Pilot Salaries',    amount: '$78,000',  due: 'Oct 08, 2026', status: 'Due in 4 days', statusColor: 'amber' },
  { supplier: 'Aircraft Leasing', amount: '$95,000',  due: 'Oct 09, 2026', status: 'Due in 5 days', statusColor: 'amber' },
  { supplier: 'Airport Insurance', amount: '$18,000',  due: 'Oct 15, 2026', status: 'Upcoming',      statusColor: 'blue'  },
]

function PaymentBadge({ text, color }) {
  const bg = {
    red:   'rgba(239,68,68,0.15)',
    amber: 'rgba(245,158,11,0.15)',
    blue:  'rgba(59,130,246,0.15)',
  }[color]
  return (
    <span style={{
      fontSize: 10, fontWeight: 700,
      color: STATUS_COLOR[color],
      backgroundColor: bg,
      padding: '2px 6px', borderRadius: 4,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  )
}

function CriticalPaymentsCard() {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title="Critical Payments Due — Next 7 Days" badge="Daily" />
      <StatusLine color="red" text="2 Overdue" />

      {/* Mini table */}
      <div style={{ fontSize: 11 }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 100px 110px',
          gap: 8,
          padding: '5px 0',
          borderBottom: `1px solid ${C.gold}`,
          color: C.textSecondary,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          <span>Supplier</span>
          <span style={{ textAlign: 'right' }}>Amount</span>
          <span>Due Date</span>
          <span>Status</span>
        </div>
        {PAYMENTS.map((p, i) => (
          <div key={p.supplier} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 100px 110px',
            gap: 8,
            padding: '8px 0',
            borderBottom: i < PAYMENTS.length - 1 ? `1px solid ${C.border}` : 'none',
            alignItems: 'center',
          }}>
            <span style={{ color: C.textPrimary }}>{p.supplier}</span>
            <span style={{ color: C.textPrimary, fontWeight: 600, textAlign: 'right' }}>{p.amount}</span>
            <span style={{ color: C.textSecondary }}>{p.due}</span>
            <PaymentBadge text={p.status} color={p.statusColor} />
          </div>
        ))}
      </div>

      {/* Total overdue */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 10, borderTop: `1px solid ${C.border}`,
      }}>
        <span style={{ fontSize: 11, color: C.textSecondary }}>Total overdue</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.red }}>$57,000</span>
      </div>
      <SourceLine text="CFO / Accounts Payable" />
    </CardWrap>
  )
}

// ── Section 2 — Weekly ────────────────────────────────────────────────────────

function ProgressBar({ pct, color }) {
  return (
    <div style={{ height: 4, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden' }}>
      <div style={{
        width: `${Math.min(pct, 100)}%`,
        height: '100%',
        backgroundColor: STATUS_COLOR[color] || color,
        borderRadius: 2,
      }} />
    </div>
  )
}

function WeeklyCard({ title, subtitle, value, unit, vsBudget, vsLabel, status, statusText, note, noteColor, source, progress, progressColor }) {
  return (
    <CardWrap>
      <CardHeader title={title} badge="Weekly" />
      {subtitle && (
        <span style={{ fontSize: 11, color: C.textSecondary, marginTop: -6 }}>{subtitle}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: C.textPrimary, lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: C.textSecondary }}>{unit}</span>}
      </div>
      {vsBudget && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, color: C.textSecondary }}>{vsLabel || 'vs Budget:'}</span>
          <span style={{ fontSize: 11, color: C.textSecondary }}>{vsBudget}</span>
        </div>
      )}
      {progress != null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ProgressBar pct={progress} color={progressColor || status} />
          <span style={{ fontSize: 10, color: C.textSecondary }}>{progress}% of target</span>
        </div>
      )}
      <StatusLine color={status} text={statusText} />
      {note && (
        <div style={{ fontSize: 11, color: noteColor ? STATUS_COLOR[noteColor] || noteColor : C.textSecondary, fontStyle: 'italic' }}>
          {note}
        </div>
      )}
      <SourceLine text={source} />
    </CardWrap>
  )
}

const WEEKLY_CARDS = [
  {
    title: 'Cash — 30-Day Forecast',
    value: '$142,000',
    vsBudget: '$240,000 (60% threshold)',
    vsLabel: 'Target:',
    status: 'amber',
    statusText: 'Warning: Below 60% of target',
    progress: 59,
    progressColor: 'amber',
    source: 'Finance Department',
  },
  {
    title: 'Operating Result — Weekly Estimate',
    value: '−$28,400',
    status: 'red',
    statusText: 'Loss this week',
    note: 'Provisional estimate — unaudited',
    source: 'Management Control (weekly flash)',
  },
  {
    title: 'Most Fragile Route (Week)',
    value: 'BZV — LBV',
    vsBudget: 'Contribution: −$14,200',
    vsLabel: '',
    status: 'red',
    statusText: 'Negative contribution',
    note: 'Decision required if negative 2 consecutive weeks',
    noteColor: 'amber',
    source: 'Network Management Control',
  },
  {
    title: 'RASK',
    subtitle: 'Revenue per Available Seat-Kilometre',
    value: '$0.087',
    unit: '/ ASK',
    vsBudget: '$0.094 — variance −7.4%',
    vsLabel: 'vs Budget:',
    status: 'amber',
    statusText: 'Warning: Declined 2 consecutive months',
    source: 'Management Control',
  },
  {
    title: 'CASK',
    subtitle: 'Cost per Available Seat-Kilometre',
    value: '$0.112',
    unit: '/ ASK',
    vsBudget: '+4.8% vs previous month',
    vsLabel: 'Trend:',
    status: 'amber',
    statusText: 'Approaching threshold',
    note: 'Alert if increase >5% vs previous month excl. fuel effect',
    source: 'Management Control',
  },
]

function WeeklySection() {
  const [row1, row2] = [WEEKLY_CARDS.slice(0, 3), WEEKLY_CARDS.slice(3)]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {row1.map(c => <WeeklyCard key={c.title} {...c} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {row2.map(c => <WeeklyCard key={c.title} {...c} />)}
        {/* empty spacer to right-align the 2 cards */}
        <div />
      </div>
    </div>
  )
}

// ── Section 3 — Monthly table ─────────────────────────────────────────────────

const MONTHLY_ROWS = [
  {
    indicator: 'Available Cash',
    value: '$184,200',
    vsBudget: 'See alert strip',
    status: 'red',
    cadence: 'Monthly',
    source: 'Finance / Banks',
  },
  {
    indicator: 'Monthly Operating Result',
    value: '−$89,400',
    vsBudget: 'Budget: −$45,000 (loss >20% over budget)',
    status: 'red',
    cadence: 'Monthly',
    source: 'Management Control',
  },
  {
    indicator: 'Breakdown of Operating Expenses',
    value: 'Fuel 38% · Maint 22% · Personnel 24% · Charges 11% · Other 5%',
    vsBudget: 'Fuel +6pts vs budget',
    status: 'amber',
    cadence: 'Monthly',
    source: 'Management Control',
  },
  {
    indicator: 'Fuel Bill + Price Hedging',
    value: '$142,000',
    vsBudget: 'Budget: $128,000 (+10.9%) — no hedging in place',
    status: 'red',
    cadence: 'Monthly',
    source: 'Finance / Fuel contracts',
  },
  {
    indicator: 'Cash — 90-Day Forecast',
    value: '$98,000',
    vsBudget: 'Min: 60 days fixed costs ($156,000)',
    status: 'red',
    cadence: 'Monthly',
    source: 'Finance Department',
  },
  {
    indicator: 'State Subsidy Received',
    value: '$320,000',
    vsBudget: 'Budget: $800,000 (40% at mid-year)',
    status: 'red',
    cadence: 'Monthly',
    source: 'Finance / Authority',
  },
  {
    indicator: 'Contribution by Route',
    value: 'BZV-LBV: −$14.2K · BZV-DLA: +$8.1K · BZV-LFW: +$2.4K',
    vsBudget: '1 of 3 routes negative',
    status: 'amber',
    cadence: 'Monthly',
    source: 'Network Mgmt Control',
  },
  {
    indicator: 'Break-even Load Factor',
    value: 'BZV-LBV: 74% needed · Actual: 58%',
    vsBudget: 'Below break-even',
    status: 'red',
    cadence: 'Monthly',
    source: 'Network Mgmt Control',
  },
  {
    indicator: 'Yield (Net Revenue / Passenger)',
    value: '$187 / pax',
    vsBudget: 'Budget: $210 — drop of 11%',
    status: 'red',
    cadence: 'Monthly',
    source: 'Revenue Control / PSS',
  },
]

const COL = { indicator: '22%', value: '22%', vsBudget: '28%', status: '6%', cadence: '8%', source: '14%' }

function MonthlyTable() {
  return (
    <div style={{
      backgroundColor: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.gold}` }}>
            {['Indicator', 'Value', 'vs Target / Budget', '', 'Cadence', 'Source'].map((h, i) => (
              <th key={i} style={{
                padding: '10px 14px',
                textAlign: 'left',
                fontSize: 10,
                fontWeight: 600,
                color: C.textSecondary,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MONTHLY_ROWS.map((row, i) => (
            <tr
              key={row.indicator}
              style={{ backgroundColor: i % 2 === 0 ? C.bgSecondary : C.bgCard }}
            >
              <td style={{ padding: '11px 14px', color: C.textPrimary, fontWeight: 500, borderBottom: `1px solid ${C.border}`, width: COL.indicator }}>
                {row.indicator}
              </td>
              <td style={{ padding: '11px 14px', color: C.textPrimary, fontWeight: 600, borderBottom: `1px solid ${C.border}`, width: COL.value }}>
                {row.value}
              </td>
              <td style={{ padding: '11px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, width: COL.vsBudget, lineHeight: 1.5 }}>
                {row.vsBudget}
              </td>
              <td style={{ padding: '11px 14px', textAlign: 'center', borderBottom: `1px solid ${C.border}`, width: COL.status }}>
                <StatusDot color={row.status} size={10} />
              </td>
              <td style={{ padding: '11px 14px', color: C.textSecondary, fontSize: 11, borderBottom: `1px solid ${C.border}`, width: COL.cadence, whiteSpace: 'nowrap' }}>
                {row.cadence}
              </td>
              <td style={{ padding: '11px 14px', color: C.textSecondary, fontSize: 11, borderBottom: `1px solid ${C.border}`, width: COL.source }}>
                {row.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Section 4 — Quarterly ─────────────────────────────────────────────────────

const QUARTERLY_DATA = [
  {
    title: 'Working Capital (FR)',
    formula: 'Permanent Capital − Fixed Assets',
    value: '−$124,000',
    status: 'red',
    statusText: 'Critical: Negative working capital',
    benchmark: 'Critical if negative',
  },
  {
    title: 'Current Ratio (LG)',
    formula: 'Current Assets ÷ Current Liabilities',
    value: '0.82',
    status: 'amber',
    statusText: 'Warning: Below 1.0',
    benchmark: 'Warning if < 1',
  },
  {
    title: 'Financial Autonomy (RAF)',
    formula: 'Equity ÷ Financial Debt',
    value: '0.71',
    status: 'red',
    statusText: 'Critical: Structural dependence on shareholder',
    benchmark: 'Must remain > 1',
  },
]

function QuarterlyCard({ title, formula, value, status, statusText, benchmark }) {
  return (
    <CardWrap style={{ flex: 1 }}>
      <CardHeader title={title} badge="Quarterly" />
      <span style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>{formula}</span>
      <span style={{ fontSize: 32, fontWeight: 700, color: STATUS_COLOR[status], lineHeight: 1 }}>
        {value}
      </span>
      <StatusLine color={status} text={statusText} />
      <div style={{ fontSize: 11, color: C.textSecondary, paddingTop: 4 }}>
        Benchmark: {benchmark}
      </div>
    </CardWrap>
  )
}

// ── Finance Tab root ──────────────────────────────────────────────────────────

export default function FinanceTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          Strategic Indicators
          <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Finance</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 14,
          paddingLeft: 14,
          borderLeft: `3px solid ${C.gold}`,
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2,
            }}>
              Strategic Indicators — Finance
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>
              18 indicators · Daily to Quarterly
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 1: Daily ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Daily" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <CashPositionCard />
          <CriticalPaymentsCard />
        </div>
      </div>

      {/* ── Section 2: Weekly ────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Weekly" />
        <WeeklySection />
      </div>

      {/* ── Section 3: Monthly ───────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Monthly" />
        <MonthlyTable />
      </div>

      {/* ── Section 4: Quarterly ─────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Quarterly" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {QUARTERLY_DATA.map(d => <QuarterlyCard key={d.title} {...d} />)}
        </div>
      </div>

    </div>
  )
}
