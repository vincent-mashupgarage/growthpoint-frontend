'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid, Calculator, Calendar } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeToggle } from '@/components/theme-toggle';

interface PayrollHeaderProps {
    onGenerate: () => void;
}

export default function PayrollHeader({ onGenerate }: PayrollHeaderProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10 transition-colors">
            <div className="flex items-center">
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <Link
                            href="/"
                            className="mr-4 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors group"
                        >
                            <LayoutGrid className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium text-sm hidden sm:inline-block group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                Dashboard
                            </span>
                        </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50" sideOffset={5}>
                            Return to App Launcher
                            <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll</h1>
                <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Management
                </span>
            </div>

            <div className="flex items-center w-full sm:w-auto gap-3">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md border border-gray-200 dark:border-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500 ml-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pr-2">Nov 16 - Nov 30, 2025</span>
                </div>

                <ThemeToggle />

                <button
                    onClick={onGenerate}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <Calculator className="h-4 w-4 mr-2" />
                    Generate Payroll
                </button>
            </div>
        </div>
    );
}
