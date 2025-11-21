import { create } from 'zustand';
import { InventoryItem, InventoryFilter, InventoryCategory, InventoryStatus } from '@/types/inventory';

interface InventoryState {
    items: InventoryItem[];
    filter: InventoryFilter;
    setFilter: (filter: Partial<InventoryFilter>) => void;
    addItem: (item: InventoryItem) => void;
    updateItem: (id: string, updates: Partial<InventoryItem>) => void;
    deleteItem: (id: string) => void;
}

const MOCK_INVENTORY: InventoryItem[] = [
    {
        id: '1',
        name: 'Caterpillar 320 Excavator',
        sku: 'HE-EXC-001',
        category: 'Heavy Equipment',
        status: 'In Use',
        quantity: 1,
        location: 'Site A - Downtown',
        imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Standard track excavator for general earthmoving.',
        lastMaintenance: '2023-10-15',
        nextMaintenance: '2024-01-15',
        purchaseDate: '2021-05-20',
        value: 125000,
        manufacturer: 'Caterpillar',
        model: '320',
    },
    {
        id: '2',
        name: 'DeWalt 20V Max Drill Kit',
        sku: 'TL-DRL-045',
        category: 'Tools',
        status: 'Available',
        quantity: 15,
        location: 'Warehouse A',
        imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Cordless drill/driver kit with 2 batteries.',
        purchaseDate: '2023-01-10',
        value: 199,
        manufacturer: 'DeWalt',
        model: 'DCD777C2',
    },
    {
        id: '3',
        name: 'Portland Cement (Type I)',
        sku: 'MAT-CMT-500',
        category: 'Materials',
        status: 'Low Stock',
        quantity: 40, // Bags
        location: 'Site B - Westside',
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'General purpose cement for concrete and mortar.',
        purchaseDate: '2023-11-01',
        value: 15,
    },
    {
        id: '4',
        name: 'Safety Helmet (Hard Hat)',
        sku: 'SG-HLM-100',
        category: 'Safety Gear',
        status: 'Available',
        quantity: 50,
        location: 'Warehouse A',
        imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'OSHA compliant high-visibility hard hat.',
        purchaseDate: '2023-06-15',
        value: 25,
        manufacturer: 'MSA',
    },
    {
        id: '5',
        name: 'Heavy Duty Construction Loader',
        sku: 'HE-LDR-003',
        category: 'Heavy Equipment',
        status: 'Maintenance',
        quantity: 1,
        location: 'Service Center',
        imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Heavy duty front loader for moving earth and materials.',
        lastMaintenance: '2023-11-20',
        nextMaintenance: '2023-11-25',
        purchaseDate: '2022-03-10',
        value: 180000,
        manufacturer: 'CAT',
        model: '950 GC',
    },
    {
        id: '6',
        name: 'Scaffolding Set (Steel)',
        sku: 'EQ-SCF-010',
        category: 'Tools',
        status: 'In Use',
        quantity: 5,
        location: 'Site A - Downtown',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Heavy duty steel scaffolding frames.',
        purchaseDate: '2021-09-05',
        value: 1200,
    },
    {
        id: '7',
        name: 'Rebar (Grade 60)',
        sku: 'MAT-RBR-200',
        category: 'Materials',
        status: 'Available',
        quantity: 500, // Rods
        location: 'Warehouse B',
        imageUrl: 'https://images.unsplash.com/photo-1613469425754-bf71d7280f65?auto=format&fit=crop&q=80&w=300&h=300',
        description: '#4 Rebar for concrete reinforcement.',
        purchaseDate: '2023-10-25',
        value: 8,
    },
    {
        id: '8',
        name: 'Reflective Safety Vest',
        sku: 'SG-VST-050',
        category: 'Safety Gear',
        status: 'Out of Stock',
        quantity: 0,
        location: 'Warehouse A',
        imageUrl: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Class 2 high-visibility safety vest.',
        purchaseDate: '2023-01-20',
        value: 12,
    }
];

export const useInventoryStore = create<InventoryState>((set) => ({
    items: MOCK_INVENTORY,
    filter: {
        search: '',
        category: null,
        status: null,
    },
    setFilter: (newFilter) => set((state) => ({
        filter: { ...state.filter, ...newFilter }
    })),
    addItem: (item) => set((state) => ({
        items: [...state.items, item]
    })),
    updateItem: (id, updates) => set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        )
    })),
    deleteItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
    })),
}));
