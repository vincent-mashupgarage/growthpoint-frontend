'use client';

import React from 'react';
import { Project } from '@/types/project';
import { useInventoryStore } from '@/stores/inventoryStore';
import { Package, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ProjectResourcesProps {
    project: Project;
}

export default function ProjectResources({ project }: ProjectResourcesProps) {
    const allItems = useInventoryStore(state => state.items);

    // Map project resources to actual inventory items
    const resources = React.useMemo(() => {
        return project.resources.map(res => {
            const item = allItems.find(i => i.id === res.inventoryId);
            return {
                ...res,
                details: item
            };
        }).filter(r => r.details !== undefined);
    }, [allItems, project.resources]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Resources</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{resources.length} Items</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Equipment</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {resources.filter(r => r.details?.category === 'Heavy Equipment' || r.details?.category === 'Tools').length} Units
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Materials</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {resources.filter(r => r.details?.category === 'Materials').length} Types
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700/50">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
                    <h3 className="font-bold text-gray-900 dark:text-white">Allocated Resources</h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        {resources.length} Items
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Allocated</th>
                                <th className="px-6 py-4">Used / Consumed</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {resources.map((resource) => {
                                const usagePercent = (resource.used / resource.quantity) * 100;
                                return (
                                    <tr key={resource.inventoryId} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                                                    {resource.details?.imageUrl ? (
                                                        <img src={resource.details.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                                                    ) : (
                                                        <Package className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{resource.details?.name}</p>
                                                    <p className="text-xs text-gray-500 font-mono mt-0.5">{resource.details?.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                                {resource.details?.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                            {resource.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8 text-right">{resource.used}</span>
                                                <div className="w-32 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${usagePercent >= 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {usagePercent >= 100 ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full ring-1 ring-red-600/10 dark:ring-red-500/20">
                                                    <AlertTriangle className="w-3.5 h-3.5" /> Depleted
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full ring-1 ring-emerald-600/10 dark:ring-emerald-500/20">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
