import { create } from 'zustand';
import { Employee } from '@/types/employee';

interface EmployeeFilter {
    department: string | null;
    search: string;
}

interface EmployeeState {
    employees: Employee[];
    filter: EmployeeFilter;
    setFilter: (filter: Partial<EmployeeFilter>) => void;
    getEmployeeById: (id: string) => Employee | undefined;
}

const MOCK_EMPLOYEES: Employee[] = [
    {
        id: '1',
        name: 'Richard Steel',
        role: 'Project Manager',
        department: 'Operations',
        email: 'richard.steel@growthpoint.com',
        phone: '+1 (555) 123-4567',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=1',
        location: 'Site A - Downtown',
        skills: ['Project Management', 'Budgeting', 'Risk Management'],
        bio: 'Richard has over 15 years of experience managing large-scale commercial construction projects.',
    },
    {
        id: '2',
        name: 'Sarah Concrete',
        role: 'Senior Civil Engineer',
        department: 'Engineering & Design',
        email: 'sarah.concrete@growthpoint.com',
        phone: '+1 (555) 234-5678',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=2',
        location: 'HQ - Engineering Wing',
        skills: ['Structural Analysis', 'AutoCAD', 'Revit', 'Concrete Design'],
        managerId: '1',
        bio: 'Sarah specializes in reinforced concrete structures and seismic design.',
    },
    {
        id: '3',
        name: 'Mike Hammer',
        role: 'Site Foreman',
        department: 'Operations',
        email: 'mike.hammer@growthpoint.com',
        phone: '+1 (555) 345-6789',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=3',
        location: 'Site A - Downtown',
        skills: ['Team Leadership', 'Blueprint Reading', 'OSHA Safety'],
        managerId: '1',
        bio: 'Mike ensures daily site operations run smoothly and safely.',
    },
    {
        id: '4',
        name: 'Emily Safety',
        role: 'Safety Officer',
        department: 'Safety & Compliance',
        email: 'emily.safety@growthpoint.com',
        phone: '+1 (555) 456-7890',
        status: 'On Leave',
        imageUrl: 'https://i.pravatar.cc/150?u=4',
        location: 'Roaming / All Sites',
        skills: ['Risk Assessment', 'Safety Audits', 'First Aid'],
        managerId: '1',
        bio: 'Emily is dedicated to maintaining zero-accident workplaces across all projects.',
    },
    {
        id: '5',
        name: 'David Brick',
        role: 'Master Mason',
        department: 'Operations',
        email: 'david.brick@growthpoint.com',
        phone: '+1 (555) 567-8901',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=5',
        location: 'Site B - Westside',
        skills: ['Masonry', 'Bricklaying', 'Stone Work'],
        managerId: '3',
    },
    {
        id: '6',
        name: 'Lisa Draft',
        role: 'Architect',
        department: 'Engineering & Design',
        email: 'lisa.draft@growthpoint.com',
        phone: '+1 (555) 678-9012',
        status: 'Remote',
        imageUrl: 'https://i.pravatar.cc/150?u=6',
        location: 'Remote',
        skills: ['Architectural Design', 'SketchUp', 'Sustainable Design'],
        managerId: '2',
    },
    {
        id: '7',
        name: 'Tom Voltage',
        role: 'Lead Electrician',
        department: 'Operations',
        email: 'tom.voltage@growthpoint.com',
        phone: '+1 (555) 789-0123',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=7',
        location: 'Site A - Downtown',
        skills: ['Electrical Systems', 'Wiring', 'Troubleshooting'],
        managerId: '3',
    },
    {
        id: '8',
        name: 'Jerry Crane',
        role: 'Heavy Equipment Operator',
        department: 'Equipment Management',
        email: 'jerry.crane@growthpoint.com',
        phone: '+1 (555) 890-1234',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=8',
        location: 'Site B - Westside',
        skills: ['Crane Operation', 'Excavator Operation', 'Safety Protocols'],
        managerId: '3',
    },
    {
        id: '9',
        name: 'Fiona Supply',
        role: 'Procurement Specialist',
        department: 'Procurement',
        email: 'fiona.supply@growthpoint.com',
        phone: '+1 (555) 901-2345',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=9',
        location: 'HQ - Main Office',
        skills: ['Vendor Management', 'Supply Chain', 'Negotiation'],
        managerId: '1',
    },
    {
        id: '10',
        name: 'Bob Builder',
        role: 'General Laborer',
        department: 'Operations',
        email: 'bob.builder@growthpoint.com',
        phone: '+1 (555) 012-3456',
        status: 'Active',
        imageUrl: 'https://i.pravatar.cc/150?u=10',
        location: 'Site A - Downtown',
        skills: ['General Labor', 'Site Cleanup', 'Assistance'],
        managerId: '3',
    },
];

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: MOCK_EMPLOYEES,
    filter: {
        search: '',
        department: null,
    },
    setFilter: (newFilter) =>
        set((state) => ({ filter: { ...state.filter, ...newFilter } })),
    getEmployeeById: (id) => get().employees.find((e) => e.id === id),
}));



