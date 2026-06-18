# React Native Expo — Finance Dashboard: Complete Build Instructions

Hand these instructions to an AI code generator (Claude, GPT-4, Cursor, etc.) in the **exact order listed**. Build one step at a time. Do not combine steps.

---

## Project Context

You are building a **personal finance dashboard** in React Native Expo. The app tracks credit cards, bank accounts, cash, payables, and receivables. The dashboard is the home screen. Everything is written in **TypeScript**.

---

## Tech Stack & Versions (do not deviate)

| Package | Version | Notes |
|---|---|---|
| Expo SDK | `~56.0.0` | React Native 0.85, React 19.2 |
| React Native | `0.85.3` | Auto-resolved by Expo |
| React | `19.2.3` | Auto-resolved by Expo |
| `react-native-reanimated` | `~4.3.1` | v4 — no Babel plugin entry needed, handled by babel-preset-expo |
| `react-native-worklets` | `~0.8.3` | **Required new peer dep for Reanimated 4.3+** — must install separately |
| `react-native-gesture-handler` | `~2.31.1` | — |
| `react-native-safe-area-context` | `~5.7.0` | — |
| `react-native-screens` | `~4.25.2` | — |
| `@expo/ui` | bundled with SDK 56 | Used for BottomSheet (drop-in for @gorhom/bottom-sheet) |
| `expo-linear-gradient` | latest via `npx expo install` | For gradient banners |
| `@react-native-vector-icons/material-design-icons` | latest | Replaces deprecated @expo/vector-icons — see Icons section |
| `nativewind` | `@preview` (v5) | Tailwind v4 CSS-first config — see NativeWind section |
| `react-native-css` | `@latest` | Required peer dep for NativeWind v5 |
| `tailwindcss` | `^4.1.0` (dev) | — |
| `@tailwindcss/postcss` | latest (dev) | — |
| `postcss` | latest (dev) | — |
| `@expo-google-fonts/dm-sans` | latest | — |
| `expo-font` | latest | — |

---

## Project Initialization

### Start fresh:

```bash
npx create-expo-app@latest finance-app --template default@sdk-56
cd finance-app
```

### Install all dependencies:

```bash
# Core runtime deps (use npx expo install — it pins correct versions for SDK 56)
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler react-native-safe-area-context react-native-screens expo-linear-gradient @expo-google-fonts/dm-sans expo-font

# Icons (new scoped packages — @expo/vector-icons is deprecated in SDK 56)
npm install @react-native-vector-icons/material-design-icons

# NativeWind v5 + Tailwind v4
npx expo install nativewind@preview react-native-css@latest react-native-safe-area-context
npm install --save-dev tailwindcss @tailwindcss/postcss postcss
```

> **Note:** `@expo/ui` ships bundled with Expo SDK 56. No separate install needed for BottomSheet.

---

## Critical SDK 56 Rules (the AI must follow all of these)

### 1. New Architecture Only
SDK 56 dropped Old Architecture. In `app.json`, ensure:
```json
{
  "expo": {
    "newArchEnabled": true
  }
}
```

### 2. Reanimated v4 — No Babel Plugin Entry
Do NOT add `react-native-reanimated/plugin` to `babel.config.js`. It is automatically configured by `babel-preset-expo` in SDK 56. Adding it manually causes a "Duplicate plugin" error.

`babel.config.js` should simply be:
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

### 3. react-native-worklets is a required separate install
Reanimated 4.3 split worklets into its own package. If `react-native-worklets` is missing, the app will fail to bundle with a cryptic error. It must appear in `package.json` as a direct dependency.

### 4. BottomSheet — use @expo/ui drop-in, NOT @gorhom/bottom-sheet
SDK 56 ships a native BottomSheet via `@expo/ui` that is API-compatible with `@gorhom/bottom-sheet`. Import from:
```ts
import { BottomSheet, BottomSheetModal, BottomSheetView, BottomSheetScrollView } from '@expo/ui/community/bottom-sheet';
```
Do NOT install or import from `@gorhom/bottom-sheet`. `GestureHandlerRootView` is **not required** by this implementation (though it can be left in place if needed elsewhere).

