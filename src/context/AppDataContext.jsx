// Shared state for risks and decisions (enables risk → decision escalation across pages)
import { createContext, useContext, useState } from 'react'

const INITIAL_RISKS = [
  { id: 'R1', name: 'Fleet Grounding Cascade',  category: 'Operations', prob: 4, impact: 5, owner: 'COO',  status: 'Open',      inDecision: true  },
  { id: 'R2', name: 'Fuel Price Spike (+30%)',   category: 'Finance',   prob: 3, impact: 4, owner: 'CFO',  status: 'Monitored', inDecision: true  },
  { id: 'R3', name: 'Key Partner Insolvency',    category: 'Commercial',prob: 2, impact: 4, owner: 'CCO',  status: 'Open',      inDecision: false },
  { id: 'R4', name: 'Regulatory Sanction',       category: 'Safety',    prob: 3, impact: 3, owner: 'CSO',  status: 'Mitigated', inDecision: true  },
  { id: 'R5', name: 'Staff Strike Action',       category: 'HR',        prob: 2, impact: 3, owner: 'CHRO', status: 'Monitored', inDecision: false },
  { id: 'R6', name: 'IT / Data Breach',          category: 'IT',        prob: 2, impact: 2, owner: 'CIO',  status: 'Mitigated', inDecision: false },
]

const INITIAL_PENDING = [
  {
    id: 'D-2025-14',
    title: 'Fleet Maintenance Contract Renewal',
    due: '2025-10-10',
    domain: 'Operations',
    status: 'Pending',
    options: [
      { label: 'Renew current supplier', note: '+8% rate increase, 24-month term' },
      { label: 'Switch to AeroCare MRO', note: 'Competitive rate, 3-month transition risk' },
      { label: 'Hybrid model', note: 'Keep line maintenance in-house, outsource heavy checks' },
    ],
    recommendation: 'Option 2 — AeroCare MRO offers a 12% cost saving vs renewal and has completed the pre-qualification audit. Transition risk is manageable with a 90-day parallel-run clause.',
    facts: ['Current contract expires 2025-11-30', 'Annual spend: $1.2M', 'AeroCare audit score: 94/100', '3 competing bids received'],
  },
  {
    id: 'D-2025-15',
    title: 'New Route: Brazzaville – Nairobi',
    due: '2025-10-15',
    domain: 'Commercial',
    status: 'Pending',
    options: [
      { label: 'Launch Q1 2026 (3× weekly)', note: 'Full committed slot at NBO, $480K pre-launch cost' },
      { label: 'Launch Q2 2026 (2× weekly)', note: 'Reduced capex, lower initial frequency' },
      { label: 'Defer to 2027', note: 'Avoids cash pressure, cedes first-mover advantage' },
    ],
    recommendation: 'Option 1 — Demand analysis shows 78% projected load factor in Month 3. Kenya Aviation Authority slot approval is valid only until Dec 2025; deferral forfeits the slot.',
    facts: ['Slot valid until 2025-12-31', 'Break-even: Month 5 at 72% LF', 'No direct competitor on route', 'Nairobi hub connects 11 onward destinations'],
  },
  {
    id: 'D-2025-16',
    title: 'HR Salary Review 2025',
    due: '2025-10-20',
    domain: 'HR',
    status: 'Pending',
    options: [
      { label: '4% across-the-board increase', note: 'Budget impact +$190K/yr, high staff approval' },
      { label: 'Merit-based 0–6%', note: 'Budget impact +$140–220K/yr, differentiated reward' },
      { label: 'Freeze salaries', note: 'No budget impact; high retention risk in current market' },
    ],
    recommendation: 'Option 2 — Merit-based increase aligns with the 2025–2028 HR strategy. The CHRO proposes 3% base + up to 3% merit. Retains top performers without blanket cost.',
    facts: ['Current total payroll: $4.7M/yr', 'Turnover rate: 11.4% (industry avg 9%)', 'Last increase: 2023 (2.5%)', 'Staff satisfaction score: 64/100'],
  },
]

const INITIAL_DECIDED = [
  { id: 'D-2025-11', title: 'Aircraft Wet Lease Extension — B737 YA-ECA', decided: '2025-09-15', outcome: 'Approved — 6-month extension at current rate' },
  { id: 'D-2025-12', title: 'IT Server Acquisition (Dual-Redundancy)',     decided: '2025-09-28', outcome: 'Approved — Budget $320K, procurement to begin Oct 2025' },
  { id: 'D-2025-13', title: 'Catering Supplier Change — International Routes', decided: '2025-10-01', outcome: 'Deferred — Additional cost-benefit analysis requested by CFO' },
]

const AppDataContext = createContext(null)

let riskCounter = INITIAL_RISKS.length + 1
let decisionCounter = 20

export function AppDataProvider({ children }) {
  const [risks, setRisks] = useState(INITIAL_RISKS)
  const [pending, setPending] = useState(INITIAL_PENDING)
  const [decided, setDecided] = useState(INITIAL_DECIDED)

  function addRisk(data) {
    const id = `R${riskCounter++}`
    const newRisk = { id, inDecision: false, ...data }
    setRisks(prev => [...prev, newRisk])
    return newRisk
  }

  function escalateRiskToDecisions(risk) {
    const id = `D-ESC-${decisionCounter++}`
    const score = risk.prob * risk.impact
    setPending(prev => [{
      id,
      title: `Risk Escalation: ${risk.name}`,
      due: risk.deadline || 'TBD',
      domain: risk.category,
      status: 'Pending',
      options: [
        { label: 'Immediate mitigation plan', note: 'Assign owner, timeline, and resources' },
        { label: 'Accept and monitor', note: 'Escalated monitoring frequency' },
        { label: 'Transfer risk', note: 'Insurance or contractual risk transfer' },
      ],
      recommendation: `Score ${score} (${risk.prob}×${risk.impact}). Immediate CEO decision required per escalation policy (scores ≥ 15).`,
      facts: [
        `Probability: ${risk.prob}/5 · Impact: ${risk.impact}/5`,
        `Risk Score: ${score}/25`,
        `Owner: ${risk.owner || 'TBD'}`,
        `Status: ${risk.status}`,
      ],
    }, ...prev])
    setRisks(prev => prev.map(r => r.id === risk.id ? { ...r, inDecision: true } : r))
  }

  function updateDecision(id, updates) {
    if (updates.newStatus === 'Decided') {
      const d = pending.find(p => p.id === id)
      if (d) {
        setPending(prev => prev.filter(p => p.id !== id))
        const today = new Date().toISOString().split('T')[0]
        setDecided(prev => [{ id: d.id, title: d.title, decided: today, outcome: updates.outcome || 'Decision recorded.' }, ...prev])
      }
    } else {
      setPending(prev => prev.map(p =>
        p.id === id ? { ...p, status: updates.newStatus, ...(updates.meetingDate ? { meetingDate: updates.meetingDate } : {}) } : p
      ))
    }
  }

  return (
    <AppDataContext.Provider value={{ risks, addRisk, escalateRiskToDecisions, pending, decided, updateDecision }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  return useContext(AppDataContext)
}
