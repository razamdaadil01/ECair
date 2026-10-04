import { useState, useEffect } from 'react'
import { useToast } from '../../context/ToastContext.jsx'

const C = {
  gold: 'var(--brand-gold)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  red: 'var(--status-red)',
}

const INPUT = {
  width: '100%', padding: '8px 12px', fontSize: 13,
  backgroundColor: 'var(--bg-secondary)', border: `1px solid var(--border-subtle)`,
  borderRadius: 6, color: 'var(--text-primary)', outline: 'none',
}

const LABEL = { fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, display: 'block' }

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={LABEL}>{label}</span>
      {children}
    </div>
  )
}

export default function KPIUpdateModal({ row, rowIndex, onClose, onSubmit, period = 'Current Period' }) {
  const { addToast } = useToast()
  const [newValue, setNewValue] = useState('')
  const [notes, setNotes] = useState('')
  const [updatedBy, setUpdatedBy] = useState('')
  const [errors, setErrors] = useState({})

  const timestamp = new Date().toLocaleString()

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function validate() {
    const e = {}
    if (!newValue.trim()) e.newValue = 'New value is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit(rowIndex, newValue.trim())
    addToast('✓ KPI updated successfully', 'success')
    onClose()
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: C.bgCard, borderRadius: 10, width: 480,
          border: `1px solid ${C.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>Update KPI Value</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textSecondary, lineHeight: 1, padding: '2px 4px' }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Read-only row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Indicator">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default' }}>{row.indicator}</div>
            </Field>
            <Field label="Period">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default' }}>{period}</div>
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Current Value">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default' }}>{row.value}</div>
            </Field>
            <Field label="Data Source">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default' }}>{row.source}</div>
            </Field>
          </div>

          <Field label="New Value *">
            <input
              type="text"
              value={newValue}
              onChange={e => { setNewValue(e.target.value); if (errors.newValue) setErrors({}) }}
              placeholder="Enter updated value…"
              style={{ ...INPUT, borderColor: errors.newValue ? C.red : 'var(--border-subtle)' }}
              autoFocus
            />
            {errors.newValue && <span style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.newValue}</span>}
          </Field>

          <Field label="Notes / Context">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any context, caveats, or explanations…"
              rows={3}
              style={{ ...INPUT, resize: 'vertical', lineHeight: 1.5 }}
            />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Updated By">
              <input
                type="text"
                value={updatedBy}
                onChange={e => setUpdatedBy(e.target.value)}
                placeholder="Your name…"
                style={INPUT}
              />
            </Field>
            <Field label="Timestamp">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default', fontSize: 12 }}>{timestamp}</div>
            </Field>
          </div>
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
          >Update KPI</button>
        </div>
      </div>
    </div>
  )
}