**Known SDK 56 issue:** `BottomSheetModal` with multiple snap points crashes on Android (`partialExpand handler not registered`). **Workaround:** Use `BottomSheet` (not Modal variant) with `initialIndex={-1}` to start closed, and call `ref.current?.expand()` to open. Do not use more than one snap point per sheet.

### 5. Icons — use @react-native-vector-icons
`@expo/vector-icons` is deprecated in SDK 56. Use the new scoped package:
```ts
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
// Usage:
<MaterialCommunityIcons name="credit-card-outline" size={20} color="#3B5BF6" />
```

### 6. NativeWind v5 setup
NativeWind v5 uses Tailwind v4's CSS-first config (no `tailwind.config.js` file). Instead, use `global.css`:

**`global.css`:**
```css
@import "tailwindcss";
@import "nativewind/theme";

@theme {
  --color-bg: #F6F7FB;
  --color-surface: #FFFFFF;
  --color-surface2: #F0F1F6;
  --color-border: #E8E9F0;
  --color-text1: #0D0E14;
  --color-text2: #5C5F72;
  --color-text3: #9EA2B3;
  --color-blue: #3B5BF6;
  --color-green: #16A34A;
  --color-red: #DC2626;
  --color-amber: #D97706;
  --color-teal: #0D9488;
}
```

**`postcss.config.mjs`:**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**`metro.config.js`:**
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withNativewind(config);
```

**In `App.tsx`** — import global.css at the top:
```ts
import "./global.css";
```

**Remove** any `nativewind` entry from `babel.config.js` — NativeWind v5 no longer uses a Babel plugin.

### 7. `expo-font` / useFonts pattern (React 19 compatible)
```ts
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold, DMSans_800ExtraBold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({ DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold, DMSans_800ExtraBold });

  useEffect(() => {
    if (fontsLoaded || error) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <DashboardScreen />;
}
```

### 8. TouchableOpacity → Pressable
In React Native 0.85 / New Architecture, prefer `Pressable` over `TouchableOpacity`. Use:
```tsx
<Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
```
Where `pressed` style is `{ opacity: 0.75 }`.

### 9. No inline StyleSheet mixing with NativeWind
Either use NativeWind `className` props OR `StyleSheet.create` — do not mix on the same element. For complex gradient containers that need `StyleSheet`, skip `className` and use the style prop directly.

### 10. expo-linear-gradient import
```ts
import { LinearGradient } from 'expo-linear-gradient';
```

---

## Design Tokens

### File: `src/constants/colors.ts`

```ts
export const Colors = {
  bg:        '#F6F7FB',
  surface:   '#FFFFFF',
  surface2:  '#F0F1F6',
  border:    '#E8E9F0',
  text1:     '#0D0E14',
  text2:     '#5C5F72',
  text3:     '#9EA2B3',

  blue:      '#3B5BF6',
  blueDim:   '#EEF1FF',
  green:     '#16A34A',
  greenDim:  '#DCFCE7',
  red:       '#DC2626',
  redDim:    '#FEE2E2',
  amber:     '#D97706',
  amberDim:  '#FEF3C7',
  purple:    '#7C3AED',
  purpleDim: '#EDE9FE',
  teal:      '#0D9488',
  tealDim:   '#CCFBF1',

  // Gradient arrays for expo-linear-gradient
  ccGrad:     ['#1e3a5f', '#2563EB'] as const,
  bankGrad:   ['#064e3b', '#059669'] as const,
  cashGrad:   ['#451a03', '#D97706'] as const,
  payGrad:    ['#450a0a', '#DC2626'] as const,
  recGrad:    ['#14532d', '#16A34A'] as const,
};
```

### Typography Rules

- Font family: `DMSans_400Regular`, `DMSans_500Medium`, `DMSans_600SemiBold`, `DMSans_700Bold`, `DMSans_800ExtraBold`
- Large amounts: size 20–22, weight 800, letterSpacing: -0.5
- Section titles: size 12, weight 700, letterSpacing: 1, uppercase, color text3
- Row titles: size 15, weight 600, color text1
- Meta lines: size 12, weight 500, color text2 or text3
- Sheet titles: size 17, weight 700

---

## Mock Data

### File: `src/data/mockData.ts`

```ts
// ── Budget ──────────────────────────────────────────
export const budgetData = {
  month: 'June 2026',
  spent: 32000,
  total: 50000,
  income: 45000,
  savings: 13000,
};

// ── Credit Cards ─────────────────────────────────────
export type DueStatus = 'overdue' | 'urgent' | 'normal' | 'none';

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  maskedNumber: string;
  gradientColors: readonly [string, string];
  limit: number;
  cycleStartDay: number;
  cycleEndDay: number;
  currentSpend: number;
  billingDaysRemaining: number;
  statement: {
    billedAmount: number;
    minPayment: number;
    dueDate: string;
    dueDateLabel: string;
    dueStatus: DueStatus;
  } | null;
}

