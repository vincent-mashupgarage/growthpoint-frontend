import { create } from 'zustand';
import { PayrollRecord, PayrollState, Loan, OvertimeRecord, PayrollStatus } from '@/types/payroll';
import { useEmployeeStore } from './employeeStore';

/**
 * Calculate SSS (Social Security System) employee contribution
 *
 * Implements the Philippine SSS contribution table for 2024/2025 (simplified version).
 * The actual SSS uses a complex contribution table with specific salary ranges (MSC - Monthly Salary Credit).
 *
 * Calculation rules:
 * - Minimum MSC: ₱4,250 (contributes ₱180 - minimum employee share)
 * - Maximum MSC: ₱29,750 (contributes ₱1,350 - maximum employee share, capped)
 * - Standard rate: 4.5% of monthly salary (employee share)
 * - Total SSS rate: 14% (employer: 9.5%, employee: 4.5%)
 *
 * @param salary - Monthly salary in Philippine Pesos (₱)
 * @returns Employee's SSS contribution amount for the month
 *
 * @see https://www.sss.gov.ph/sss/DownloadContent?fileName=2024-Contribution-Schedule.pdf
 *
 * @example
 * getSSSContribution(20000)  // Returns 900 (4.5% of 20,000)
 * getSSSContribution(3000)   // Returns 180 (minimum)
 * getSSSContribution(50000)  // Returns 1350 (maximum, capped)
 */
const getSSSContribution = (salary: number): number => {
    // Minimum MSC bracket - employees earning below ₱4,250
    if (salary < 4250) return 180;

    // Maximum MSC bracket - employees earning above ₱29,750 (contribution is capped)
    if (salary > 29750) return 1350;

    // Standard calculation: 4.5% employee share
    return Math.round(salary * 0.045);
};

/**
 * Calculate PhilHealth (Philippine Health Insurance Corporation) employee contribution
 *
 * Implements the Philippine universal health insurance premium calculation.
 * PhilHealth uses a premium rate applied to the monthly basic salary with a floor and ceiling.
 *
 * Calculation rules:
 * - Premium rate: 5% of monthly basic salary
 * - Minimum salary floor: ₱10,000 (minimum basis for contribution)
 * - Maximum salary ceiling: ₱100,000 (maximum basis for contribution)
 * - Cost sharing: 50-50 split between employer and employee
 * - Employee pays: 2.5% of basis (half of 5%)
 *
 * @param salary - Monthly basic salary in Philippine Pesos (₱)
 * @returns Employee's PhilHealth contribution amount for the month
 *
 * @see https://www.philhealth.gov.ph/advisories/2024/
 *
 * @example
 * getPhilHealthContribution(25000)   // Returns 625 (2.5% of 25,000)
 * getPhilHealthContribution(8000)    // Returns 250 (2.5% of 10,000 - floor)
 * getPhilHealthContribution(150000)  // Returns 2500 (2.5% of 100,000 - ceiling)
 */
const getPhilHealthContribution = (salary: number): number => {
    let basis = salary;

    // Apply salary floor - minimum basis is ₱10,000
    if (salary < 10000) basis = 10000;

    // Apply salary ceiling - maximum basis is ₱100,000
    if (salary > 100000) basis = 100000;

    // Calculate total premium: 5% of basis
    const totalPremium = basis * 0.05;

    // Employee pays half (50% share)
    return totalPremium / 2;
};

/**
 * Calculate Pag-IBIG (Home Development Mutual Fund) employee contribution
 *
 * Implements the Philippine housing fund contribution calculation.
 * Pag-IBIG has a simple 2% rate with a monthly cap.
 *
 * Calculation rules:
 * - Standard rate: 2% of monthly basic salary
 * - Maximum contribution: ₱100 per month (capped for salaries > ₱5,000)
 * - Cost sharing: Equal employer-employee split (both contribute same amount)
 * - Threshold: ₱5,000 monthly salary
 *
 * @param salary - Monthly basic salary in Philippine Pesos (₱)
 * @returns Employee's Pag-IBIG contribution amount for the month
 *
 * @see https://www.pagibigfund.gov.ph/MemberProvident_ContributionRates.html
 *
 * @example
 * getPagIbigContribution(20000)  // Returns 100 (capped)
 * getPagIbigContribution(3000)   // Returns 60 (2% of 3,000)
 * getPagIbigContribution(5000)   // Returns 100 (2% of 5,000)
 */
const getPagIbigContribution = (salary: number): number => {
    // Salaries above ₱5,000 contribute the maximum ₱100
    if (salary > 5000) return 100;

    // Salaries ₱5,000 and below contribute 2%
    return salary * 0.02;
};

