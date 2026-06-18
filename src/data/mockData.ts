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
    statement: null,
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