export const creditCards: CreditCard[] = [
  {
    id: 'hdfc',
    name: 'HDFC Regalia',
    bank: 'HDFC Bank',
    maskedNumber: '•••• •••• •••• 4242',
    gradientColors: ['#1e3a5f', '#2563EB'],
    limit: 100000,
    cycleStartDay: 1,
    cycleEndDay: 30,
    currentSpend: 4200,
    billingDaysRemaining: 12,
    statement: {
      billedAmount: 8200,
      minPayment: 820,
      dueDate: '2026-06-21',
      dueDateLabel: 'Due in 3 days',
      dueStatus: 'urgent',
    },
  },
  {
    id: 'sbi',
    name: 'SBI SimplyCLICK',
    bank: 'State Bank of India',
    maskedNumber: '•••• •••• •••• 7890',
    gradientColors: ['#1e3a5f', '#7C3AED'],
    limit: 50000,
    cycleStartDay: 5,
    cycleEndDay: 4,
    currentSpend: 2100,
    billingDaysRemaining: 18,
    statement: {
      billedAmount: 5600,
      minPayment: 560,
      dueDate: '2026-06-28',
      dueDateLabel: 'Due on 28 Jun',
      dueStatus: 'normal',
    },
  },
  {
    id: 'icici',
    name: 'ICICI Amazon Pay',
    bank: 'ICICI Bank',
    maskedNumber: '•••• •••• •••• 1234',
    gradientColors: ['#1e3a5f', '#0D9488'],
    limit: 75000,
    cycleStartDay: 10,
    cycleEndDay: 9,
    currentSpend: 0,
    billingDaysRemaining: 22,
    statement: null, // No bill yet — hidden from Billed tab
  },
];

// ── Bank Accounts ─────────────────────────────────────
export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  accountType: string;
  maskedNumber: string;
  ifsc: string;
  gradientColors: readonly [string, string];
  balance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
}

export const bankAccounts: BankAccount[] = [
  {
    id: 'sbi_savings',
    name: 'SBI Savings',
    bank: 'State Bank of India',
    accountType: 'Savings',
    maskedNumber: '•••••••• 4521',
    ifsc: 'SBIN0001234',
    gradientColors: ['#064e3b', '#059669'],
    balance: 100000,
    monthlyInflow: 28500,
    monthlyOutflow: 18200,
  },
  {
    id: 'pnb_current',
    name: 'PNB Current',
    bank: 'Punjab National Bank',
    accountType: 'Current',
    maskedNumber: '•••••••• 9900',
    ifsc: 'PUNB0001234',
    gradientColors: ['#14532d', '#15803d'],
    balance: 45000,
    monthlyInflow: 12000,
    monthlyOutflow: 8500,
  },
];

// ── Cash ──────────────────────────────────────────────
export const cashData = {
  balance: 2500,
  lastUpdated: 'Today, 9:30 AM',
  monthlyIn: 5000,
  monthlyOut: 2500,
};

