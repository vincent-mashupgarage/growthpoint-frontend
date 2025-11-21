'use client';

import React, { useState } from 'react';
import PayrollHeader from '@/components/payroll/PayrollHeader';
import PayrollTable from '@/components/payroll/PayrollTable';
import PayslipModal from '@/components/payroll/PayslipModal';
import { usePayrollStore } from '@/stores/payrollStore';
import { PayrollRecord } from '@/types/payroll';

// Payroll period constants
// TODO: Replace with date picker component for dynamic period selection
const CURRENT_PERIOD_START = '2025-11-16';
const CURRENT_PERIOD_END = '2025-11-30';

export default function PayrollPage() {
    const records = usePayrollStore((state) => state.records);
    const generatePayroll = usePayrollStore((state) => state.generatePayroll);

    const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Generate payroll for the current period
     *
     * Currently uses hardcoded dates. In production, this should:
     * 1. Use a date range picker component
     * 2. Validate date ranges (start < end, not in future)
     * 3. Prevent duplicate generation for the same period
     * 4. Show loading state during generation
     */
    const handleGenerate = () => {
        generatePayroll(CURRENT_PERIOD_START, CURRENT_PERIOD_END);
    };

    const handleViewPayslip = (record: PayrollRecord) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <PayrollHeader onGenerate={handleGenerate} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Current Period Payroll</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Review and approve salary calculations for {CURRENT_PERIOD_START} to {CURRENT_PERIOD_END}.
                    </p>
                </div>

                <PayrollTable
                    records={records}
                    onViewPayslip={handleViewPayslip}
                />
            </main>

            <PayslipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                record={selectedRecord}
            />
        </div>
    );
}
