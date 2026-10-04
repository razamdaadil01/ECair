# KPI Update Modal / Edit Icon Audit

**Date:** Oct 4, 2026  
**Branch:** claude/clever-allen-q3bawh

---

## 1. Every Edit Button Location

### Strategic Tabs — individual card modals

| # | File | Line | Component | KPI Updated |
|---|------|------|-----------|-------------|
| 1 | `CommercialTab.jsx` | 111 | `RevenueVarianceCard` | Revenue vs Budget Variance |
| 2 | `CommercialTab.jsx` | 138 | `ComplaintsCard` | Passenger Complaints |
| 3 | `CommercialTab.jsx` | 162 | `YieldCard` | Yield — Net Revenue per Passenger |
| 4 | `CommercialTab.jsx` | 184 | `SatisfactionCard` | Customer Satisfaction — NPS / CSAT |
| 5 | `FinanceTab.jsx` | 175 | `CashPositionCard` | Cash Position & 7-Day Forecast |
| 6 | `OperationsTab.jsx` | 115 | `OTPTodayCard` | On-Time Performance — Today |
| 7 | `FleetTab.jsx` | 131 | `TechReliabilityCard` | Technical Reliability — 7 Days |
| 8 | `FleetTab.jsx` | 148 | `UtilisationCard` | Fleet Utilisation Rate |
| 9 | `SafetyTab.jsx` | 76 | `IncidentsTodayCard` | Safety Incidents — Today |

**Cards with NO edit button (intentionally read-only):**
- `CommercialTab.jsx` — `LoadFactorCard` (complex per-route table)
- `OperationsTab.jsx` — `FlightsOperatedCard`, `UrgentDecisionsCard`, Weekly table
- `FleetTab.jsx` — `FleetStatusCard`, `FleetCompositionCard`
- `SafetyTab.jsx` — `TrainingCard`, `AOCCard`, `RollingIncidentsCard`, `AuditCard`
- `FinanceTab.jsx` — Weekly table section, Quarterly cards (read-only by design)

### Support Tabs — KPITable edit buttons (via `_shared.jsx`)

All 9 support tabs use `KPITable` from `_shared.jsx`, which renders a ✏️ button for every active row (rows where `value !== '—'`). The single `KPITable` component at `_shared.jsx:79` handles all of them.

| File | Line(s) | Cadence sections with edit buttons |
|------|---------|------------------------------------|
| `HRTab.jsx` | 62, 66 | Weekly, Monthly |
| `CommunicationTab.jsx` | 56, 60 | Weekly, Monthly |
| `LegalTab.jsx` | 66, 70, 74 | Weekly, Monthly, Quarterly |
| `AuditTab.jsx` | 53, 57 | Weekly, Monthly |
| `TravelTab.jsx` | 53, 57 | Weekly, Monthly |
| `ITTab.jsx` | 118, 122 | Weekly, Monthly |
| `ProductServiceTab.jsx` | 68, 72, 76 | Weekly, Monthly, Quarterly |
| `ProcurementTab.jsx` | 48, 52 | Weekly, Monthly |
| `GeneralServicesTab.jsx` | 54, 58 | Weekly, Monthly |

The ✏️ button is rendered at `_shared.jsx:125–133` inside `KPITable`, triggered by `onClick={() => setEditingRow(i)}`.

---

## 2. Correctness Check — Strategic Tab Edit Buttons

Each card creates a `row` object passed directly to `KPIUpdateModal`. The modal displays `row.indicator`, `row.value`, and `row.source` as read-only fields, and shows `period` as the reporting window.

| # | Component | KPI Name correct? | Current value correct? | Source correct? | Period correct? |
|---|-----------|------------------|----------------------|-----------------|-----------------|
| 1 | `RevenueVarianceCard` | ✅ "Revenue vs Budget Variance" | ✅ live state via `useState` | ✅ "Finance Dept. / Budget Controller" | ✅ "Week 41 / 2026" |
| 2 | `ComplaintsCard` | ✅ "Passenger Complaints" | ✅ live state via `useState` | ✅ "Customer Relations" | ✅ "Week 41 / 2026" |
| 3 | `YieldCard` | ✅ "Yield — Net Revenue per Passenger" | ✅ live state via `useState` | ✅ "Finance / Revenue Management" | ✅ "October 2026" |
| 4 | `SatisfactionCard` | ✅ "Customer Satisfaction — NPS / CSAT" | ✅ live state via `useState` | ✅ "Customer Relations / Survey" | ✅ "Q3 2026" |
| 5 | `CashPositionCard` | ✅ "Cash Position & 7-Day Forecast" | ✅ live state via `useState` | ✅ "Finance Dept. / Daily bank reconciliation" | ✅ "Daily" *(fixed)* |
| 6 | `OTPTodayCard` | ✅ "On-Time Performance — Today" | ✅ live state via `useState` | ✅ "Flight Operations Control" | ✅ "Daily" *(fixed)* |
| 7 | `TechReliabilityCard` | ✅ "Technical Reliability — 7 Days" | ✅ live state via `useState` | ✅ "Maintenance / MRO" | ✅ "Week 41 / 2026" |
| 8 | `UtilisationCard` | ✅ "Fleet Utilisation Rate" | ✅ live state via `useState` | ✅ "MCC / Network Planning" | ✅ "Week 41 / 2026" |
| 9 | `IncidentsTodayCard` | ✅ "Safety Incidents — Today" | ✅ live state via `useState` | ✅ "SMS / SGS register" | ✅ "Daily" *(fixed)* |

