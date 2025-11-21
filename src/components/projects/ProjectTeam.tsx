'use client';

import React from 'react';
import { Project } from '@/types/project';
import { useEmployeeStore } from '@/stores/employeeStore';
import { Mail, Phone, MapPin, User } from 'lucide-react';

interface ProjectTeamProps {
    project: Project;
}

export default function ProjectTeam({ project }: ProjectTeamProps) {
    const allEmployees = useEmployeeStore(state => state.employees);

    // Filter employees who are in the project's teamIds
    const teamMembers = React.useMemo(() =>
        allEmployees.filter(emp => project.teamIds.includes(emp.id)),
        [allEmployees, project.teamIds]
    );

    const manager = allEmployees.find(emp => emp.id === project.managerId);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-8">
            {/* Project Manager Section */}
            {manager && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                        Project Manager
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 overflow-hidden shrink-0 shadow-sm">
                            {manager.imageUrl ? (
                                <img src={manager.imageUrl} alt={manager.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <User className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{manager.name}</h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{manager.role}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" />
                                    {manager.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" />
                                    {manager.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Team Members Grid */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                    Team Members ({teamMembers.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                    {teamMembers.map(member => (
                        <div key={member.id} className="group bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 overflow-hidden shrink-0 ring-2 ring-white dark:ring-gray-900 shadow-sm group-hover:scale-105 transition-transform">
                                    {member.imageUrl ? (
                                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <User className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{member.name}</h4>
                                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-0.5">{member.role}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.department}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    {member.email}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    <Phone className="w-3.5 h-3.5 shrink-0" />
                                    {member.phone}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
