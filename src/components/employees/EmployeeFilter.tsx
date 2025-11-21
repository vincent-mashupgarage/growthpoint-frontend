'use client';

import React from 'react';
import { useEmployeeStore } from '@/stores/employeeStore';

const DEPARTMENTS = [
    'Operations',
    'Engineering & Design',
    'Safety & Compliance',
    'Equipment Management',
    'Procurement',
];

export default function EmployeeFilter() {
    const filter = useEmployeeStore((state) => state.filter);
    const setFilter = useEmployeeStore((state) => state.setFilter);
    const employees = useEmployeeStore((state) => state.employees);

    // Calculate counts
    const deptCounts = DEPARTMENTS.reduce((acc, dept) => {
        acc[dept] = employees.filter(e => e.department === dept).length;
        return acc;
    }, {} as Record<string, number>);

    const allCount = employees.length;

    return (
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-64px)] overflow-y-auto hidden md:block transition-colors">
            <div className="p-4">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Departments
                </h2>
                <nav className="space-y-1">
                    <button
                        onClick={() => setFilter({ department: null })}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.department === null
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <span>All Employees</span>
                        <span className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs ${filter.department === null ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
                            }`}>
                            {allCount}
                        </span>
                    </button>
                    {DEPARTMENTS.map((dept) => (
                        <button
                            key={dept}
                            onClick={() => setFilter({ department: dept })}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.department === dept
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <span>{dept}</span>
                            <span className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs ${filter.department === dept ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
                                }`}>
                                {deptCounts[dept] || 0}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