// ── Parties (Payable + Receivable) ────────────────────
export interface PartyEntry {
  date: string;
  label: string;
  gave: number;
  took: number;
}

export interface Party {
  id: string;
  name: string;
  avatarColor: string;
  avatarInitial: string;
  meta: string;
  netBalance: number; // positive = receivable, negative = payable
  badgeLabel: string;
  badgeType: 'overdue' | 'soon' | 'ok';
  history: PartyEntry[];
}

export const parties: Party[] = [
  {
    id: 'ramesh',
    name: 'Ramesh Kumar',
    avatarColor: '#7C3AED',
    avatarInitial: 'R',
    meta: 'Personal Loan',
    netBalance: -15000,
    badgeLabel: 'Due Mar 1',
    badgeType: 'soon',
    history: [{ date: '2025-12-01', label: 'Borrowed', gave: 0, took: 15000 }],
  },
  {
    id: 'suresh_store',
    name: 'Suresh General Store',
    avatarColor: '#EA580C',
    avatarInitial: 'S',
    meta: 'Shop Credit',
    netBalance: -8000,
    badgeLabel: 'Overdue ⚠',
    badgeType: 'overdue',
    history: [{ date: '2026-01-10', label: 'Credit purchase', gave: 0, took: 8000 }],
  },
  {
    id: 'amit',
    name: 'Amit Singh',
    avatarColor: '#0284c7',
    avatarInitial: 'A',
    meta: 'Personal Loan',
    netBalance: 7500,
    badgeLabel: 'Collecting Mar',
    badgeType: 'ok',
    history: [{ date: '2026-01-10', label: 'Lent', gave: 7500, took: 0 }],
  },
  {
    id: 'rahul',
    name: 'Rahul Verma',
    avatarColor: '#059669',
    avatarInitial: 'R',
    meta: 'Personal Loan',
    netBalance: 5000,
    badgeLabel: 'Due Feb 28',
    badgeType: 'soon',
    history: [{ date: '2026-02-02', label: 'Lent', gave: 5000, took: 0 }],
  },
  {
    id: 'abc_company',
    name: 'ABC Company',
    avatarColor: '#2563EB',
    avatarInitial: 'A',
    meta: 'Salary',
    netBalance: 28500,
    badgeLabel: 'June pending',
    badgeType: 'soon',
    history: [{ date: '2026-05-01', label: 'Salary received', gave: 28500, took: 0 }],
  },
];

// ── Computed summaries ─────────────────────────────────
export const accountSummary = {
  creditCards: {
    count: creditCards.length,
    totalDue: creditCards.reduce((s, c) => s + (c.statement?.billedAmount ?? 0), 0),
    recentSpend: creditCards.reduce((s, c) => s + c.currentSpend, 0),
    hasUrgent: creditCards.some(c => c.statement?.dueStatus === 'urgent' || c.statement?.dueStatus === 'overdue'),
    urgentLabel: creditCards.find(c => c.statement?.dueStatus === 'urgent' || c.statement?.dueStatus === 'overdue')?.statement?.dueDateLabel ?? null,
  },
  banks: {
    count: bankAccounts.length,
    totalBalance: bankAccounts.reduce((s, b) => s + b.balance, 0),
    monthlyInflow: bankAccounts.reduce((s, b) => s + b.monthlyInflow, 0),
  },
  cash: {
    balance: cashData.balance,
    lastUpdated: cashData.lastUpdated,
  },
  payable: {
    count: parties.filter(p => p.netBalance < 0).length,
    total: Math.abs(parties.filter(p => p.netBalance < 0).reduce((s, p) => s + p.netBalance, 0)),
    hasOverdue: parties.some(p => p.netBalance < 0 && p.badgeType === 'overdue'),
  },
  receivable: {
    count: parties.filter(p => p.netBalance > 0).length,
    total: parties.filter(p => p.netBalance > 0).reduce((s, p) => s + p.netBalance, 0),
    hasSoon: parties.some(p => p.netBalance > 0 && p.badgeType === 'soon'),
  },
};
```

---

## Utility

### File: `src/utils/format.ts`

```ts
export const formatINR = (n: number): string =>
  '₹' + n.toLocaleString('en-IN');
