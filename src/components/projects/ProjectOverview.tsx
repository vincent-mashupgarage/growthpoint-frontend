'use client';

import React from 'react';
import { Project } from '@/types/project';
import { Calendar, MapPin, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface ProjectOverviewProps {
    project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
    const budgetPercentage = Math.round((project.budget.spent / project.budget.total) * 100);
    const daysRemaining = project.endDate
        ? Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: project.budget.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-8">
            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Budget</h3>
                            <div className="p-2.5 bg-white dark:bg-green-500/10 rounded-xl ring-1 ring-gray-200 dark:ring-green-500/20">
                                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {formatCurrency(project.budget.total)}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">Spent:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(project.budget.spent)}</span>
                                </div>
                                <span className={`${budgetPercentage > 90 ? 'text-red-500 bg-red-100 dark:bg-red-500/20' : 'text-green-600 bg-green-100 dark:bg-green-500/20'} font-medium px-2 py-0.5 rounded-full`}>
                                    {budgetPercentage}% Used
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${budgetPercentage > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</h3>
                            <div className="p-2.5 bg-white dark:bg-blue-500/10 rounded-xl ring-1 ring-gray-200 dark:ring-blue-500/20">
                                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {daysRemaining > 0 ? `${daysRemaining} Days` : 'Overdue'}
                            </p>
                            <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400 gap-1.5">
                                <div className="flex justify-between items-center">
                                    <span>Start Date</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(project.startDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Target End</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Progress</h3>
                            <div className="p-2.5 bg-white dark:bg-violet-500/10 rounded-xl ring-1 ring-gray-200 dark:ring-violet-500/20">
                                <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {project.progress}%
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Completion based on tasks & milestones
                            </p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-violet-500 to-purple-600 h-full rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description & Details */}
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    Project Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-4">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Location</h4>
                            <div className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                                <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg mr-3">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </div>
                                {project.location}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</h4>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset
                                ${project.status === 'In Progress' ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20' :
                                    project.status === 'Planning' ? 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20' :
                                        project.status === 'On Hold' ? 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/20' :
                                            'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${project.status === 'In Progress' ? 'bg-green-600 dark:bg-green-400' :
                                    project.status === 'Planning' ? 'bg-blue-600 dark:bg-blue-400' :
                                        project.status === 'On Hold' ? 'bg-orange-600 dark:bg-orange-400' :
                                            'bg-gray-600 dark:bg-gray-400'
                                    }`}></span>
                                {project.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
