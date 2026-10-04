import { useToast } from '../../context/ToastContext.jsx'

const TYPE_STYLE = {
  success: { bg: 'var(--status-green)',  icon: '✓' },
  warning: { bg: 'var(--status-amber)',  icon: '⚠' },
  error:   { bg: 'var(--status-red)',    icon: '✕' },
  info:    { bg: 'var(--status-blue)',   icon: 'ℹ' },
}

export default function Toast() {
  const { toasts } = useToast()

  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map(t => {
        const ts = TYPE_STYLE[t.type] || TYPE_STYLE.info
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 16px',
            backgroundColor: ts.bg,
            color: '#fff',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            animation: 'toast-slide-in 0.22s ease',
            maxWidth: 380,
            minWidth: 240,
            pointerEvents: 'auto',
          }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>{ts.icon}</span>
            <span>{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
