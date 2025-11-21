'use client';

import React, { useMemo } from 'react';
import { useInventoryStore } from '@/stores/inventoryStore';
import { InventoryCategory, InventoryStatus } from '@/types/inventory';

const CATEGORIES: InventoryCategory[] = [
    'Heavy Equipment',
    'Tools',
    'Materials',
    'Safety Gear',
    'Vehicles'
];

const STATUSES: InventoryStatus[] = [
    'Available',
    'In Use',
    'Maintenance',
    'Low Stock',
    'Out of Stock',
    'Retired'
];

export default function InventoryFilter() {
    const filter = useInventoryStore((state) => state.filter);
    const setFilter = useInventoryStore((state) => state.setFilter);
    const items = useInventoryStore((state) => state.items);

    // Memoize category counts to avoid recalculating on every render
    // Only recalculates when items array changes
    const categoryCounts = useMemo(() => {
        return CATEGORIES.reduce((acc, cat) => {
            acc[cat] = items.filter(i => i.category === cat).length;
            return acc;
        }, {} as Record<string, number>);
    }, [items]);

    // Memoize status counts for performance optimization
    const statusCounts = useMemo(() => {
        return STATUSES.reduce((acc, stat) => {
            acc[stat] = items.filter(i => i.status === stat).length;
            return acc;
        }, {} as Record<string, number>);
    }, [items]);

    const allCount = items.length;

    return (
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-64px)] overflow-y-auto hidden md:block transition-colors">
            <div className="p-4 space-y-6">
                {/* Categories Section */}
                <div>
                    <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Categories
                    </h2>
                    <nav className="space-y-1">
                        <button
                            onClick={() => setFilter({ category: null })}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.category === null
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <span>All Items</span>
                            <span className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs ${filter.category === null ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
                                }`}>
                                {allCount}
                            </span>
                        </button>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter({ category: cat })}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.category === cat
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span>{cat}</span>
                                <span className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs ${filter.category === cat ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
                                    }`}>
                                    {categoryCounts[cat] || 0}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Status Section */}
                <div>
                    <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Status
                    </h2>
                    <nav className="space-y-1">
                        <button
                            onClick={() => setFilter({ status: null })}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.status === null
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <span>Any Status</span>
                        </button>
                        {STATUSES.map((stat) => (
                            <button
                                key={stat}
                                onClick={() => setFilter({ status: stat })}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${filter.status === stat
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span>{stat}</span>
                                <span className={`bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs ${filter.status === stat ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''
                                    }`}>
                                    {statusCounts[stat] || 0}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