```

---

## Step 1 — Budget Card Component

### File: `src/components/BudgetCard.tsx`

**What it shows:**
- Eyebrow label: `"JUNE 2026 BUDGET"` (uppercase, size 10, text3)
- Spent in red (size 20, weight 800) + slash + total in teal (size 14, weight 600)
- Progress bar: `width = (spent/total * 100)%`, LinearGradient fill `['#DC2626', '#F97316']`, height 8, borderRadius 99, bg surface2
- Below bar: `"64% used"` left in red, `"₹18,000 left"` right in teal, size 11, weight 600
- Horizontal divider
- 3-column stat row: Income (green) | Spent (red) | Saved (blue) — each with size 10 label and size 14 weight 700 value
- Columns separated by 1px vertical border lines

**Layout:** bg surface, border border-color, borderRadius 16, padding 16, marginHorizontal 16, marginBottom 20

**Props:** `data: typeof budgetData`

---

## Step 2 — Account Row Component

### File: `src/components/accounts/AccountRow.tsx`

Reusable tappable row for all 5 account types.

**Layout:**
```
[Icon box 40x40]  [Title text]              [Right label]
                  [Meta line 1 + badge]
                  [Meta line 2 optional]    [Chevron]
```

**Props:**
```ts
interface AccountRowProps {
  iconName: string;           // @react-native-vector-icons/material-design-icons name
  iconBgColor: string;
  iconColor: string;
  title: string;
  rightLabel: string;
  rightColor?: string;
  meta1: string;
  meta2?: string;
  badgeText?: string;
  badgeType?: 'overdue' | 'soon' | 'ok';
  onPress: () => void;
}
```

**Badge colors:**
- overdue: bg `Colors.redDim`, text `Colors.red`
- soon: bg `Colors.amberDim`, text `Colors.amber`
- ok: bg `Colors.greenDim`, text `Colors.green`

**Styling:**
- Use `Pressable` with `({ pressed }) => pressed && { opacity: 0.75 }`
- bg surface, borderRadius 14, padding 14, marginHorizontal 16, marginBottom 8
- Chevron: MaterialCommunityIcons `chevron-right`, color text3, size 18, aligned far right

---

## Step 3 — Accounts Section Component

### File: `src/components/accounts/AccountsSection.tsx`

**Net worth** = `banks.totalBalance + cash.balance + receivable.total - payable.total`

**Section header:** `"ACCOUNTS"` left (uppercase, size 12, weight 700, text3) + net worth right (size 12, weight 700, text2). paddingHorizontal 20, paddingBottom 10.

**Row configurations:**

**Credit Cards:**
- iconName: `credit-card-outline`, iconBgColor: `Colors.blueDim`, iconColor: `Colors.blue`
- title: `Credit Cards`, rightLabel: `{count} cards`
- meta1: `Recent ₹{recentSpend}  •  Due ₹{totalDue}`
- meta2: urgentLabel if hasUrgent
- badgeText: `Urgent` + badgeType `overdue` if hasUrgent

**Bank Accounts:**
- iconName: `bank-outline`, iconBgColor: `Colors.greenDim`, iconColor: `Colors.green`
- title: `Bank Accounts`, rightLabel: `formatINR(totalBalance)`, rightColor: `Colors.green`
- meta1: `{count} accounts  •  +{formatINR(monthlyInflow)} this month`

**Cash:**
- iconName: `cash`, iconBgColor: `Colors.amberDim`, iconColor: `Colors.amber`
- title: `Cash`, rightLabel: `formatINR(balance)`, rightColor: `Colors.amber`
- meta1: `Updated {lastUpdated}`

**Payable:**
- iconName: `arrow-up-circle-outline`, iconBgColor: `Colors.redDim`, iconColor: `Colors.red`
- title: `Payable`, rightLabel: `formatINR(total)`, rightColor: `Colors.red`
- meta1: `{count} parties`
- badgeText: `⚠ Overdue`, badgeType: `overdue` if hasOverdue

**Receivable:**
- iconName: `arrow-down-circle-outline`, iconBgColor: `Colors.greenDim`, iconColor: `Colors.green`
- title: `Receivable`, rightLabel: `formatINR(total)`, rightColor: `Colors.green`
- meta1: `{count} people`
- badgeText: `Due soon`, badgeType: `soon` if hasSoon

**Props:**
```ts
interface AccountsSectionProps {
  onCreditCardPress: () => void;
  onBankPress: () => void;
  onCashPress: () => void;
  onPayablePress: () => void;
  onReceivablePress: () => void;
}
```

---

## Step 4 — Credit Card Bottom Sheet

### File: `src/components/bottomsheets/CreditCardSheet.tsx`

**Import:**
```ts
import { BottomSheet, BottomSheetScrollView } from '@expo/ui/community/bottom-sheet';
```

Use a single `snapPoints={['85%']}` and `initialIndex={-1}`. Expose a `ref` so the parent can call `.expand()`.

**Structure:**
```
Drag handle (36x4, surface2, radius 99, centered)
Credit Cards                          [✕ close]
────────────────────────────────────────────────
[ Billed ]  [ Recent ]    ← tab toggle
────────────────────────────────────────────────
<BottomSheetScrollView>
  {card items per active tab}
  [+ Add Credit Card] button
