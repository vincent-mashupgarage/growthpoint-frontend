'use client';

/**
 * Employee Detail Page Error Boundary
 *
 * This error boundary is specific to individual employee detail pages (/employees/[id]).
 * It handles errors that occur when viewing a specific employee's profile.
 *
 * Why have a specific error boundary for employee details?
 * - Contextual Errors - Handle employee-specific errors (e.g., employee not found, invalid ID)
 * - Better Navigation - Users can go back to the employee list easily
 * - Scoped Recovery - Only the detail page needs to recover, not the entire employees section
 * - User Guidance - Provide specific actions based on the error type
 *
 * Common errors this might catch:
 * - Employee ID not found (404-like errors)
 * - Invalid employee ID format
 * - Failed to load employee details from API
 * - Missing or corrupted employee data
 * - Component rendering errors in tabs or sections
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, User, ArrowLeft } from 'lucide-react';

export default function EmployeeDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error for debugging
    console.error('Employee detail page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => router.push('/employees')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Employee Profile</h1>
        </div>
      </div>

      {/* Error Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Unable to Load Employee
            </h2>

            {/* Error Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't load this employee's profile. The employee may not exist, or there might be a temporary issue.
            </p>

            {/* Error Details in Development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="w-full mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Error Details:
                </p>
                <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                  {error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Try again
              </button>
              <button
                onClick={() => router.push('/employees')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back to employee list
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors"
              >
                Go to home page
              </button>
            </div>

            {/* Error ID */}
            {error.digest && (
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
