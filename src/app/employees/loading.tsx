/**
 * Employees List Loading Skeleton
 *
 * Displays while employee data is being fetched.
 * Uses skeleton screens to show the layout before content loads.
 */

export default function EmployeesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10">
        <div className="flex items-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
          <div className="ml-3 h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-skeleton"></div>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-3">
          <div className="flex-1 sm:flex-initial h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-skeleton"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-md animate-skeleton"></div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-md animate-skeleton"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-skeleton"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
                  <div className="p-4 flex items-start space-x-4">
                    <div className="relative w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-skeleton"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      <div className="flex gap-1">
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 flex justify-between items-center">
                    <div className="flex space-x-3">
                      <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-skeleton"></div>
                      <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-skeleton"></div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
