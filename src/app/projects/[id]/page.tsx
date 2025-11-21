'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProjectStore } from '@/stores/projectStore';
import KanbanBoard from '@/components/projects/KanbanBoard';
import ProjectOverview from '@/components/projects/ProjectOverview';
import ProjectTeam from '@/components/projects/ProjectTeam';
import ProjectResources from '@/components/projects/ProjectResources';
import { ArrowLeft, Calendar, MapPin, MoreVertical, Plus, LayoutDashboard, Users, Package, Kanban } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import * as Tabs from '@radix-ui/react-tabs';

export default function ProjectDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const project = useProjectStore(state => state.getProjectById(id));

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Not Found</h2>
                    <Link href="/projects" className="text-blue-600 hover:underline mt-2 inline-block">
                        Return to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors overflow-hidden">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        href="/projects"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {project.title}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${project.status === 'In Progress' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' :
                                'bg-gray-50 text-gray-600 border-gray-200'
                                }`}>
                                {project.status}
                            </span>
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Due: {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Tabs & Content */}
            <Tabs.Root defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Tabs.List className="flex gap-8">
                            <Tabs.Trigger
                                value="overview"
                                className="group relative flex items-center gap-2 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Overview
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="tasks"
                                className="group relative flex items-center gap-2 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                            >
                                <Kanban className="w-4 h-4" />
                                Tasks
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="resources"
                                className="group relative flex items-center gap-2 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                            >
                                <Package className="w-4 h-4" />
                                Resources
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
                            </Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                    <Tabs.Content value="overview" className="outline-none animate-in fade-in duration-300">
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                            <ProjectOverview project={project} />
                            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Team</h3>
                                <ProjectTeam project={project} />
                            </div>
                        </main>
                    </Tabs.Content>

                    <Tabs.Content value="tasks" className="h-full outline-none animate-in fade-in duration-300">
                        <div className="h-full px-4 sm:px-6 lg:px-8 py-8 overflow-x-auto">
                            <div className="min-w-[1024px] h-full">
                                <KanbanBoard projectId={project.id} />
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="resources" className="outline-none animate-in fade-in duration-300">
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <ProjectResources project={project} />
                        </main>
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </div>
    );
}
