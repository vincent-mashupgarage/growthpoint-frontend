'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { getStatusColor } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const statusColors = {
        'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'In Progress': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'On Hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        'Completed': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    };

    return (
        <Link href={`/projects/${project.id}`} className="group block">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-500/50">
                {/* Thumbnail */}
                <div className="h-48 w-full relative overflow-hidden">
                    {project.thumbnailUrl ? (
                        <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-400 text-lg font-medium">No Image</span>
                        </div>
                    )}
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-md ${statusColors[project.status]}`}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {project.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            Start: {new Date(project.startDate).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
                            <span className="text-gray-900 dark:text-white font-bold">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex -space-x-2">
                            {/* Mock Team Avatars */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-gray-500 font-medium">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            {project.teamIds.length > 3 && (
                                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-gray-500 font-medium">
                                    +{project.teamIds.length - 3}
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                            View Details <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
