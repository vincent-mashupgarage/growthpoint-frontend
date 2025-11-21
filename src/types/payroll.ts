export type PayrollStatus = 'Draft' | 'Pending' | 'Paid';

export interface DeductionRates {
    sss: {
        employer: number;
        employee: number;
        total: number;
    };
    philHealth: {
        rate: number; // e.g., 0.05 for 5%
        share: number; // e.g., 0.5 for 50-50 split
    };
    pagIbig: {
        rate: number; // e.g., 0.02 for 2%
        maxContribution: number; // e.g., 100
    };
}

export interface Loan {
    id: string;
    employeeId: string;
    type: 'SSS' | 'Pag-IBIG' | 'Company' | 'Cash Advance';
    totalAmount: number;
    remainingBalance: number;
    monthlyAmortization: number;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Paid';
}

export interface OvertimeRecord {
    id: string;
    employeeId: string;
    date: string;
    hours: number;
    rateMultiplier: number; // e.g., 1.25 for regular OT, 1.3 for rest day
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    employeeName: string;
    position: string;
    department: string;
    periodStart: string;
    periodEnd: string;

    // Earnings
    basicSalary: number; // Monthly basic
    grossPay: number; // For the period (usually semi-monthly)
    overtimePay: number;
    allowances: number;
    bonuses: number;

    // Deductions
    sssContribution: number;
    philHealthContribution: number;
    pagIbigContribution: number;
    withholdingTax: number;
    loans: number; // Total loan deductions for this period
    lateDeductions: number;

    // Net
    netPay: number;

    status: PayrollStatus;
    paymentDate?: string;
}

export interface PayrollState {
    records: PayrollRecord[];
    loans: Loan[];
    overtimeRecords: OvertimeRecord[];
    settings: DeductionRates;
}