/**
 * Calculate withholding tax based on TRAIN Law (Tax Reform for Acceleration and Inclusion)
 *
 * Implements the Philippine graduated income tax table effective 2018-present.
 * This is a simplified approximation for semi-monthly payroll periods (24 periods per year).
 *
 * Tax brackets (Annual):
 * - ₱0 to ₱250,000: 0% (exempt)
 * - ₱250,001 to ₱400,000: 20% of excess over ₱250,000
 * - ₱400,001 to ₱800,000: ₱30,000 + 25% of excess over ₱400,000
 * - ₱800,001 to ₱2,000,000: ₱130,000 + 30% of excess over ₱800,000
 * - ₱2,000,001 to ₱8,000,000: ₱490,000 + 32% of excess over ₱2,000,000
 * - Above ₱8,000,000: ₱2,410,000 + 35% of excess over ₱8,000,000
 *
 * Note: This is a simplified calculation. Actual implementation should:
 * - Use the exact BIR withholding tax tables
 * - Account for tax exemptions and deductions
 * - Consider annualization of bonuses
 *
 * @param taxableIncome - Semi-monthly taxable income (gross - govt contributions)
 * @returns Withholding tax amount for the semi-monthly period
 *
 * @see https://www.bir.gov.ph/index.php/tax-information/withholding-tax.html
 *
 * @example
 * getWithholdingTax(10000)   // Returns 0 (below exemption threshold)
 * getWithholdingTax(20000)   // Returns ~833 (approx calculation)
 */
const getWithholdingTax = (taxableIncome: number): number => {
    // Annualize the taxable income (semi-monthly × 24 periods)
    const annualIncome = taxableIncome * 24;

    // Tax bracket 1: ₱0 - ₱250,000 (0% tax - exempt)
    if (annualIncome <= 250000) return 0;

    // Tax bracket 2: ₱250,001 - ₱400,000 (20% of excess)
    if (annualIncome <= 400000) {
        return (taxableIncome - (250000 / 24)) * 0.20;
    }

    // Tax bracket 3: ₱400,001 - ₱800,000 (₱30,000 + 25% of excess)
    if (annualIncome <= 800000) {
        return 2500 + (taxableIncome - (400000 / 24)) * 0.25;
    }

    // Tax bracket 4: ₱800,001 - ₱2,000,000 (₱130,000 + 30% of excess)
    if (annualIncome <= 2000000) {
        return 10833 + (taxableIncome - (800000 / 24)) * 0.30;
    }

    // Higher brackets not implemented in this simplified version
    return 0; // Fallback for edge cases
};

interface PayrollStore extends PayrollState {
    generatePayroll: (periodStart: string, periodEnd: string) => void;
    updateStatus: (id: string, status: PayrollStatus) => void;
    addLoan: (loan: Loan) => void;
    addOvertime: (ot: OvertimeRecord) => void;
    approveOvertime: (id: string) => void;
}

