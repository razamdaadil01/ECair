// ─── Risk Register ────────────────────────────────────────────────────────────

const C = {
  gold: 'var(--brand-gold)', bg: 'var(--bg-primary)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)',
  orange: '#F97316',
}

const RISKS = [
  { id: 'R1', name: 'Fleet Grounding Cascade',  category: 'Operations', prob: 4, impact: 5, owner: 'COO',  status: 'Open',      inDecision: true  },
  { id: 'R2', name: 'Fuel Price Spike (+30%)',   category: 'Finance',   prob: 3, impact: 4, owner: 'CFO',  status: 'Monitored', inDecision: true  },
  { id: 'R3', name: 'Key Partner Insolvency',    category: 'Commercial',prob: 2, impact: 4, owner: 'CCO',  status: 'Open',      inDecision: false },
  { id: 'R4', name: 'Regulatory Sanction',       category: 'Safety',    prob: 3, impact: 3, owner: 'CSO',  status: 'Mitigated', inDecision: true  },
  { id: 'R5', name: 'Staff Strike Action',       category: 'HR',        prob: 2, impact: 3, owner: 'CHRO', status: 'Monitored', inDecision: false },
  { id: 'R6', name: 'IT / Data Breach',          category: 'IT',        prob: 2, impact: 2, owner: 'CIO',  status: 'Mitigated', inDecision: false },
]

const SCORE_HEX = { red: '#EF4444', orange: '#F97316', amber: '#F59E0B', green: '#22C55E' }

function scoreColor(s) {
  if (s >= 15) return C.red
  if (s >= 10) return C.orange
  if (s >= 5)  return C.amber
  return C.green
}

function scoreHex(s) {
  if (s >= 15) return SCORE_HEX.red
  if (s >= 10) return SCORE_HEX.orange
  if (s >= 5)  return SCORE_HEX.amber
  return SCORE_HEX.green
}

function cellBg(prob, impact) {
  return `${scoreHex(prob * impact)}22`
}

function Heatmap() {
  // Build lookup: (prob,impact) → risk ids
  const lookup = {}
  RISKS.forEach(r => {
    const key = `${r.prob}-${r.impact}`
    lookup[key] = [...(lookup[key] || []), r.id]
  })

  const CELL_SIZE = 72

  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '20px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.gold }}>Risk Heat Map</span>
        <span style={{ fontSize: 11, color: C.textSecondary, marginLeft: 12 }}>Probability × Impact</span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        {/* Y-axis label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 5 * CELL_SIZE, width: 18 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.14em',
            textTransform: 'uppercase', transform: 'rotate(-90deg)', whiteSpace: 'nowrap',
          }}>Probability →</span>
        </div>

        <div>
          {/* Y-axis numbers + grid rows */}
          {[5, 4, 3, 2, 1].map(prob => (
            <div key={prob} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Y label */}
              <div style={{ width: 20, textAlign: 'right', marginRight: 8, fontSize: 11, color: C.textSecondary, fontWeight: 600 }}>{prob}</div>
              {/* 5 cells */}
              {[1, 2, 3, 4, 5].map(impact => {
                const key = `${prob}-${impact}`
                const riskIds = lookup[key] || []
                const score = prob * impact
                return (
                  <div key={impact} style={{
                    width: CELL_SIZE, height: CELL_SIZE,
                    backgroundColor: cellBg(prob, impact),
                    border: `1px solid ${C.border}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 4, position: 'relative',
                  }}>
                    <span style={{ fontSize: 10, color: scoreColor(score), fontWeight: 700 }}>{score}</span>
                    {riskIds.length > 0 && (
                      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {riskIds.map(id => (
                          <span key={id} style={{
                            fontSize: 9, fontWeight: 700, color: '#111827',
                            backgroundColor: scoreColor(score),
                            padding: '1px 4px', borderRadius: 3,
                          }}>{id}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* X-axis numbers */}
          <div style={{ display: 'flex', marginTop: 6, paddingLeft: 28 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ width: CELL_SIZE, textAlign: 'center', fontSize: 11, color: C.textSecondary, fontWeight: 600 }}>{i}</div>
            ))}
          </div>
          {/* X-axis label */}
          <div style={{ textAlign: 'center', marginTop: 4, paddingLeft: 28 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Impact →</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 20, alignSelf: 'center' }}>
          {[
            { label: 'Critical (15–25)', color: C.red },
            { label: 'High (10–14)',     color: C.orange },
            { label: 'Medium (5–9)',     color: C.amber },
            { label: 'Low (1–4)',        color: C.green },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${l.color}33`, border: `1px solid ${l.color}` }} />
              <span style={{ fontSize: 11, color: C.textSecondary }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RiskTable() {
  const STATUS_COLOR = { Open: C.red, Monitored: C.amber, Mitigated: C.green }

  return (
    <div style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.gold}` }}>
            {['ID', 'Risk', 'Category', 'Prob.', 'Impact', 'Score', 'Owner', 'Status', 'Decision Log'].map((h, i) => (
              <th key={i} style={{
                padding: '10px 14px', textAlign: 'left', fontSize: 10,
                fontWeight: 600, color: C.textSecondary, letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RISKS.map((r, i) => {
            const score = r.prob * r.impact
            const sc = scoreColor(score)
            const rowBg = i % 2 === 0 ? C.bgSecondary : C.bgCard
            return (
              <tr key={r.id} style={{ backgroundColor: rowBg }}>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, fontWeight: 700, color: C.gold, fontSize: 11 }}>{r.id}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, color: C.textPrimary, fontWeight: 500 }}>{r.name}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, color: C.textSecondary }}>{r.category}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, color: C.textPrimary, fontWeight: 600, textAlign: 'center' }}>{r.prob}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, color: C.textPrimary, fontWeight: 600, textAlign: 'center' }}>{r.impact}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#111827', backgroundColor: sc, padding: '2px 8px', borderRadius: 4 }}>{score}</span>
                </td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, color: C.textSecondary, fontSize: 11 }}>{r.owner}</td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: STATUS_COLOR[r.status],
                    backgroundColor: `${STATUS_COLOR[r.status]}18`, padding: '2px 8px', borderRadius: 4,
                  }}>{r.status}</span>
                </td>
                <td style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, textAlign: 'center', fontSize: 14 }}>
                  {r.inDecision ? '✅' : '❌'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function RiskRegister() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          ECAir CEO Cockpit <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>Risk Register</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>Risk Register</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>6 risks tracked · Probability × Impact heatmap</p>
        </div>
      </div>

      <Heatmap />
      <RiskTable />

      {/* Info box */}
      <div style={{
        backgroundColor: 'var(--amber-alpha-7)',
        border: `1px solid var(--amber-border-dim)`,
        borderLeft: `4px solid ${C.amber}`,
        borderRadius: 8, padding: '14px 18px',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <span style={{ color: C.amber, fontSize: 16, flexShrink: 0 }}>ℹ</span>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: C.amber, fontWeight: 600, marginBottom: 4 }}>Risk Escalation Policy</p>
          <p style={{ margin: 0, fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>
            Risks scoring <strong style={{ color: C.red }}>≥ 15</strong> require an active CEO decision within 5 business days.
            Risks scoring <strong style={{ color: C.orange }}>10–14</strong> must be escalated to ExCom with a mitigation plan.
            All open risks are reviewed at the monthly Risk &amp; Compliance Committee.
          </p>
        </div>
      </div>
    </div>
  )
}