---

## 3. KPIUpdateModal Component Inspection

**File:** `src/components/forms/KPIUpdateModal.jsx`

**Props interface:**
```
{ row, rowIndex, onClose, onSubmit, period = 'Current Period' }
```

**What the modal receives and displays:**

| Prop | Source | Displayed as |
|------|--------|-------------|
| `row.indicator` | passed by caller | Read-only field: KPI name |
| `row.value` | passed by caller | Pre-filled in the editable input |
| `row.source` | passed by caller | Read-only field: data source |
| `period` | passed by caller | Read-only field: reporting period |
| `rowIndex` | passed by caller | Used only in `onSubmit(rowIndex, newValue)` callback |

The modal does NOT hardcode any content — it correctly renders whatever it receives. The bugs are all in the callers, not the modal itself.

**`row` object shape required:**
- `row.indicator` — string (KPI display name)
- `row.value` — string (current value, pre-fills the input)
- `row.source` — string (data source label)

All strategic tab callers and all `_shared.jsx` KPITable row objects supply these three fields correctly.

---

## 4. Bugs Found

### Bug #1 — ~~CRITICAL~~ **FIXED** (Oct 04, 2026): `_shared.jsx` KPITable never passes `period` to KPIUpdateModal

**Location:** `src/components/support/_shared.jsx:143–152`

**Fix applied:** `_shared.jsx` — `KPITable` now accepts `period` prop and forwards it to `KPIUpdateModal`. All 20 call sites across 9 support tab files updated with correct period strings (`"Week 41 / 2026"`, `"October 2026"`, `"Q4 2026"`).

---

### Bug #2 — ~~MINOR~~ **FIXED** (Oct 04, 2026): Finance, Operations, Safety daily cards use a specific calendar date as `period`

**Fix applied:** All three daily cards now pass `period="Daily"` — consistent with the cadence label pattern used across the rest of the app.

- `FinanceTab.jsx` — `CashPositionCard`: `"Oct 4, 2026"` → `"Daily"`
- `OperationsTab.jsx` — `OTPTodayCard`: `"Oct 4, 2026"` → `"Daily"`
- `SafetyTab.jsx` — `IncidentsTodayCard`: `"Oct 4, 2026"` → `"Daily"`

---

## 5. Suggested Fix Approach

### Fix for Bug #1 — Add `period` prop to `KPITable`

**Step 1:** Update `KPITable`'s props to accept `period`:
```jsx
// _shared.jsx
export function KPITable({ rows, onUpdateRow, period }) {
  ...
  {editingRow !== null && (
    <KPIUpdateModal
      row={rows[editingRow]}
      rowIndex={editingRow}
      onClose={() => setEditingRow(null)}
      onSubmit={(idx, newValue) => { onUpdateRow(idx, newValue); setEditingRow(null) }}
      period={period}          // ← add this
    />
  )}
```

**Step 2:** Each support tab already renders separate `KPITable` instances per cadence section. Pass the appropriate period string at each call site. Example for `HRTab.jsx`:
```jsx
<KPITable rows={weekly}    onUpdateRow={updateWeeklyRow}    period="Week 41 / 2026" />
<KPITable rows={monthly}   onUpdateRow={updateMonthlyRow}   period="October 2026" />
```

This requires passing one extra string prop at each of the 20 call sites. If the period strings are centralized (e.g., `const CURRENT_WEEK = 'Week 41 / 2026'`), they only need to be updated in one place.

---

### Fix for Bug #2 — Replace hardcoded dates with cadence labels

Replace the three `period="Oct 4, 2026"` instances with descriptive labels consistent with the rest of the app:

| File | Component | Current | Suggested |
|------|-----------|---------|-----------|
| `FinanceTab.jsx:188` | `CashPositionCard` | `"Oct 4, 2026"` | `"Daily"` or `"Oct 4, 2026 — Daily"` |
| `OperationsTab.jsx:127` | `OTPTodayCard` | `"Oct 4, 2026"` | `"Daily"` or `"Oct 4, 2026 — Daily"` |
| `SafetyTab.jsx:92` | `IncidentsTodayCard` | `"Oct 4, 2026"` | `"Daily"` or `"Oct 4, 2026 — Daily"` |

Alternatively, keep the specific date format but make it consistent: `"Daily — Oct 4, 2026"` mirrors the CommercialTab pattern of `"Week 41 / 2026"` (cadence context + time reference).

---

## Summary

| Bug | Severity | Files affected | Status |
|-----|----------|---------------|--------|
| `_shared.jsx` KPITable missing `period` prop | High | `_shared.jsx` + 9 support tab files (20 call sites) | ✅ Fixed Oct 04, 2026 |
| Daily strategic cards use specific date not cadence label | Low | `FinanceTab.jsx`, `OperationsTab.jsx`, `SafetyTab.jsx` | ✅ Fixed Oct 04, 2026 |

**No bugs in KPIUpdateModal itself** — the component correctly renders whatever it receives. All `row` objects (indicator, value, source) are passed correctly by all callers.
