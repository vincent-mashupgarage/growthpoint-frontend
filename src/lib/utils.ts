import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EmployeeStatus } from "@/types/employee";

/**
 * Utility function to merge Tailwind CSS classes
 *
 * This function combines clsx and tailwind-merge to:
 * 1. Handle conditional classes (via clsx)
 * 2. Properly merge Tailwind classes without conflicts (via tailwind-merge)
 *
 * Example:
 * ```tsx
 * cn("px-2 py-1", condition && "bg-blue-500", "px-4")
 * // Result: "py-1 bg-blue-500 px-4" (px-4 overrides px-2)
 * ```
 *
 * Benefits:
 * - Prevents Tailwind class conflicts
 * - Supports conditional classes
 * - Type-safe with TypeScript
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the Tailwind CSS background color class for an employee status
 *
 * This centralizes status color logic to ensure consistency across the application.
 * Instead of duplicating color logic in multiple components, we have a single source of truth.
 *
 * Example:
 * ```tsx
 * const color = getStatusColor('Active'); // Returns 'bg-green-500'
 * <div className={color} />
 * ```
 *
 * Benefits:
 * - DRY (Don't Repeat Yourself) - Single source of truth for status colors
 * - Consistency - All status indicators use the same color scheme
 * - Maintainability - Change colors in one place to update everywhere
 * - Type-safe - TypeScript ensures only valid status values are passed
 *
 * @param status - The employee status (Active, Remote, On Leave, Offline)
 * @returns Tailwind CSS background color class
 */
export function getStatusColor(status: EmployeeStatus): string {
  const statusColorMap: Record<EmployeeStatus, string> = {
    'Active': 'bg-green-500',
    'Remote': 'bg-blue-500',
    'On Leave': 'bg-yellow-500',
    'Offline': 'bg-gray-400',
  };

  return statusColorMap[status];
}

/**
 * Get a human-readable label for an employee status
 *
 * This function provides accessible text labels for status indicators,
 * which is important for screen readers and users who cannot distinguish colors.
 *
 * Example:
 * ```tsx
 * const label = getStatusLabel('Active'); // Returns 'Currently active'
 * <div aria-label={label} />
 * ```
 *
 * Benefits:
 * - Accessibility - Provides text alternatives for visual indicators
 * - WCAG Compliance - Helps meet accessibility standards
 * - Better UX - Users get clear status information
 *
 * @param status - The employee status
 * @returns Human-readable status label
 */
export function getStatusLabel(status: EmployeeStatus): string {
  const statusLabelMap: Record<EmployeeStatus, string> = {
    'Active': 'Currently active',
    'Remote': 'Working remotely',
    'On Leave': 'Currently on leave',
    'Offline': 'Currently offline',
  };

  return statusLabelMap[status];
}

/**
 * Debounce function to limit how often a function can be called
 *
 * This is a higher-order function that wraps another function and delays its execution
 * until after a certain amount of time has passed without it being called again.
 *
 * Example:
 * ```tsx
 * const debouncedSearch = debounce((query: string) => {
 *   searchAPI(query);
 * }, 300);
 *
 * // User types: "h" -> "e" -> "l" -> "l" -> "o"
 * // API is only called once, 300ms after the last keystroke
 * ```
 *
 * Benefits:
 * - Performance - Reduces unnecessary function calls (e.g., API requests)
 * - UX - Prevents lag while typing in search fields
 * - Resource Saving - Fewer network requests, less CPU usage
 *
 * Use cases:
 * - Search inputs (wait for user to stop typing)
 * - Window resize handlers
 * - Scroll event listeners
 *
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds (typical: 300ms for search, 150ms for UI updates)
 * @returns Debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Sanitize user input to prevent XSS attacks
 *
 * This function removes potentially dangerous characters from user input
 * before using it in the application. It's a basic sanitization layer.
 *
 * Example:
 * ```tsx
 * const userInput = "<script>alert('xss')</script>";
 * const safe = sanitizeInput(userInput);
 * // Returns: "scriptalert('xss')/script" (tags removed)
 * ```
 *
 * Benefits:
 * - Security - Prevents XSS (Cross-Site Scripting) attacks
 * - Data Integrity - Ensures input matches expected format
 * - Defense in Depth - Additional security layer
 *
 * Note: This is basic sanitization. For HTML rendering, use a proper
 * sanitization library like DOMPurify.
 *
 * @param input - The user input string to sanitize
 * @returns Sanitized string safe for use
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '')  // Remove < characters
    .replace(/>/g, '')  // Remove > characters
    .replace(/"/g, '')  // Remove double quotes
    .replace(/'/g, '')  // Remove single quotes
    .replace(/`/g, '')  // Remove backticks
    .trim();            // Remove leading/trailing whitespace
}