</BottomSheetScrollView>
```

**Tab toggle:** two buttons in a surface2 container, borderRadius 10, padding 3, height 44. Active: bg white, shadow, radius 8, weight 700, text1. Inactive: transparent, text3, weight 500.

---

### Billed Tab — Card Item

Show only cards where `statement !== null`. If none, show: `"No bills generated yet."` (centered, text3, size 14).

Each card:
```
[LinearGradient icon 36x36, radius 8]   HDFC Regalia
                                         HDFC Bank

Billed          ₹8,200      [Due in 3 days badge]
Min Payment     ₹820

[ Transactions ]    [ Pay Now ]
```

**Due label colors:**
- `overdue` → red text, redDim bg badge
- `urgent` → amber text, amberDim bg badge
- `normal` → text2, no badge bg

**Buttons:** `Transactions` = surface2 bg, text1 text. `Pay Now` = blue bg, white text.

Fires: `onViewBilledTransactions(cardId)` and `onPayNow(cardId)`.

---

### Recent Tab — Card Item

Show ALL cards including `statement === null`.

Each card:
```
[LinearGradient icon 36x36]    ICICI Amazon Pay
                                ICICI Bank

Spent this cycle    ₹0
Billing cycle       10th – 9th of month
Days remaining      22 days

[ Transactions ]    [ Add Expense ]
```

**Days remaining color:** ≤5 → red, 6–10 → amber, >10 → text2

Fires: `onViewRecentTransactions(cardId)` and `onAddExpense(cardId)`.

**`+ Add Credit Card`** button at the bottom (both tabs): dashed border, surface2 bg, blue text, full width, radius 12, fires `onAddCard()`.

---

## Step 5 — Bank Accounts Bottom Sheet

### File: `src/components/bottomsheets/BankSheet.tsx`

`snapPoints={['85%']}`, `initialIndex={-1}`

**Structure:**
```
[handle]
Bank Accounts                 [✕]
Total Balance  ₹1,45,000 (green, size 22, weight 800)
────────────────────────────────
<BottomSheetScrollView>
  {each bank as a card}
  [+ Add Bank Account]
</BottomSheetScrollView>
```

**Each bank card:**
- `LinearGradient` banner (gradientColors, radius 12, padding 16, white text, height ~88): bank name (size 12, opacity 0.7), account name (size 18, weight 800), masked number (size 13, letterSpacing 0.18, opacity 0.65)
- Balance stat box: `"Current Balance"` label + value in green (size 22)
- June 2026 Flow section: 3 items in a row — Income (green), Expenses (red), Net (green/red)
- Detail rows: Account Type, IFSC Code (size 13, borderBottom border for each)
- Buttons: `Transfer` (primary) + `View Transactions` (secondary)

---

## Step 6 — Cash Bottom Sheet

### File: `src/components/bottomsheets/CashSheet.tsx`

`snapPoints={['55%']}`, `initialIndex={-1}`

**Structure:**
```
[handle]
Cash Account                  [✕]
────────────────────────────────
LinearGradient banner (cashGrad):
  Physical Cash
  Cash in Hand
  Last updated: Today, 9:30 AM

