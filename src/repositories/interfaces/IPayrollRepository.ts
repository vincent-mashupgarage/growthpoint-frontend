import { PayrollRecord, Loan, OvertimeRecord } from '@/types/payroll';

/**
 * Payroll Repository Interface
 *
 * Defines the contract for payroll data access operations.
 * Note: Payroll calculations remain in the store,
 * this repository only handles data persistence.
 */
export interface IPayrollRepository {
    /**
     * Fetch all payroll records
     *
     * @returns Promise resolving to array of all payroll records
     */
    getAllRecords(): Promise<PayrollRecord[]>;

    /**
     * Fetch payroll records for a specific period
     *
     * @param periodStart - Start date of period
     * @param periodEnd - End date of period
     * @returns Promise resolving to array of records for that period
     */
    getRecordsByPeriod(periodStart: string, periodEnd: string): Promise<PayrollRecord[]>;

    /**
     * Fetch all active loans
     *
     * @returns Promise resolving to array of active loans
     */
    getAllLoans(): Promise<Loan[]>;

    /**
     * Fetch loans for a specific employee
     *
     * @param employeeId - The employee ID
     * @returns Promise resolving to array of employee's loans
     */
    getLoansByEmployee(employeeId: string): Promise<Loan[]>;

    /**
     * Fetch all overtime records
     *
     * @returns Promise resolving to array of overtime records
     */
    getAllOvertimeRecords(): Promise<OvertimeRecord[]>;

    /**
     * Save a payroll record
     *
     * @param record - The payroll record to save
     * @returns Promise resolving to the saved record
     */
    saveRecord(record: PayrollRecord): Promise<PayrollRecord>;
}
