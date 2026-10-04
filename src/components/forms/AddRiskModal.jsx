import { useState, useEffect } from 'react'
import { useAppData } from '../../context/AppDataContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

const C = {
  gold: 'var(--brand-gold)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  red: 'var(--status-red)', amber: 'var(--status-amber)', green: 'var(--status-green)', orange: '#F97316',
}

const INPUT = {
  width: '100%', padding: '8px 12px', fontSize: 13,
  backgroundColor: 'var(--bg-secondary)', border: `1px solid var(--border-subtle)`,
  borderRadius: 6, color: 'var(--text-primary)', outline: 'none',
}
const LABEL = { fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, display: 'block' }

const CATEGORIES = ['Operations', 'Finance', 'Commercial', 'Safety', 'HR', 'IT']
const STATUSES = ['Open', 'Monitored', 'Mitigated']

const PROB_LABELS = ['', 'Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain']
const IMPACT_LABELS = ['', 'Minor', 'Moderate', 'Significant', 'Major', 'Existential']

function scoreColor(s) {
  if (s >= 15) return C.red
  if (s >= 10) return C.orange
  if (s >= 5)  return C.amber
  return C.green
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={LABEL}>{label}</span>
      {children}
    </div>
  )
}

function ScalePicker({ value, onChange, labels }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          style={{
            flex: 1, padding: '8px 4px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
            border: value === n ? `2px solid ${C.gold}` : `1px solid var(--border-subtle)`,
            backgroundColor: value === n ? 'var(--gold-alpha-12)' : 'var(--bg-secondary)',
            color: value === n ? C.gold : 'var(--text-secondary)',
            transition: 'all 0.15s',
          }}
        >
          <div>{n}</div>
          <div style={{ fontSize: 9, marginTop: 2, fontWeight: 400 }}>{labels[n]}</div>
        </button>
      ))}
    </div>
  )
}

export default function AddRiskModal({ onClose }) {
  const { addRisk, escalateRiskToDecisions } = useAppData()
  const { addToast } = useToast()

  const [form, setForm] = useState({
    name: '', category: 'Operations', prob: 3, impact: 3,
    owner: '', mitigation: '', deadline: '', status: 'Open',
  })
  const [errors, setErrors] = useState({})

  const score = form.prob * form.impact

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e })
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Risk description is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const newRisk = addRisk({
      name: form.name.trim(),
      category: form.category,
      prob: form.prob,
      impact: form.impact,
      owner: form.owner.trim() || 'TBD',
      mitigation: form.mitigation.trim(),
      deadline: form.deadline,
      status: form.status,
    })
    addToast('✓ Risk added to register', 'success')
    if (score >= 15) {
      escalateRiskToDecisions(newRisk)
      addToast('⚠ Risk escalated to CEO Decision Log', 'warning')
    }
    onClose()
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflowY: 'auto', padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: C.bgCard, borderRadius: 10, width: 560,
          border: `1px solid ${C.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden', flexShrink: 0,
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>Add New Risk</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textSecondary, lineHeight: 1, padding: '2px 4px' }}>×</button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Description */}
          <Field label="Risk Description *">
            <textarea
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Describe the risk…"
              rows={2}
              style={{ ...INPUT, resize: 'vertical', lineHeight: 1.5, borderColor: errors.name ? C.red : 'var(--border-subtle)' }}
              autoFocus
            />
            {errors.name && <span style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.name}</span>}
          </Field>

          {/* Category + Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Category">
              <select value={form.category} onChange={e => set('category', e.target.value)} style={INPUT}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)} style={INPUT}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Probability */}
          <Field label={`Probability (${form.prob} — ${PROB_LABELS[form.prob]})`}>
            <ScalePicker value={form.prob} onChange={v => set('prob', v)} labels={PROB_LABELS} />
          </Field>

          {/* Impact */}
          <Field label={`Impact (${form.impact} — ${IMPACT_LABELS[form.impact]})`}>
            <ScalePicker value={form.impact} onChange={v => set('impact', v)} labels={IMPACT_LABELS} />
          </Field>

          {/* Score display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', backgroundColor: 'var(--surface-subtle)', borderRadius: 8 }}>
            <span style={{ fontSize: 12, color: C.textSecondary }}>Risk Score</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: scoreColor(score) }}>{score}</span>
            <span style={{ fontSize: 11, color: scoreColor(score) }}>/ 25</span>
            <span style={{ fontSize: 11, color: C.textSecondary, marginLeft: 4 }}>
              {score >= 15 ? 'Critical' : score >= 10 ? 'High' : score >= 5 ? 'Medium' : 'Low'}
            </span>
          </div>

          {/* Auto-escalation warning */}
          {score >= 15 && (
            <div style={{ padding: '10px 14px', backgroundColor: 'var(--red-alpha-8)', border: `1px solid ${C.red}`, borderRadius: 8, display: 'flex', gap: 8 }}>
              <span style={{ color: C.red, fontSize: 14 }}>⚠</span>
              <span style={{ fontSize: 12, color: C.red, lineHeight: 1.5 }}>
                Score ≥ 15 — this risk will be automatically escalated to the CEO Decision Log.
              </span>
            </div>
          )}

          {/* Owner + Deadline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Risk Owner">
              <input type="text" value={form.owner} onChange={e => set('owner', e.target.value)} placeholder="e.g. COO" style={INPUT} />
            </Field>
            <Field label="Deadline">
              <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} style={INPUT} />
            </Field>
          </div>

          {/* Mitigation Plan */}
          <Field label="Mitigation Plan">
            <textarea
              value={form.mitigation}
              onChange={e => set('mitigation', e.target.value)}
              placeholder="Describe planned mitigations or controls…"
              rows={3}
              style={{ ...INPUT, resize: 'vertical', lineHeight: 1.5 }}
            />
          </Field>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 6, border: `1px solid ${C.border}`, background: 'none', color: C.textSecondary, cursor: 'pointer' }}
          >Cancel</button>
          <button
            onClick={handleSubmit}
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: C.gold, color: '#111', fontWeight: 600, cursor: 'pointer' }}
          >Add Risk</button>
        </div>
      </div>
    </div>
  )
}
