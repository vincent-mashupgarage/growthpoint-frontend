'use client';

import React from 'react';
import AppCard from './AppCard';
import {
    Users,
    Package,
    Briefcase,
    Clock,
    FileText,
    Settings,
    BarChart3,
    Truck
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const MODULES = [
    {
        title: 'Employees',
        description: 'Manage your workforce, view profiles, and track departmental distribution.',
        icon: Users,
        href: '/employees',
        color: 'bg-gradient-to-br from-blue-500 to-blue-600',
        status: 'active' as const
    },
    {
        title: 'Inventory',
        description: 'Track equipment, tools, and materials across all construction sites.',
        icon: Package,
        href: '/inventory',
        color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        status: 'active' as const
    },
    {
        title: 'Projects',
        description: 'Monitor construction project progress, timelines, and resource allocation.',
        icon: Briefcase,
        href: '/projects',
        color: 'bg-gradient-to-br from-purple-500 to-purple-600',
        status: 'coming_soon' as const
    },
    {
        title: 'Timesheets',
        description: 'Track employee hours, overtime, and attendance records.',
        icon: Clock,
        href: '/timesheets',
        color: 'bg-gradient-to-br from-orange-500 to-orange-600',
        status: 'coming_soon' as const
    },
    {
        title: 'Fleet Management',
        description: 'Manage vehicle maintenance schedules, assignments, and fuel usage.',
        icon: Truck,
        href: '/fleet',
        color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
        status: 'coming_soon' as const
    },
    {
        title: 'Documents',
        description: 'Centralized storage for blueprints, contracts, and safety manuals.',
        icon: FileText,
        href: '/documents',
        color: 'bg-gradient-to-br from-pink-500 to-pink-600',
        status: 'coming_soon' as const
    },
    {
        title: 'Reports',
        description: 'Generate detailed analytics on costs, productivity, and safety incidents.',
        icon: BarChart3,
        href: '/reports',
        color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
        status: 'coming_soon' as const
    },
    {
        title: 'Settings',
        description: 'Configure system preferences, user roles, and company details.',
        icon: Settings,
        href: '/settings',
        color: 'bg-gradient-to-br from-gray-600 to-gray-700',
        status: 'coming_soon' as const
    }
];

export default function DashboardGrid() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">GrowthPoint</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                            Welcome back, Admin
                        </span>
                        <ThemeToggle />
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600">
                            <img
                                src="https://i.pravatar.cc/150?u=admin"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-400">Access your construction management modules.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MODULES.map((module) => (
                        <AppCard
                            key={module.title}
                            {...module}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
