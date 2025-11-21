import { Employee } from '@/types/employee';

/**
 * Employee Repository Interface
 *
 * Defines the contract for employee data access operations.
 * This abstraction layer allows easy switching between:
 * - Mock data (current implementation)
 * - REST API calls (future)
 * - GraphQL queries (future)
 * - Local storage (offline mode)
 *
 * Benefits:
 * - Separation of concerns (data access vs. state management)
 * - Easy to test (mock the repository)
 * - Easy to migrate to real API
 * - Consistent interface regardless of data source
 */
export interface IEmployeeRepository {
    /**
     * Fetch all employees from the data source
     *
     * @returns Promise resolving to array of all employees
     */
    getAll(): Promise<Employee[]>;

    /**
     * Fetch a single employee by ID
     *
     * @param id - The employee ID
     * @returns Promise resolving to employee or undefined if not found
     */
    getById(id: string): Promise<Employee | undefined>;

    /**
     * Fetch employees by department
     *
     * @param department - The department name
     * @returns Promise resolving to array of employees in that department
     */
    getByDepartment(department: string): Promise<Employee[]>;

    /**
     * Create a new employee record
     *
     * @param employee - The employee data (without ID)
     * @returns Promise resolving to the created employee with ID
     */
    create(employee: Omit<Employee, 'id'>): Promise<Employee>;

    /**
     * Update an existing employee record
     *
     * @param id - The employee ID
     * @param updates - Partial employee data to update
     * @returns Promise resolving to the updated employee
     */
    update(id: string, updates: Partial<Employee>): Promise<Employee>;

    /**
     * Delete an employee record
     *
     * @param id - The employee ID
     * @returns Promise resolving to success boolean
     */
    delete(id: string): Promise<boolean>;
}