Cash in Hand     ₹2,500 (amber, size 22)

June 2026 Flow:
  Cash In    +₹5,000 (green)
  Cash Out   -₹2,500 (red)

[ Update Balance ] (full width, blue)
```

---

## Step 7 — Payable Bottom Sheet

### File: `src/components/bottomsheets/PayableSheet.tsx`

`snapPoints={['85%']}`, `initialIndex={-1}`

**Structure:**
```
[handle]
Payable                       [✕]
Total You Owe   ₹23,000 (red, size 22)
────────────────────────────────
PARTIES (section label)
<BottomSheetScrollView>
  {parties where netBalance < 0}
  [+ Add Payable]
</BottomSheetScrollView>
```

**Each party card (payable):**
- Row: avatar (40x40 circle, avatarColor bg, white initial, size 16, weight 700) + name/meta/badge + amount (red, size 15, weight 800)
- Below row: `Record Payment` (primary) + `View History` (secondary)
- Card: bg surface, border border-color, radius 14, padding 14, marginBottom 10

**Badge:** size 9, weight 700, radius 4 — overdue/soon/ok colors.

---

## Step 8 — Receivable Bottom Sheet

### File: `src/components/bottomsheets/ReceivableSheet.tsx`

Same structure as PayableSheet but for `netBalance > 0`.

- Header: `"Total Owed to You"` in green
- Amount color: green
- Buttons: `Record Receipt` (primary) + `View History` (secondary)
- `+ Add Receivable` at bottom

---

## Step 9 — Dashboard Screen

### File: `src/screens/DashboardScreen.tsx`

```tsx
import { BottomSheet } from '@expo/ui/community/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const creditCardSheetRef = useRef(null);
  const bankSheetRef = useRef(null);
  const cashSheetRef = useRef(null);
  const payableSheetRef = useRef(null);
  const receivableSheetRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.pageTitle}>Accounts</Text>
        </View>
        <View style={styles.topbarIcons}>
          <IconButton iconName="bell-outline" />
          <IconButton iconName="cog-outline" />
        </View>
      </View>

      {/* Main Scroll */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BudgetCard data={budgetData} />
        <AccountsSection
          onCreditCardPress={() => creditCardSheetRef.current?.expand()}
          onBankPress={() => bankSheetRef.current?.expand()}
          onCashPress={() => cashSheetRef.current?.expand()}
          onPayablePress={() => payableSheetRef.current?.expand()}
          onReceivablePress={() => receivableSheetRef.current?.expand()}
        />
      </ScrollView>

      {/* Bottom Sheets */}
      <CreditCardSheet ref={creditCardSheetRef} onClose={() => creditCardSheetRef.current?.close()} ... />
      <BankSheet ref={bankSheetRef} onClose={() => bankSheetRef.current?.close()} ... />
      <CashSheet ref={cashSheetRef} onClose={() => cashSheetRef.current?.close()} ... />
      <PayableSheet ref={payableSheetRef} onClose={() => payableSheetRef.current?.close()} ... />
      <ReceivableSheet ref={receivableSheetRef} onClose={() => receivableSheetRef.current?.close()} ... />
    </SafeAreaView>
  );
}
```

**`IconButton`:** `Pressable`, 36x36, radius 10, bg surface, border border-color, centered icon.

**Top bar:** paddingHorizontal 20, paddingTop 6, paddingBottom 14, row with space-between.

---

## Step 10 — App.tsx Root

```tsx
import './global.css';
import { useEffect } from 'react';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold, DMSans_800ExtraBold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import DashboardScreen from './src/screens/DashboardScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold, DMSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || error) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <DashboardScreen />;
}
```

> No `GestureHandlerRootView` needed since @expo/ui BottomSheet does not require it. Add it only if you install other gesture-dependent libraries.

---

## Full Important Rules for the AI (summary)

1. **Expo SDK 56, RN 0.85, React 19.2** — no older versions
2. **New Architecture only** — `"newArchEnabled": true` in app.json
3. **No `@gorhom/bottom-sheet`** — use `@expo/ui/community/bottom-sheet`
4. **No Reanimated Babel plugin in babel.config.js** — babel-preset-expo handles it
5. **Install `react-native-worklets`** separately — Reanimated 4.3 requires it
6. **Icons from `@react-native-vector-icons/material-design-icons`** — not `@expo/vector-icons`
7. **NativeWind v5 preview** — Tailwind v4 CSS-first, no `tailwind.config.js`, use `global.css` with `@theme`
8. **`Pressable` over `TouchableOpacity`** throughout
9. **Single snap point per BottomSheet** — avoid multiple snap points due to Android crash bug in SDK 56.0.x
10. **All colors from `Colors` constant** — no inline hex strings
11. **`formatINR()` for every rupee value**
12. **No horizontal ScrollView** — all lists are vertical
13. **`BottomSheetScrollView`** inside sheets for scrollable content
14. **Billed tab:** skip cards where `statement === null`
15. **Recent tab:** show all cards
16. **Party net balance:** negative = payable, positive = receivable
17. **`+ Add` button** at bottom of every sheet, dashed border, full width
18. **`LinearGradient`** from `expo-linear-gradient` for all gradient banners

---

## File Structure

```
finance-app/
├── global.css
├── postcss.config.mjs
├── metro.config.js
├── babel.config.js         ← only babel-preset-expo, nothing else
├── app.json                ← newArchEnabled: true
├── App.tsx
└── src/
    ├── constants/
    │   └── colors.ts
    ├── data/
    │   └── mockData.ts
    ├── utils/
    │   └── format.ts
    ├── components/
    │   ├── BudgetCard.tsx
    │   ├── accounts/
    │   │   ├── AccountRow.tsx
    │   │   └── AccountsSection.tsx
    │   └── bottomsheets/
    │       ├── CreditCardSheet.tsx
    │       ├── BankSheet.tsx
    │       ├── CashSheet.tsx
    │       ├── PayableSheet.tsx
    │       └── ReceivableSheet.tsx
    └── screens/
        └── DashboardScreen.tsx