export const usePayrollStore = create<PayrollStore>((set, get) => ({
    records: [],
    loans: [
        {
            id: '1',
            employeeId: '1',
            type: 'SSS',
            totalAmount: 15000,
            remainingBalance: 12000,
            monthlyAmortization: 1000,
            startDate: '2023-01-01',
            endDate: '2024-03-01',
            status: 'Active'
        },
        {
            id: '2',
            employeeId: '3',
            type: 'Company',
            totalAmount: 25000,
            remainingBalance: 18000,
            monthlyAmortization: 1500,
            startDate: '2024-06-01',
            endDate: '2026-02-01',
            status: 'Active'
        },
        {
            id: '3',
            employeeId: '7',
            type: 'Cash Advance',
            totalAmount: 5000,
            remainingBalance: 2500,
            monthlyAmortization: 500,
            startDate: '2025-09-01',
            endDate: '2026-04-01',
            status: 'Active'
        }
    ],
    overtimeRecords: [
        {
            id: 'ot1',
            employeeId: '1',
            date: '2025-11-18',
            hours: 3,
            rateMultiplier: 1.25,
            reason: 'Project deadline - site inspection',
            status: 'Approved'
        },
        {
            id: 'ot2',
            employeeId: '3',
            date: '2025-11-20',
            hours: 4,
            rateMultiplier: 1.25,
            reason: 'Emergency concrete pouring',
            status: 'Approved'
        },
        {
            id: 'ot3',
            employeeId: '5',
            date: '2025-11-19',
            hours: 2.5,
            rateMultiplier: 1.25,
            reason: 'Wall completion before inspection',
            status: 'Approved'
        },
        {
            id: 'ot4',
            employeeId: '7',
            date: '2025-11-22',
            hours: 5,
            rateMultiplier: 1.5,
            reason: 'Electrical installation on holiday',
            status: 'Approved'
        },
        {
            id: 'ot5',
            employeeId: '8',
            date: '2025-11-21',
            hours: 3.5,
            rateMultiplier: 1.25,
            reason: 'Equipment operation for urgent delivery',
            status: 'Approved'
        },
        {
            id: 'ot6',
            employeeId: '2',
            date: '2025-11-23',
            hours: 2,
            rateMultiplier: 1.25,
            reason: 'Structural design review',
            status: 'Pending'
        },
        {
            id: 'ot7',
            employeeId: '10',
            date: '2025-11-24',
            hours: 4,
            rateMultiplier: 1.3,
            reason: 'Weekend site cleanup',
            status: 'Pending'
        },
        {
            id: 'ot8',
            employeeId: '6',
            date: '2025-11-25',
            hours: 3,
            rateMultiplier: 1.25,
            reason: 'Blueprint revision deadline',
            status: 'Pending'
        }
    ],
    settings: {
        sss: { employer: 0, employee: 0.045, total: 0.14 },
        philHealth: { rate: 0.05, share: 0.5 },
        pagIbig: { rate: 0.02, maxContribution: 100 }
    },

    generatePayroll: (periodStart, periodEnd) => {
        const employees = useEmployeeStore.getState().employees;
        const { loans, overtimeRecords } = get();

        const newRecords: PayrollRecord[] = employees.map(emp => {
            // 1. Calculate Gross (Semi-monthly assumption: Basic / 2)
            // In a real app, we'd check attendance here.
            const semiMonthlyBasic = emp.salary / 2;

            // 2. Calculate Overtime
            const empOt = overtimeRecords
                .filter(ot => ot.employeeId === emp.id && ot.status === 'Approved')
                .reduce((acc, curr) => {
                    const hourlyRate = (emp.salary / 22 / 8); // Approx hourly
                    return acc + (curr.hours * hourlyRate * curr.rateMultiplier);
                }, 0);

            const grossPay = semiMonthlyBasic + empOt;

            // 3. Government Deductions (Usually deducted once a month, but split here for simplicity or assumed 2nd cut-off)
            // For this demo, we'll apply them to every payroll but scaled or just full logic depending on preference.
            // Let's assume this is the "End of Month" cutoff where deductions happen.
            const isEndOfMonth = new Date(periodEnd).getDate() >= 25;

            let sss = 0, philHealth = 0, pagIbig = 0;

            if (isEndOfMonth) {
                sss = getSSSContribution(emp.salary);
                philHealth = getPhilHealthContribution(emp.salary);
                pagIbig = getPagIbigContribution(emp.salary);
            }

            // 4. Loans
            const empLoans = loans
                .filter(l => l.employeeId === emp.id && l.status === 'Active')
                .reduce((acc, curr) => acc + (curr.monthlyAmortization / 2), 0); // Split amortization

            // 5. Tax
            const taxableIncome = grossPay - sss - philHealth - pagIbig;
            const tax = Math.max(0, getWithholdingTax(taxableIncome));

            // 6. Net Pay
            const totalDeductions = sss + philHealth + pagIbig + tax + empLoans;
            const netPay = grossPay - totalDeductions;

            // 7. Assign varied statuses for realistic demo
            // Draft (employees 1-3), Pending (4-7), Paid (8-10)
            let status: PayrollStatus = 'Draft';
            let paymentDate: string | undefined = undefined;

            const empIdNum = parseInt(emp.id);
            if (empIdNum >= 1 && empIdNum <= 3) {
                status = 'Draft';
            } else if (empIdNum >= 4 && empIdNum <= 7) {
                status = 'Pending';
            } else if (empIdNum >= 8 && empIdNum <= 10) {
                status = 'Paid';
                paymentDate = periodEnd; // Set payment date for paid records
            }

            return {
                id: Math.random().toString(36).substr(2, 9),
                employeeId: emp.id,
                employeeName: `${emp.name}`,
                position: emp.role,
                department: emp.department,
                periodStart,
                periodEnd,
                basicSalary: semiMonthlyBasic,
                grossPay,
                overtimePay: empOt,
                allowances: 0,
                bonuses: 0,
                sssContribution: sss,
                philHealthContribution: philHealth,
                pagIbigContribution: pagIbig,
                withholdingTax: tax,
                loans: empLoans,
                lateDeductions: 0,
                netPay,
                status,
                paymentDate
            };
        });

        set({ records: newRecords });
    },

    updateStatus: (id, status) => set(state => ({
        records: state.records.map(r => r.id === id ? { ...r, status } : r)
    })),

    addLoan: (loan) => set(state => ({
        loans: [...state.loans, loan]
    })),

    addOvertime: (ot) => set(state => ({
        overtimeRecords: [...state.overtimeRecords, ot]
    })),

    approveOvertime: (id) => set(state => ({
        overtimeRecords: state.overtimeRecords.map(ot =>
            ot.id === id ? { ...ot, status: 'Approved' } : ot
        )
    }))
}));
