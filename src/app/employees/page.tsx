'use client';

import React from 'react';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeCard from '@/components/employees/EmployeeCard';
import EmployeeFilter from '@/components/employees/EmployeeFilter';
import EmployeeHeader from '@/components/employees/EmployeeHeader';

export default function EmployeeDirectoryPage() {
    const employees = useEmployeeStore((state) => state.employees);
    const filter = useEmployeeStore((state) => state.filter);

    const filteredEmployees = React.useMemo(() => {
        return employees.filter((employee) => {
            const matchesSearch =
                employee.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                employee.role.toLowerCase().includes(filter.search.toLowerCase()) ||
                employee.email.toLowerCase().includes(filter.search.toLowerCase());
            const matchesDepartment =
                filter.department === null || employee.department === filter.department;

            return matchesSearch && matchesDepartment;
        });
    }, [employees, filter]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
            <EmployeeHeader />
            <div className="flex flex-1 overflow-hidden">
                <EmployeeFilter />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {filteredEmployees.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No employees found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredEmployees.map((employee) => (
                                <EmployeeCard key={employee.id} employee={employee} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