```

---

## Per-Step Prompt Template

Paste this to the AI for each step:

> "Build Step {N} of a React Native Expo SDK 56 finance dashboard. Use TypeScript, New Architecture, NativeWind v5. Follow all rules in the Important Rules section. Import colors from `../constants/colors`, data from `../data/mockData`, formatINR from `../utils/format`. Use `@expo/ui/community/bottom-sheet` for sheets. Use `@react-native-vector-icons/material-design-icons` for icons. Use `Pressable` not `TouchableOpacity`. Do not add any functionality beyond what is specified in this step.
>
> [paste the relevant step section]"

Build in order: Step 1 → compile check → Step 2 → compile check → ... Do not skip ahead.

---

## Quick Reference — What Changed from SDK 51 to SDK 56

| Old (SDK 51) | New (SDK 56) |
|---|---|
| `@gorhom/bottom-sheet` | `@expo/ui/community/bottom-sheet` |
| `@expo/vector-icons` | `@react-native-vector-icons/material-design-icons` |
| `react-native-reanimated` v3 | v4.3.x + `react-native-worklets` peer |
| Babel plugin for Reanimated | Auto-handled by `babel-preset-expo` |
| `tailwind.config.js` (NativeWind v4) | `global.css` with `@theme` (NativeWind v5) |
| `TouchableOpacity` | `Pressable` |
| Old Architecture optional | New Architecture mandatory |
| `Expo SDK 51+` in spec | `~56.0.0` |
