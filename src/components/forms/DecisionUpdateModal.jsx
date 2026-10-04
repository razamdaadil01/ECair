import { useState, useEffect } from 'react'
import { useAppData } from '../../context/AppDataContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

const C = {
  gold: 'var(--brand-gold)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  red: 'var(--status-red)', green: 'var(--status-green)', blue: 'var(--status-blue)',
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

export default function DecisionUpdateModal({ decision, onClose }) {
  const { updateDecision } = useAppData()
  const { addToast } = useToast()

  const [newStatus, setNewStatus] = useState(decision.status || 'Pending')
  const [meetingDate, setMeetingDate] = useState('')
  const [decisionTaken, setDecisionTaken] = useState('')
  const [outcome, setOutcome] = useState('')
  const [followUpOwner, setFollowUpOwner] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function validate() {
    const e = {}
    if (newStatus === 'Decided' && !decisionTaken.trim()) e.decisionTaken = 'Decision taken is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    updateDecision(decision.id, {
      newStatus,
      meetingDate: newStatus === 'Scheduled' ? meetingDate : undefined,
      outcome: newStatus === 'Decided'
        ? `${decisionTaken.trim()}${outcome.trim() ? ' — ' + outcome.trim() : ''}`
        : undefined,
    })

    if (newStatus === 'Decided') {
      addToast(`✓ Decision recorded — ${decision.title}`, 'success')
    } else if (newStatus === 'Scheduled') {
      addToast(`✓ Decision scheduled${meetingDate ? ' for ' + meetingDate : ''}`, 'info')
    } else {
      addToast('✓ Decision status updated', 'success')
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
          backgroundColor: C.bgCard, borderRadius: 10, width: 520,
          border: `1px solid ${C.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden', flexShrink: 0,
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>Update Decision Status</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textSecondary, lineHeight: 1, padding: '2px 4px' }}>×</button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Read-only info */}
          <div style={{ padding: '12px 14px', backgroundColor: 'var(--surface-subtle)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 11, color: C.textSecondary }}>{decision.id} · Due {decision.due}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{decision.title}</span>
          </div>

          {/* Current status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Current Status">
              <div style={{ ...INPUT, backgroundColor: 'var(--surface-subtle)', color: C.textSecondary, cursor: 'default' }}>{decision.status || 'Pending'}</div>
            </Field>
            <Field label="New Status">
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={INPUT}>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Decided">Decided</option>
              </select>
            </Field>
          </div>

          {/* Conditional: Scheduled → date picker */}
          {newStatus === 'Scheduled' && (
            <Field label="Meeting Date">
              <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} style={INPUT} autoFocus />
            </Field>
          )}

          {/* Conditional: Decided → decision fields */}
          {newStatus === 'Decided' && (
            <>
              <Field label="Decision Taken *">
                <textarea
                  value={decisionTaken}
                  onChange={e => { setDecisionTaken(e.target.value); if (errors.decisionTaken) setErrors({}) }}
                  placeholder="What was decided…"
                  rows={3}
                  style={{ ...INPUT, resize: 'vertical', lineHeight: 1.5, borderColor: errors.decisionTaken ? C.red : 'var(--border-subtle)' }}
                  autoFocus
                />
                {errors.decisionTaken && <span style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.decisionTaken}</span>}
              </Field>
              <Field label="Outcome / Next Steps">
                <textarea
                  value={outcome}
                  onChange={e => setOutcome(e.target.value)}
                  placeholder="Outcome, follow-up actions, responsible parties…"
                  rows={3}
                  style={{ ...INPUT, resize: 'vertical', lineHeight: 1.5 }}
                />
              </Field>
            </>
          )}

          {/* Follow-up owner + Notes */}
          <Field label="Follow-up Owner">
            <input type="text" value={followUpOwner} onChange={e => setFollowUpOwner(e.target.value)} placeholder="e.g. COO" style={INPUT} />
          </Field>
          <Field label="Notes">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Additional context or remarks…"
              rows={2}
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
          >Save Update</button>
        </div>
      </div>
    </div>
  )
}
