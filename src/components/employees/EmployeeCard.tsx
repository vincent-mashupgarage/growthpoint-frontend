import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Employee } from '@/types/employee';
import { Phone, Mail, MapPin } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

interface EmployeeCardProps {
    employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <Link href={`/employees/${employee.id}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="p-4 flex items-start space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                            src={employee.imageUrl}
                            alt={`${employee.name}, ${employee.role} at ${employee.department}`}
                            fill
                            loading="lazy"
                            className="rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                        />
                        <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-700 ${getStatusColor(employee.status)}`}
                            aria-label={getStatusLabel(employee.status)}
                            title={employee.status}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {employee.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{employee.role}</p>
                        <div className="mt-1 flex items-center text-xs text-gray-400 dark:text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{employee.location}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                            {employee.skills.slice(0, 2).map(skill => (
                                <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                    {skill}
                                </span>
                            ))}
                            {employee.skills.length > 2 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                    +{employee.skills.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-auto border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 flex justify-between items-center">
                    <div className="flex space-x-3" onClick={(e) => e.preventDefault()}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button
                                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${employee.email}`; }}
                                >
                                    <Mail className="w-4 h-4" />
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg" sideOffset={5}>
                                    Email: {employee.email}
                                    <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button
                                    className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors p-1 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20"
                                    onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${employee.phone}`; }}
                                >
                                    <Phone className="w-4 h-4" />
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg" sideOffset={5}>
                                    Call: {employee.phone}
                                    <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {employee.department}
                    </span>
                </div>
            </div>
        </Link>
    );
}
