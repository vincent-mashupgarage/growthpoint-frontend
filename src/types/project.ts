export type ProjectStatus = 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    assigneeId?: string;
    dueDate?: string;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface ProjectBudget {
    total: number;
    spent: number;
    currency: string;
}

export interface ProjectResource {
    inventoryId: string;
    quantity: number;
    used: number;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    endDate?: string;
    location: string;
    managerId: string;
    teamIds: string[];
    progress: number; // 0-100
    thumbnailUrl?: string;
    budget: ProjectBudget;
    resources: ProjectResource[];
    createdAt: string;
    updatedAt: string;
}

export interface ProjectState {
    projects: Project[];
    tasks: Task[];
}
