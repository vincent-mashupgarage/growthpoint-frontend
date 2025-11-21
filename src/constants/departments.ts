/**
 * Department Constants
 *
 * Centralized list of all departments in GrowthPoint Construction.
 * This ensures consistency across filtering, validation, and employee management.
 *
 * Benefits:
 * - Single source of truth for department names
 * - Easy to add/remove departments
 * - Type-safe usage throughout the application
 * - Prevents typos in department names
 *
 * Usage:
 * ```tsx
 * import { DEPARTMENTS } from '@/constants/departments';
 *
 * DEPARTMENTS.map(dept => <option value={dept}>{dept}</option>)
 * ```
 */

/**
 * List of all departments in the organization
 */
export const DEPARTMENTS = [
    'Operations',
    'Engineering & Design',
    'Safety & Compliance',
    'Equipment Management',
    'Procurement',
] as const;

/**
 * TypeScript type for department names
 * Derived from the DEPARTMENTS array
 */
export type Department = typeof DEPARTMENTS[number];

/**
 * Check if a string is a valid department name
 *
 * @param value - The string to validate
 * @returns True if the value is a valid department name
 *
 * @example
 * isValidDepartment('Operations')  // Returns true
 * isValidDepartment('Marketing')   // Returns false
 */
export function isValidDepartment(value: string): value is Department {
    return DEPARTMENTS.includes(value as Department);
}
