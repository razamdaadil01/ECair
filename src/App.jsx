// ─── App Shell ───────────────────────────────────────────────────────────────
// Main layout: fixed header + fixed sidebar + fixed alert strip + scrollable content

import { useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import AlertStrip from './components/AlertStrip.jsx'
import Overview from './components/Overview.jsx'
import Placeholder from './components/Placeholder.jsx'

// Navigation structure — tabs rendered in Sidebar
export const NAV = [
  { id: 'overview', label: 'Overview' },
  {
    id: 'strategic',
    label: 'Strategic Indicators',
    children: [
      { id: 'commercial', label: 'Commercial' },
      { id: 'finance', label: 'Finance' },
      { id: 'operations', label: 'Operations' },
      { id: 'fleet', label: 'Fleet' },
      { id: 'safety', label: 'Safety' },
    ],
  },
  {
    id: 'support',
    label: 'Support Functions',
    children: [
      { id: 'hr', label: 'HR' },
      { id: 'communication', label: 'Communication' },
      { id: 'legal', label: 'Legal' },
      { id: 'audit', label: 'Audit' },
      { id: 'travel', label: 'Travel' },
      { id: 'it', label: 'IT' },
      { id: 'product', label: 'Product & Service' },
      { id: 'procurement', label: 'Procurement' },
      { id: 'general', label: 'General Services' },
    ],
  },
  { id: 'risk', label: 'Risk Register' },
  { id: 'decisions', label: 'CEO Decisions' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')

  // ── Layout constants ────────────────────────────────────────────────────────
  const HEADER_H = 48   // px
  const ALERT_H  = 56   // px
  const SIDEBAR_W = 220 // px

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: '#070D1A' }}
    >
      {/* ── Fixed Left Sidebar ─────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 bottom-0 flex flex-col z-30"
        style={{ width: SIDEBAR_W, backgroundColor: '#0D1626', borderRight: '1px solid #1A2B45' }}
      >
        <Sidebar activeTab={activeTab} onNavigate={setActiveTab} />
      </div>

      {/* ── Right column (header + alert + content) ────────────────────────── */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: SIDEBAR_W }}
      >
        {/* Fixed Header */}
        <div
          className="fixed top-0 right-0 z-20 flex items-center"
          style={{
            left: SIDEBAR_W,
            height: HEADER_H,
            backgroundColor: '#0D1626',
            borderBottom: '1px solid #1A2B45',
          }}
        >
          <Header />
        </div>

        {/* Fixed Alert Strip */}
        <div
          className="fixed right-0 z-20"
          style={{
            left: SIDEBAR_W,
            top: HEADER_H,
            height: ALERT_H,
            backgroundColor: '#0D1626',
            borderBottom: '1px solid #1A2B45',
          }}
        >
          <AlertStrip />
        </div>

        {/* Scrollable main content */}
        <main
          className="flex-1 min-h-0 overflow-y-auto"
          style={{
            paddingTop: HEADER_H + ALERT_H,
            paddingBottom: 32,
            backgroundColor: '#070D1A',
          }}
        >
          {activeTab === 'overview' ? (
            <Overview />
          ) : (
            <Placeholder tab={activeTab} />
          )}
        </main>
      </div>
    </div>
  )
}
