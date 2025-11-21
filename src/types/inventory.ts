export type InventoryCategory = 'Heavy Equipment' | 'Tools' | 'Materials' | 'Safety Gear' | 'Vehicles';

export type InventoryStatus = 'Available' | 'In Use' | 'Maintenance' | 'Retired' | 'Low Stock' | 'Out of Stock';

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: InventoryCategory;
    status: InventoryStatus;
    quantity: number;
    location: string; // e.g., "Warehouse A", "Site B"
    imageUrl: string;
    description: string;
    lastMaintenance?: string;
    nextMaintenance?: string;
    assignedTo?: string; // Employee ID if applicable
    purchaseDate: string;
    value: number;
    manufacturer?: string;
    model?: string;
}

export interface InventoryFilter {
    search: string;
    category: InventoryCategory | null;
    status: InventoryStatus | null;
}
