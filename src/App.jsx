// ─── App Shell ───────────────────────────────────────────────────────────────
// Main layout: fixed header + fixed sidebar + fixed alert strip + scrollable content

import { useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import AlertStrip from './components/AlertStrip.jsx'
import Overview from './components/Overview.jsx'
import CommercialTab from './components/strategic/CommercialTab.jsx'
import FinanceTab from './components/strategic/FinanceTab.jsx'
import OperationsTab from './components/strategic/OperationsTab.jsx'
import FleetTab from './components/strategic/FleetTab.jsx'
import SafetyTab from './components/strategic/SafetyTab.jsx'
import HRTab from './components/support/HRTab.jsx'
import CommunicationTab from './components/support/CommunicationTab.jsx'
import LegalTab from './components/support/LegalTab.jsx'
import AuditTab from './components/support/AuditTab.jsx'
import TravelTab from './components/support/TravelTab.jsx'
import ITTab from './components/support/ITTab.jsx'
import ProductServiceTab from './components/support/ProductServiceTab.jsx'
import ProcurementTab from './components/support/ProcurementTab.jsx'
import GeneralServicesTab from './components/support/GeneralServicesTab.jsx'
import RiskRegister from './components/RiskRegister.jsx'
import CEODecisions from './components/CEODecisions.jsx'
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
      style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Fixed Left Sidebar ─────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 bottom-0 flex flex-col z-30"
        style={{ width: SIDEBAR_W, backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}
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
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
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
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
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
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          {activeTab === 'overview'    ? <Overview />      :
           activeTab === 'commercial' ? <CommercialTab />  :
           activeTab === 'finance'    ? <FinanceTab />     :
           activeTab === 'operations' ? <OperationsTab />  :
           activeTab === 'fleet'      ? <FleetTab />            :
           activeTab === 'safety'     ? <SafetyTab />           :
           activeTab === 'hr'         ? <HRTab />               :
           activeTab === 'communication' ? <CommunicationTab /> :
           activeTab === 'legal'      ? <LegalTab />            :
           activeTab === 'audit'      ? <AuditTab />            :
           activeTab === 'travel'     ? <TravelTab />           :
           activeTab === 'it'         ? <ITTab />               :
           activeTab === 'product'    ? <ProductServiceTab />   :
           activeTab === 'procurement' ? <ProcurementTab />     :
           activeTab === 'general'    ? <GeneralServicesTab />  :
           activeTab === 'risk'       ? <RiskRegister />        :
           activeTab === 'decisions'  ? <CEODecisions />        :
           <Placeholder tab={activeTab} />}
        </main>
      </div>
    </div>
  )
}
