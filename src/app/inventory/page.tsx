'use client';

import React from 'react';
import { useInventoryStore } from '@/stores/inventoryStore';
import InventoryCard from '@/components/inventory/InventoryCard';
import InventoryFilter from '@/components/inventory/InventoryFilter';
import InventoryHeader from '@/components/inventory/InventoryHeader';

export default function InventoryDirectoryPage() {
    const items = useInventoryStore((state) => state.items);
    const filter = useInventoryStore((state) => state.filter);

    const filteredItems = React.useMemo(() => {
        return items.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                item.sku.toLowerCase().includes(filter.search.toLowerCase()) ||
                item.description.toLowerCase().includes(filter.search.toLowerCase());

            const matchesCategory =
                filter.category === null || item.category === filter.category;

            const matchesStatus =
                filter.status === null || item.status === filter.status;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [items, filter]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
            <InventoryHeader />
            <div className="flex flex-1 overflow-hidden">
                <InventoryFilter />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No items found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item) => (
                                <InventoryCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
