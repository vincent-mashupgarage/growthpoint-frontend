'use client';

/**
 * Employees Page Error Boundary
 *
 * This error boundary is specific to the /employees route and its children.
 * It catches errors that occur while loading or displaying the employee directory.
 *
 * Why have a specific error boundary for employees?
 * - Custom Error Message - Show context-specific error messages
 * - Scoped Recovery - Only the employees section needs to recover, not the whole app
 * - Better UX - Users can navigate to other parts of the app even if employees page fails
 * - Debugging - Easier to identify which part of the app is failing
 *
 * Common errors this might catch:
 * - Failed to fetch employee data from API
 * - Invalid employee data format
 * - Component rendering errors
 * - State management errors
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

import { useEffect } from 'react';
import { AlertTriangle, Users } from 'lucide-react';

export default function EmployeesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging
    console.error('Employees page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Employees
          </h1>

          {/* Error Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We encountered an error while loading the employee directory. This might be due to a network issue or a temporary server problem.
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
          <div className="flex gap-3 w-full">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go home
            </button>
          </div>

          {/* Helpful Tips */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 w-full">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Try these steps:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 text-left space-y-1">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Clear your browser cache</li>
              <li>• Contact support if the issue persists</li>
            </ul>
          </div>

          {/* Error ID */}
          {error.digest && (
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
