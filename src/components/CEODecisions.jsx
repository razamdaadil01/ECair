// ─── CEO Decisions ────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useAppData } from '../context/AppDataContext.jsx'
import DecisionUpdateModal from './forms/DecisionUpdateModal.jsx'

const C = {
  gold: 'var(--brand-gold)', bg: 'var(--bg-primary)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  green: 'var(--status-green)', amber: 'var(--status-amber)', red: 'var(--status-red)', blue: 'var(--status-blue)',
}

function StatCards({ pending, decided }) {
  const scheduled = pending.filter(p => p.status === 'Scheduled').length
  const cards = [
    { label: 'Pending Decision', value: pending.filter(p => p.status !== 'Scheduled').length, color: C.red,   icon: '⏳' },
    { label: 'Scheduled',        value: scheduled,                                              color: C.blue,  icon: '📅' },
    { label: 'Decided (Oct)',    value: decided.length,                                         color: C.green, icon: '✅' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {cards.map(c => (
        <div key={c.label} style={{
          backgroundColor: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${c.color}`,
          borderRadius: 8, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 28 }}>{c.icon}</span>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 4 }}>{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DecisionCard({ d, onUpdateStatus }) {
  const domainColor = { Operations: C.amber, Commercial: C.blue, HR: C.green }
  const domainBg    = { Operations: 'var(--amber-alpha-12)', Commercial: 'var(--blue-alpha-12)', HR: 'var(--green-alpha-12)' }
  const dc   = domainColor[d.domain] || C.gold
  const dcBg = domainBg[d.domain]   || 'var(--gold-alpha-12)'

  return (
    <div style={{
      backgroundColor: C.bgCard, border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${C.red}`, borderRadius: 8, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>{d.id}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, color: dc,
              backgroundColor: dcBg, padding: '2px 8px', borderRadius: 4,
            }}>{d.domain}</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.textPrimary }}>{d.title}</h3>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: C.textSecondary, marginBottom: 2 }}>Decision due</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{d.due}</div>
          </div>
          <button
            onClick={() => onUpdateStatus(d)}
            style={{
              fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 5,
              border: `1px solid ${C.border}`, backgroundColor: 'var(--surface-subtle)',
              color: C.textPrimary, cursor: 'pointer',
            }}
          >Update Status</button>
        </div>
      </div>

      {/* 3-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 16 }}>
        {/* Options */}
        <div style={{ backgroundColor: C.bgSecondary, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Options</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.options.map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', backgroundColor: C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: C.textSecondary }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 2, lineHeight: 1.4 }}>{o.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div style={{ backgroundColor: 'var(--gold-alpha-7)', border: `1px solid var(--gold-alpha-12)`, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Recommendation</div>
          <p style={{ margin: 0, fontSize: 12, color: C.textPrimary, lineHeight: 1.65 }}>{d.recommendation}</p>
        </div>

        {/* Key Facts */}
        <div style={{ backgroundColor: C.bgSecondary, borderRadius: 6, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Key Facts</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.facts.map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: 4, width: 5, height: 5, borderRadius: '50%', backgroundColor: C.gold }} />
                <span style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function DecidedCard({ d }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      backgroundColor: C.bgCard, border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${C.green}`, borderRadius: 8, overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, flexShrink: 0 }}>{d.id}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, textAlign: 'left' }}>{d.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: C.textSecondary }}>{d.decided}</span>
          <span style={{ fontSize: 10, color: C.green, backgroundColor: 'var(--green-alpha-12)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Decided</span>
          <span style={{ fontSize: 14, color: C.textSecondary }}>{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 18px 16px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 12, fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>
            <strong style={{ color: C.textPrimary }}>Outcome:</strong> {d.outcome}
          </div>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textSecondary, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>
  )
}

export default function CEODecisions() {
  const { pending, decided } = useAppData()
  const [updateModal, setUpdateModal] = useState(null)

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: 11, color: C.textSecondary, marginBottom: 8 }}>
          ECAir CEO Cockpit <span style={{ margin: '0 6px', color: C.border }}>/</span>
          <span style={{ color: C.textPrimary }}>CEO Decisions</span>
        </div>
        <div style={{ paddingLeft: 14, borderLeft: `3px solid ${C.gold}` }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>CEO Decisions</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSecondary }}>
            {pending.length} pending · {decided.length} decided this month
          </p>
        </div>
      </div>

      <StatCards pending={pending} decided={decided} />

      <div>
        <SectionHeader label="Pending Decision" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {pending.map(d => (
            <DecisionCard key={d.id} d={d} onUpdateStatus={setUpdateModal} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader label="Decided" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {decided.map(d => <DecidedCard key={d.id} d={d} />)}
        </div>
      </div>

      {updateModal && (
        <DecisionUpdateModal
          decision={updateModal}
          onClose={() => setUpdateModal(null)}
        />
      )}
    </div>
  )
}
