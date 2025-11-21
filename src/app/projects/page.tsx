'use client';

import React from 'react';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectsPage() {
    const projects = useProjectStore((state) => state.projects);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <ProjectHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Projects</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Track progress, manage tasks, and monitor deadlines for all ongoing construction sites.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </main>
        </div>
    );
}
