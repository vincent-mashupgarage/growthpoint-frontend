import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
