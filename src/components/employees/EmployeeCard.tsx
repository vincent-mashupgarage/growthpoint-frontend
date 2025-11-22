import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Employee } from '@/types/employee';
import { Phone, Mail, CheckCircle2, Circle } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

interface EmployeeCardProps {
    employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
    const isOnline = employee.status === 'Active';

    return (
        <Link href={`/employees/${employee.id}`} className="block group h-full">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative p-6">
                {/* Status Indicator (Top Right) */}
                <div className="absolute top-4 right-4">
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            {isOnline ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                            ) : (
                                <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                            )}
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50" sideOffset={5}>
                                {employee.status}
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </div>

                {/* Avatar (Centered) */}
                <div className="flex justify-center mb-4 mt-2">
                    <div className="relative w-24 h-24">
                        <Image
                            src={employee.imageUrl}
                            alt={`${employee.name}`}
                            fill
                            loading="lazy"
                            className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-800"
                        />
                    </div>
                </div>

                {/* Content (Centered) */}
                <div className="text-center flex-1 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {employee.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                        {employee.department}
                    </p>

                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 mb-2">
                        {employee.role}
                    </span>
                </div>

                {/* Footer Actions (Centered) */}
                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex justify-center gap-8">
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <button
                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail className="w-5 h-5" />
                            </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50" sideOffset={5}>
                                {employee.email}
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>

                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <button
                                className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors transform hover:scale-110 cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Phone className="w-5 h-5" />
                            </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50" sideOffset={5}>
                                {employee.phone}
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </div>
            </div>
        </Link>
    );
}
