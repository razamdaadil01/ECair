import { useState, useEffect } from 'react'
import { useToast } from '../../context/ToastContext.jsx'

const C = {
  gold: 'var(--brand-gold)', bgCard: 'var(--bg-card)', bgSecondary: 'var(--bg-secondary)',
  border: 'var(--border-subtle)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)',
  red: 'var(--status-red)', green: 'var(--status-green)', amber: 'var(--status-amber)', blue: 'var(--status-blue)',
}

const SC = { green: C.green, amber: C.amber, red: C.red, blue: C.blue }

const INPUT = {
  width: '100%', padding: '7px 10px', fontSize: 13,
  backgroundColor: 'var(--bg-secondary)', border: `1px solid var(--border-subtle)`,
  borderRadius: 6, color: 'var(--text-primary)', outline: 'none',
}

export default function DepartmentDataEntryModal({ rows, onSubmit, onClose, cadence, dept }) {
  const { addToast } = useToast()

  const dueRows = rows.map((r, i) => ({ ...r, originalIndex: i })).filter(r => r.value !== '—')

  const [values, setValues] = useState(() => {
    const init = {}
    dueRows.forEach(r => { init[r.originalIndex] = '' })
    return init
  })
  const [notesMap, setNotesMap] = useState(() => {
    const init = {}
    dueRows.forEach(r => { init[r.originalIndex] = '' })
    return init
  })
  const [draft, setDraft] = useState(false)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmitAll() {
    const updates = dueRows
      .filter(r => values[r.originalIndex]?.trim())
      .map(r => ({ index: r.originalIndex, value: values[r.originalIndex].trim(), notes: notesMap[r.originalIndex]?.trim() }))

    if (updates.length === 0) {
      addToast('No values entered — nothing to submit', 'warning')
      return
    }
    onSubmit(updates)
    const today = new Date().toLocaleDateString()
    addToast(`✓ ${cadence} data submitted for ${dept} — ${today}`, 'success')
    onClose()
  }

  function handleSaveDraft() {
    setDraft(true)
    addToast('Draft saved', 'info')
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        overflowY: 'auto', padding: '32px 20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: C.bgCard, borderRadius: 10,
          width: '100%', maxWidth: 760,
          border: `1px solid ${C.border}`, boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden', flexShrink: 0,
        }}
      >
        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.gold }}>{dept} — {cadence} Data Entry</div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 3 }}>{dueRows.length} indicators due · Upcoming KPIs are excluded</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: C.textSecondary, lineHeight: 1, padding: '2px 6px' }}>×</button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.gold}` }}>
                {['Indicator', 'Current Value', 'New Value', 'Status', 'Notes'].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px', textAlign: 'left', fontSize: 10,
                    fontWeight: 600, color: C.textSecondary, letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dueRows.map((row, i) => {
                const idx = row.originalIndex
                const rowBg = i % 2 === 0 ? 'var(--bg-secondary)' : C.bgCard
                return (
                  <tr key={idx} style={{ backgroundColor: rowBg }}>
                    <td style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, color: C.textPrimary, fontWeight: 500, maxWidth: 200 }}>
                      {row.indicator}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, color: C.textSecondary, whiteSpace: 'nowrap' }}>
                      {row.value}
                    </td>
                    <td style={{ padding: '8px 16px', borderBottom: `1px solid ${C.border}`, minWidth: 160 }}>
                      <input
                        type="text"
                        value={values[idx]}
                        onChange={e => setValues(prev => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Enter new value…"
                        style={INPUT}
                      />
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                        backgroundColor: SC[row.status] || C.blue,
                        boxShadow: `0 0 5px ${SC[row.status] || C.blue}55`,
                      }} />
                    </td>
                    <td style={{ padding: '8px 16px', borderBottom: `1px solid ${C.border}`, minWidth: 180 }}>
                      <input
                        type="text"
                        value={notesMap[idx]}
                        onChange={e => setNotesMap(prev => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Optional notes…"
                        style={{ ...INPUT, fontSize: 12 }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {dueRows.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: C.textSecondary, fontSize: 13 }}>
            No due indicators for this cadence.
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
          {draft && <span style={{ fontSize: 12, color: C.textSecondary, marginRight: 8 }}>Draft saved</span>}
          <button
            onClick={onClose}
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 6, border: `1px solid ${C.border}`, background: 'none', color: C.textSecondary, cursor: 'pointer' }}
          >Cancel</button>
          <button
            onClick={handleSaveDraft}
            style={{ padding: '8px 18px', fontSize: 13, borderRadius: 6, border: `1px solid ${C.border}`, background: 'none', color: C.textPrimary, cursor: 'pointer' }}
          >Save Draft</button>
          <button
            onClick={handleSubmitAll}
            style={{ padding: '8px 22px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: C.gold, color: '#111', fontWeight: 600, cursor: 'pointer' }}
          >Submit All</button>
        </div>
      </div>
    </div>
  )
}
