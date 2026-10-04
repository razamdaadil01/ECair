// ─── Operations Tab ───────────────────────────────────────────────────────────
// Strategic Indicators > Operations — 10 KPIs: Daily (3) · Weekly (7 as table)

const C = {
  gold: '#C9A84C', bg: '#070D1A', bgCard: '#111E33', bgSecondary: '#0D1626',
  border: '#1A2B45', textPrimary: '#F0F4F8', textSecondary: '#7A92B0',
  green: '#22C55E', amber: '#F59E0B', red: '#EF4444', blue: '#3B82F6',
}
const SC = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }

function StatusDot({ color, size = 8 }) {
  const bg = SC[color] || color
  return <span style={{ display: 'inline-block', flexShrink: 0, width: size, height: size, borderRadius: '50%', backgroundColor: bg, boxShadow: `0 0 5px ${bg}55` }} />
}
function StatusLine({ color, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <StatusDot color={color} size={7} />
      <span style={{ fontSize: 12, color: SC[color], fontWeight: 500 }}>{text}</span>
    </div>
  )
}
function CadenceBadge({ label }) {
  return <span style={{ fontSize: 10, color: C.textSecondary, fontWeight: 500, backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, padding: '2px 7px', borderRadius: 4 }}>{label}</span>
}
function SourceLine({ text }) {
  return <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 'auto', paddingTop: 10 }}>Source: {text}</div>
}
function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>
  )
}
function CardWrap({ children, style }) {
  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
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
function ProgressBar({ pct, color }) {
  return (
    <div style={{ height: 4, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', backgroundColor: SC[color] || color, borderRadius: 2 }} />
    </div>
  )
}

// ── Daily card 1: Flights operated ───────────────────────────────────────────

const TODAY_FLIGHTS = [
  { route: 'BZV-LBV', time: '06:30', ok: true },
  { route: 'BZV-DLA', time: '08:15', ok: true },
  { route: 'BZV-LBV', time: '11:00', ok: true },
  { route: 'BZV-LFW', time: '13:30', ok: true },
  { route: 'BZV-DLA', time: '16:00', ok: true },
  { route: 'BZV-LBV', time: '19:00', ok: true },
]

function FlightsOperatedCard() {
  return (
    <CardWrap>
      <CardHeader title="Flights Operated vs Scheduled" badge="Daily" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.green, lineHeight: 1 }}>6 / 6</span>
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>All flights operated today</div>
      <StatusLine color="green" text="On Track" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
        {TODAY_FLIGHTS.map(f => (
          <div key={f.route + f.time} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
            <span style={{ color: C.textSecondary }}>{f.route} {f.time}</span>
            <span style={{ color: C.green, fontWeight: 600 }}>✓ Operated</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Alert as soon as a flight cancelled for technical reasons</div>
      <SourceLine text="Operations Control" />
    </CardWrap>
  )
}

// ── Daily card 2: OTP Today ───────────────────────────────────────────────────

function OTPTodayCard() {
  return (
    <CardWrap>
      <CardHeader title="On-Time Performance — Today" badge="Daily" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.green, lineHeight: 1 }}>86%</span>
      </div>
      <div style={{ fontSize: 12, color: C.textSecondary }}>5 of 6 flights departed within 15 min of schedule</div>
      <ProgressBar pct={86} color="green" />
      <StatusLine color="green" text="On Track (target: > 80%)" />
      <div style={{ fontSize: 11, color: C.amber, paddingTop: 4 }}>
        BZV-DLA 16:00 — delayed 22 min (crew late)
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>Benchmark: Warning if &lt; 80%</div>
      <SourceLine text="Flight Operations Control" />
    </CardWrap>
  )
}

// ── Daily card 3: Urgent decisions ───────────────────────────────────────────

const DECISIONS = [
  { topic: 'Second aircraft — repair or lease?', date: 'Oct 15', days: 11 },
  { topic: 'State subsidy follow-up', date: 'Oct 20', days: 16 },
]

function UrgentDecisionsCard() {
  return (
    <CardWrap>
      <CardHeader title="Urgent Decisions Pending" badge="Daily" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.amber, lineHeight: 1 }}>2</span>
        <span style={{ fontSize: 12, color: C.textSecondary }}>decisions ≤ 7 days</span>
      </div>
      <StatusLine color="amber" text="Action required" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
        {DECISIONS.map(d => (
          <div key={d.topic} style={{ padding: '8px 10px', backgroundColor: 'rgba(245,158,11,0.07)', borderRadius: 6, border: `1px solid rgba(245,158,11,0.15)` }}>
            <div style={{ fontSize: 12, color: C.textPrimary, marginBottom: 4 }}>{d.topic}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 11, color: C.textSecondary }}>Deadline: {d.date}</span>
              <span style={{ fontSize: 11, color: d.days <= 7 ? C.red : C.amber, fontWeight: 600 }}>{d.days}d remaining</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>Monitoring — no numerical threshold</div>
      <SourceLine text="CEO Decision Log" />
    </CardWrap>
  )
}

// ── Weekly table ──────────────────────────────────────────────────────────────

const WEEKLY_ROWS = [
  { indicator: 'OTP — 7 Days Rolling',            value: '83%',                           benchmark: 'Warning < 80%',                                 status: 'green', source: 'Flight Ops Control'   },
  { indicator: 'Cancellation Rate (7 days)',        value: '3.2%',                          benchmark: 'Warning > 5% · Critical > 10%',                 status: 'green', source: 'Flight Ops Control'   },
  { indicator: 'Flight Hours Flown vs Scheduled',  value: '94.1%',                         benchmark: 'Alert if variance > 15%',                        status: 'green', source: 'Network Planning'      },
  { indicator: 'Crew Headcount vs Required',        value: '2 positions short · 3 licences < 90 days', benchmark: 'Critical if critical position vacant', status: 'amber', source: 'HR / Flight Ops'       },
  { indicator: 'Min Crew Complement Compliance',   value: '0 flights affected (7 days)',   benchmark: 'Alert from 1 flight',                            status: 'green', source: 'PNC / Flight Ops'     },
  { indicator: 'Flight Crew Turnover Rate',        value: '+0 departures this week',        benchmark: 'Alert if increase 2 consecutive weeks',          status: 'green', source: 'HR'                    },
  { indicator: 'Pilots Trained In-House (cumul.)', value: '4 pilots since programme launch', benchmark: 'Trend monitoring',                             status: 'blue',  source: 'HR / Training'         },
]

function WeeklyTable() {
  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.gold}` }}>
            {['Indicator', 'Value', 'Benchmark', '', 'Source'].map((h, i) => (
              <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: C.textSecondary, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WEEKLY_ROWS.map((row, i) => (
            <tr key={row.indicator} style={{ backgroundColor: i % 2 === 0 ? C.bgSecondary : C.bgCard }}>
              <td style={{ padding: '11px 14px', color: C.textPrimary, fontWeight: 500, borderBottom: `1px solid ${C.border}`, width: '22%' }}>{row.indicator}</td>
              <td style={{ padding: '11px 14px', color: C.textPrimary, fontWeight: 600, borderBottom: `1px solid ${C.border}`, width: '20%' }}>{row.value}</td>
              <td style={{ padding: '11px 14px', color: C.textSecondary, borderBottom: `1px solid ${C.border}`, width: '30%' }}>{row.benchmark}</td>
              <td style={{ padding: '11px 14px', textAlign: 'center', borderBottom: `1px solid ${C.border}`, width: '6%' }}><StatusDot color={row.status} size={10} /></td>
              <td style={{ padding: '11px 14px', color: C.textSecondary, fontSize: 11, borderBottom: `1px solid ${C.border}`, width: '22%' }}>{row.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function OperationsTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          Strategic Indicators <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Operations</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>Strategic Indicators — Operations</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>10 indicators · Daily to Weekly</p>
        </div>
      </div>

      <div>
        <SectionHeader label="Daily" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <FlightsOperatedCard />
          <OTPTodayCard />
          <UrgentDecisionsCard />
        </div>
      </div>

      <div>
        <SectionHeader label="Weekly" />
        <WeeklyTable />
      </div>
    </div>
  )
}
