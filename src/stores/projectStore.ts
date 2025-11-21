import { create } from 'zustand';
import { Project, Task, ProjectState, TaskStatus, ProjectStatus } from '@/types/project';

interface ProjectStore extends ProjectState {
    addProject: (project: Project) => void;
    addTask: (task: Task) => void;
    moveTask: (taskId: string, newStatus: TaskStatus) => void;
    updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
    getProjectById: (id: string) => Project | undefined;
    getTasksByProjectId: (projectId: string) => Task[];
}

const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'SM City Expansion',
        description: 'Construction of new North Wing annex and multi-level parking facility.',
        status: 'In Progress',
        startDate: '2024-01-15',
        endDate: '2026-06-30',
        location: 'Cebu City',
        managerId: '1',
        teamIds: ['2', '3', '5', '7'],
        progress: 35,
        thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        budget: {
            total: 150000000,
            spent: 45000000,
            currency: 'PHP'
        },
        resources: [
            { inventoryId: '1', quantity: 2, used: 2 }, // Excavators
            { inventoryId: '3', quantity: 5000, used: 1200 }, // Cement
            { inventoryId: '7', quantity: 2000, used: 800 } // Rebar
        ],
        createdAt: '2023-12-01',
        updatedAt: '2024-03-10'
    },
    {
        id: '2',
        title: 'Metro Gaisano Renovation',
        description: 'Interior renovation and structural reinforcement of the main department store.',
        status: 'Planning',
        startDate: '2024-04-01',
        location: 'Taguig City',
        managerId: '1',
        teamIds: ['4', '6', '8'],
        progress: 5,
        thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
        budget: {
            total: 25000000,
            spent: 500000,
            currency: 'PHP'
        },
        resources: [
            { inventoryId: '2', quantity: 20, used: 0 }, // Drills
            { inventoryId: '6', quantity: 50, used: 0 } // Scaffolding
        ],
        createdAt: '2024-02-15',
        updatedAt: '2024-03-12'
    },
    {
        id: '3',
        title: 'Prince Hypermart',
        description: 'Ground-up construction of a new hypermarket branch including warehouse.',
        status: 'On Hold',
        startDate: '2023-09-01',
        location: 'Davao City',
        managerId: '2',
        teamIds: ['3', '9', '10'],
        progress: 60,
        thumbnailUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1974&auto=format&fit=crop',
        budget: {
            total: 80000000,
            spent: 48000000,
            currency: 'PHP'
        },
        resources: [
            { inventoryId: '5', quantity: 1, used: 1 }, // Loader
            { inventoryId: '4', quantity: 100, used: 85 } // Helmets
        ],
        createdAt: '2023-08-01',
        updatedAt: '2024-01-20'
    }
];

const MOCK_TASKS: Task[] = [
    {
        id: 't1',
        projectId: '1',
        title: 'Foundation Pouring - Zone A',
        description: 'Coordinate with concrete supplier for continuous pour of main raft foundation.',
        status: 'Done',
        priority: 'Critical',
        assigneeId: '3',
        dueDate: '2024-02-28',
        comments: [],
        createdAt: '2024-01-20',
        updatedAt: '2024-02-29'
    },
    {
        id: 't2',
        projectId: '1',
        title: 'Structural Steel Inspection',
        description: 'Verify steel reinforcement for columns on 5th floor.',
        status: 'In Progress',
        priority: 'High',
        assigneeId: '2',
        dueDate: '2024-03-15',
        comments: [],
        createdAt: '2024-03-01',
        updatedAt: '2024-03-10'
    },
    {
        id: 't3',
        projectId: '1',
        title: 'MEP Rough-in Level 3',
        description: 'Install electrical conduits and plumbing pipes for 3rd floor units.',
        status: 'Todo',
        priority: 'Medium',
        assigneeId: '7',
        dueDate: '2024-03-20',
        comments: [],
        createdAt: '2024-03-05',
        updatedAt: '2024-03-05'
    },
    {
        id: 't4',
        projectId: '2',
        title: 'Finalize Architectural Drawings',
        description: 'Submit revised blueprints to city engineering office for approval.',
        status: 'In Progress',
        priority: 'High',
        assigneeId: '6',
        dueDate: '2024-03-25',
        comments: [],
        createdAt: '2024-02-20',
        updatedAt: '2024-03-11'
    }
];

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: MOCK_PROJECTS,
    tasks: MOCK_TASKS,

    addProject: (project) => set((state) => ({
        projects: [project, ...state.projects]
    })),

    addTask: (task) => set((state) => ({
        tasks: [task, ...state.tasks]
    })),

    moveTask: (taskId, newStatus) => set((state) => ({
        tasks: state.tasks.map(t =>
            t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
        )
    })),

    updateProjectStatus: (projectId, status) => set((state) => ({
        projects: state.projects.map(p =>
            p.id === projectId ? { ...p, status, updatedAt: new Date().toISOString() } : p
        )
    })),

    getProjectById: (id) => get().projects.find(p => p.id === id),

    getTasksByProjectId: (projectId) => get().tasks.filter(t => t.projectId === projectId)
}));
