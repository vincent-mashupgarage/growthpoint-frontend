'use client';

import React, { useCallback, useMemo } from 'react';
import { useInventoryStore } from '@/stores/inventoryStore';
import Link from 'next/link';
import { Search, Plus, Filter, LayoutGrid } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeToggle } from '@/components/theme-toggle';
import { debounce, sanitizeInput } from '@/lib/utils';

export default function InventoryHeader() {
    const filter = useInventoryStore((state) => state.filter);
    const setFilter = useInventoryStore((state) => state.setFilter);

    /**
     * Debounced search handler
     *
     * Delays search filter update by 300ms to prevent excessive re-renders.
     * Includes input sanitization to prevent XSS attacks.
     */
    const debouncedSetFilter = useMemo(
        () => debounce((value: string) => {
            const sanitized = sanitizeInput(value);
            setFilter({ search: sanitized });
        }, 300),
        [setFilter]
    );

    /**
     * Handle search input change with validation
     *
     * Validation rules:
     * - Maximum length: 100 characters (prevents DoS attacks)
     * - Allowed characters: alphanumeric, spaces, hyphens, slashes, parentheses
     * - Prevents: Special characters that could be used for XSS or injection
     *
     * Benefits:
     * - Security: Prevents malicious input before it reaches the store
     * - Performance: Rejects overly long inputs that could slow down filtering
     * - UX: Allows common inventory search patterns (SKUs, model numbers)
     */
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Validate input length to prevent DoS
        if (value.length > 100) {
            return; // Silently reject - don't update
        }

        // Allow safe characters including those common in SKUs and product codes
        // Letters, numbers, spaces, hyphens, slashes, parentheses, periods
        const safePattern = /^[a-zA-Z0-9\s\-/.()]*$/;
        if (!safePattern.test(value)) {
            return; // Silently reject invalid characters
        }

        debouncedSetFilter(value);
    }, [debouncedSetFilter]);

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10 transition-colors">
            <div className="flex items-center">
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <Link
                            href="/"
                            className="mr-4 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors group"
                        >
                            <LayoutGrid className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium text-sm hidden sm:inline-block group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                Dashboard
                            </span>
                        </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50" sideOffset={5}>
                            Return to App Launcher
                            <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
                <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Assets
                </span>
            </div>

            <div className="flex items-center w-full sm:w-auto gap-3">
                <div className="relative flex-1 sm:flex-initial">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                        defaultValue={filter.search}
                        onChange={handleSearchChange}
                    />
                </div>

                <ThemeToggle />

                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg" sideOffset={5}>
                            Add new inventory item
                            <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>

                <button className="sm:hidden inline-flex items-center p-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
