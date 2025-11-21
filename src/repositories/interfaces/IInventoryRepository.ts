import { InventoryItem } from '@/types/inventory';

/**
 * Inventory Repository Interface
 *
 * Defines the contract for inventory data access operations.
 * Provides abstraction for different data sources.
 */
export interface IInventoryRepository {
    /**
     * Fetch all inventory items
     *
     * @returns Promise resolving to array of all inventory items
     */
    getAll(): Promise<InventoryItem[]>;

    /**
     * Fetch a single inventory item by ID
     *
     * @param id - The item ID
     * @returns Promise resolving to item or undefined if not found
     */
    getById(id: string): Promise<InventoryItem | undefined>;

    /**
     * Fetch inventory items by category
     *
     * @param category - The inventory category
     * @returns Promise resolving to array of items in that category
     */
    getByCategory(category: string): Promise<InventoryItem[]>;

    /**
     * Fetch inventory items by status
     *
     * @param status - The inventory status
     * @returns Promise resolving to array of items with that status
     */
    getByStatus(status: string): Promise<InventoryItem[]>;

    /**
     * Create a new inventory item
     *
     * @param item - The item data (without ID)
     * @returns Promise resolving to the created item with ID
     */
    create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem>;

    /**
     * Update an existing inventory item
     *
     * @param id - The item ID
     * @param updates - Partial item data to update
     * @returns Promise resolving to the updated item
     */
    update(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem>;

    /**
     * Delete an inventory item
     *
     * @param id - The item ID
     * @returns Promise resolving to success boolean
     */
    delete(id: string): Promise<boolean>;
}
