import { createContext, useContext, useState } from 'react'

export const ROLES = {
  CEO: {
    id: 'CEO',
    label: 'CEO',
    color: '#C9A84C',
    initials: 'CEO',
    permissions: [
      'strategicCommercial', 'strategicFinance', 'strategicOperations', 'strategicFleet', 'strategicSafety',
      'supportHR', 'supportCommunication', 'supportLegal', 'supportAudit', 'supportTravel',
      'supportIT', 'supportProduct', 'supportProcurement', 'supportGeneral',
      'riskRegister', 'ceoDecisions',
    ],
  },
  FINANCE_TEAM: {
    id: 'FINANCE_TEAM',
    label: 'Finance Team',
    color: '#3B82F6',
    initials: 'FIN',
    permissions: ['strategicFinance'],
  },
  COMMERCIAL_TEAM: {
    id: 'COMMERCIAL_TEAM',
    label: 'Commercial Team',
    color: '#8B5CF6',
    initials: 'COM',
    permissions: ['strategicCommercial'],
  },
  OPS_TEAM: {
    id: 'OPS_TEAM',
    label: 'Operations Team',
    color: '#06B6D4',
    initials: 'OPS',
    permissions: ['strategicOperations', 'strategicFleet', 'strategicSafety', 'riskRegister'],
  },
  MCC_TECHNICAL: {
    id: 'MCC_TECHNICAL',
    label: 'MCC / Technical',
    color: '#F59E0B',
    initials: 'MCC',
    permissions: ['strategicFleet'],
  },
  SAFETY_OFFICER: {
    id: 'SAFETY_OFFICER',
    label: 'Safety Officer',
    color: '#EF4444',
    initials: 'SAF',
    permissions: ['strategicSafety'],
  },
  DEPARTMENT_HEAD: {
    id: 'DEPARTMENT_HEAD',
    label: 'Department Head',
    color: '#10B981',
    initials: 'DH',
    permissions: [],
  },
  EXECUTIVE_MGMT: {
    id: 'EXECUTIVE_MGMT',
    label: 'Executive Management',
    color: '#EC4899',
    initials: 'EX',
    permissions: [
      'strategicCommercial', 'strategicFinance', 'strategicOperations', 'strategicFleet', 'strategicSafety',
      'riskRegister', 'ceoDecisions',
    ],
  },
  ADMIN: {
    id: 'ADMIN',
    label: 'Admin',
    color: '#6B7280',
    initials: 'ADM',
    permissions: [
      'strategicCommercial', 'strategicFinance', 'strategicOperations', 'strategicFleet', 'strategicSafety',
      'supportHR', 'supportCommunication', 'supportLegal', 'supportAudit', 'supportTravel',
      'supportIT', 'supportProduct', 'supportProcurement', 'supportGeneral',
      'riskRegister', 'ceoDecisions',
    ],
  },
}

export const DEPARTMENTS = [
  'HR', 'Communication', 'Legal', 'Audit', 'Travel',
  'IT', 'Product & Service', 'Procurement', 'General Services',
]

const DEPT_PERMISSION_MAP = {
  'HR': 'supportHR',
  'Communication': 'supportCommunication',
  'Legal': 'supportLegal',
  'Audit': 'supportAudit',
  'Travel': 'supportTravel',
  'IT': 'supportIT',
  'Product & Service': 'supportProduct',
  'Procurement': 'supportProcurement',
  'General Services': 'supportGeneral',
}

const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try { return localStorage.getItem('ecair-role') || 'CEO' } catch { return 'CEO' }
  })
  const [activeDepartment, setActiveDeptState] = useState(() => {
    try { return localStorage.getItem('ecair-dept') || 'HR' } catch { return 'HR' }
  })

  function setRole(r) {
    setRoleState(r)
    try { localStorage.setItem('ecair-role', r) } catch {}
  }
  function setActiveDepartment(dept) {
    setActiveDeptState(dept)
    try { localStorage.setItem('ecair-dept', dept) } catch {}
  }

  function canEdit(permission) {
    if (role === 'DEPARTMENT_HEAD') {
      return DEPT_PERMISSION_MAP[activeDepartment] === permission
    }
    return (ROLES[role]?.permissions || []).includes(permission)
  }

  return (
    <RoleContext.Provider value={{ role, activeDepartment, setRole, setActiveDepartment, canEdit }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used inside RoleProvider')
  return ctx
}
