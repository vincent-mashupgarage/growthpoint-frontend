'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Printer, Download, AlertCircle } from 'lucide-react';
import { PayrollRecord } from '@/types/payroll';

interface PayslipModalProps {
    isOpen: boolean;
    onClose: () => void;
    record: PayrollRecord | null;
}

/**
 * PayslipModal Component
 *
 * Displays detailed payslip information in a modal dialog with printing and PDF download capabilities.
 * Uses Radix UI Dialog for accessibility and html2canvas + jsPDF for PDF generation.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
 *
 * <PayslipModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   record={selectedRecord}
 * />
 * ```
 *
 * @param {PayslipModalProps} props - Component props
 * @returns {JSX.Element | null} Modal component or null if no record provided
 */
export default function PayslipModal({ isOpen, onClose, record }: PayslipModalProps) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [pdfError, setPdfError] = useState<string | null>(null);

    if (!record) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    };

    const totalDeductions = record.sssContribution + record.philHealthContribution + record.pagIbigContribution + record.withholdingTax + record.loans + record.lateDeductions;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow popups to print the payslip.');
            return;
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Payslip - ${record.employeeName}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.5;
                        color: #000;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 20px;
                    }
                    .company-name {
                        font-size: 24px;
                        font-weight: bold;
                        margin: 0;
                    }
                    .company-address {
                        font-size: 14px;
                        color: #666;
                        margin: 5px 0;
                    }
                    .period-badge {
                        display: inline-block;
                        background: #f3f4f6;
                        padding: 4px 12px;
                        border-radius: 15px;
                        font-size: 14px;
                        margin-top: 10px;
                        border: 1px solid #e5e7eb;
                    }
                    .employee-info {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 30px;
                        font-size: 14px;
                    }
                    .info-group {
                        margin-bottom: 5px;
                    }
                    .label {
                        color: #666;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .value {
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .grid-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }
                    .section-title {
                        font-size: 14px;
                        font-weight: bold;
                        text-transform: uppercase;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 8px;
                        margin-bottom: 15px;
                    }
                    .row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }
                    .row.total {
                        border-top: 1px solid #eee;
                        padding-top: 10px;
                        margin-top: 10px;
                        font-weight: bold;
                        font-size: 15px;
                    }
                    .deduction {
                        color: #dc2626;
                    }
                    .net-pay-section {
                        margin-top: 30px;
                        background: #f9fafb;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #e5e7eb;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .net-pay-label {
                        font-size: 14px;
                        font-weight: bold;
                        text-transform: uppercase;
                        color: #4b5563;
                    }
                    .net-pay-sub {
                        font-size: 12px;
                        color: #9ca3af;
                        margin-top: 2px;
                    }
                    .net-pay-amount {
                        font-size: 24px;
                        font-weight: bold;
                        color: #2563eb;
                    }
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="company-name">GrowthPoint Construction</h1>
                        <p class="company-address">123 Builder Avenue, Metro Manila</p>
                        <div class="period-badge">
                            Period: ${record.periodStart} - ${record.periodEnd}
                        </div>
                    </div>

                    <div class="employee-info">
                        <div>
                            <div class="info-group">
                                <div class="label">Employee Name</div>
                                <div class="value">${record.employeeName}</div>
                            </div>
                            <div class="info-group" style="margin-top: 15px;">
                                <div class="label">Department</div>
                                <div class="value">${record.department}</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div class="info-group">
                                <div class="label">Position</div>
                                <div class="value">${record.position}</div>
                            </div>
                            <div class="info-group" style="margin-top: 15px;">
                                <div class="label">Status</div>
                                <div class="value">${record.status}</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-container">
                        <div>
                            <div class="section-title">Earnings</div>
                            <div class="row">
                                <span>Basic Salary</span>
                                <span>${formatCurrency(record.basicSalary)}</span>
                            </div>
                            <div class="row">
                                <span>Overtime Pay</span>
                                <span>${formatCurrency(record.overtimePay)}</span>
                            </div>
                            <div class="row">
                                <span>Allowances</span>
                                <span>${formatCurrency(record.allowances)}</span>
                            </div>
                            <div class="row total">
                                <span>Total Gross Pay</span>
                                <span>${formatCurrency(record.grossPay)}</span>
                            </div>
                        </div>

                        <div>
                            <div class="section-title">Deductions</div>
                            <div class="row">
                                <span>SSS Contribution</span>
                                <span class="deduction">-${formatCurrency(record.sssContribution)}</span>
                            </div>
                            <div class="row">
                                <span>PhilHealth</span>
                                <span class="deduction">-${formatCurrency(record.philHealthContribution)}</span>
                            </div>
                            <div class="row">
                                <span>Pag-IBIG</span>
                                <span class="deduction">-${formatCurrency(record.pagIbigContribution)}</span>
                            </div>
                            <div class="row">
                                <span>Withholding Tax</span>
                                <span class="deduction">-${formatCurrency(record.withholdingTax)}</span>
                            </div>
                            <div class="row">
                                <span>Loans / Cash Advance</span>
                                <span class="deduction">-${formatCurrency(record.loans)}</span>
                            </div>
                            <div class="row total">
                                <span>Total Deductions</span>
                                <span class="deduction">-${formatCurrency(totalDeductions)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="net-pay-section">
                        <div>
                            <div class="net-pay-label">Net Pay</div>
                            <div class="net-pay-sub">Take home pay after all deductions</div>
                        </div>
                        <div class="net-pay-amount">
                            ${formatCurrency(record.netPay)}
                        </div>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        // Optional: window.close();
                    }
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        setPdfError(null);

        try {
            // Dynamically import PDF libraries (reduces initial bundle size)
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const element = document.getElementById('printable-payslip');
            if (!element) {
                throw new Error('Payslip element not found. Please try again.');
            }

            // Convert HTML to canvas with high quality settings
            const canvas = await html2canvas(element, {
                scale: 2, // Higher quality
                logging: false,
                useCORS: true
            });

            // Convert canvas to image data
            const imgData = canvas.toDataURL('image/png');
            if (!imgData || imgData === 'data:,') {
                throw new Error('Failed to generate image from payslip.');
            }

            // Create PDF document
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Calculate dimensions to fit A4 page
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add image to PDF and trigger download
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`payslip-${record.employeeName.replace(/\s+/g, '-')}-${record.periodEnd}.pdf`);

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'An unexpected error occurred while generating the PDF.';

            setPdfError(errorMessage);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                <Dialog.Content className="payslip-modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 p-6 border border-gray-200 dark:border-gray-800 print:p-0 print:shadow-none print:border-none print:overflow-visible">
                    <div className="flex items-center justify-between mb-6 print:hidden">
                        <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                            Payslip Detail
                        </Dialog.Title>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrint}
                                disabled={isGeneratingPDF}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Print"
                            >
                                <Printer className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title={isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                            >
                                <Download className={`w-5 h-5 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
                            </button>
                            <button
                                onClick={onClose}
                                disabled={isGeneratingPDF}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Error Display */}
                    {pdfError && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg print:hidden">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Failed to Generate PDF</h4>
                                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{pdfError}</p>
                                </div>
                                <button
                                    onClick={() => setPdfError(null)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                    aria-label="Dismiss error"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Payslip Content */}
                    <div className="bg-white dark:bg-gray-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800 print:border-none print:p-0 print:bg-white" id="printable-payslip">
                        {/* Header */}
                        <div className="text-center mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 print:border-gray-300">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white print:text-black">GrowthPoint Construction</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">123 Builder Avenue, Metro Manila</p>
                            <div className="mt-4 inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 print:bg-gray-100 print:text-black print:border print:border-gray-200">
                                Period: {record.periodStart} - {record.periodEnd}
                            </div>
                        </div>

                        {/* Employee Info */}
                        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 print:text-gray-600">Employee Name</p>
                                <p className="font-bold text-gray-900 dark:text-white text-lg print:text-black">{record.employeeName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 dark:text-gray-400 print:text-gray-600">Position</p>
                                <p className="font-medium text-gray-900 dark:text-white print:text-black">{record.position}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 print:text-gray-600">Department</p>
                                <p className="font-medium text-gray-900 dark:text-white print:text-black">{record.department}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 dark:text-gray-400 print:text-gray-600">Status</p>
                                <p className="font-medium text-gray-900 dark:text-white print:text-black">{record.status}</p>
                            </div>
                        </div>

                        {/* Earnings & Deductions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-8">
                            {/* Earnings */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 print:text-black print:border-gray-300">
                                    Earnings
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Basic Salary</span>
                                        <span className="font-medium text-gray-900 dark:text-white print:text-black">{formatCurrency(record.basicSalary)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Overtime Pay</span>
                                        <span className="font-medium text-gray-900 dark:text-white print:text-black">{formatCurrency(record.overtimePay)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Allowances</span>
                                        <span className="font-medium text-gray-900 dark:text-white print:text-black">{formatCurrency(record.allowances)}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800 print:border-gray-300">
                                        <span className="font-bold text-gray-900 dark:text-white print:text-black">Total Gross Pay</span>
                                        <span className="font-bold text-gray-900 dark:text-white print:text-black">{formatCurrency(record.grossPay)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deductions */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 print:text-black print:border-gray-300">
                                    Deductions
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">SSS Contribution</span>
                                        <span className="font-medium text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(record.sssContribution)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">PhilHealth</span>
                                        <span className="font-medium text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(record.philHealthContribution)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Pag-IBIG</span>
                                        <span className="font-medium text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(record.pagIbigContribution)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Withholding Tax</span>
                                        <span className="font-medium text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(record.withholdingTax)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 print:text-black">Loans / Cash Advance</span>
                                        <span className="font-medium text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(record.loans)}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800 print:border-gray-300">
                                        <span className="font-bold text-gray-900 dark:text-white print:text-black">Total Deductions</span>
                                        <span className="font-bold text-red-600 dark:text-red-400 print:text-red-600">-{formatCurrency(totalDeductions)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Net Pay */}
                        <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg flex items-center justify-between border border-gray-200 dark:border-gray-800 print:bg-gray-50 print:border-gray-300 print:text-black">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium print:text-gray-600">Net Pay</p>
                                <p className="text-xs text-gray-400 mt-1 print:text-gray-500">Take home pay after all deductions</p>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 print:text-blue-700">
                                {formatCurrency(record.netPay)}
                            </div>
                        </div>
                    </div>

                    {/* Close Button at Bottom */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
