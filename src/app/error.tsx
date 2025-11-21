'use client';

/**
 * Global Error Boundary Component
 *
 * This is a Next.js error boundary that catches runtime errors throughout the application.
 * It prevents the entire application from crashing and shows a user-friendly error message instead.
 *
 * How it works:
 * - Next.js automatically wraps this component around your application
 * - When an error occurs anywhere in the app, this component is rendered
 * - Users see a friendly error message instead of a blank screen
 * - The error is logged to the console for debugging
 *
 * Benefits:
 * - Better UX - Users don't see a blank/crashed screen
 * - Error Recovery - Users can try to recover from errors
 * - Debugging - Errors are logged with full stack traces
 * - Production Ready - Graceful error handling in production
 *
 * The component receives two props from Next.js:
 * - error: The error object containing the error message and stack trace
 * - reset: A function to attempt to recover from the error by re-rendering
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console for debugging
    // In production, you might want to send this to an error tracking service like Sentry
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong!
          </h1>

          {/* Error Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="w-full mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
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
              Try again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go home
            </button>
          </div>

          {/* Error Digest (for production error tracking) */}
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
