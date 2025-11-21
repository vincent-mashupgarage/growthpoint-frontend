export type EmployeeStatus = 'Active' | 'On Leave' | 'Remote' | 'Offline';

export interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    managerId?: string;
    status: EmployeeStatus;
    imageUrl: string;
    location: string;
    skills: string[];
    bio?: string;
    salary: number;
}
