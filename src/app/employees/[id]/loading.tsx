/**
 * Employee Detail Loading Skeleton
 *
 * Displays while individual employee data is being fetched.
 */

export default function EmployeeDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="mr-4 w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full animate-skeleton"></div>
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden border dark:border-gray-800">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800"></div>

          <div className="px-6 pb-6">
            <div className="relative flex flex-col sm:flex-row items-end -mt-12 mb-6">
              <div className="relative w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-900 animate-skeleton"></div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                    <div className="h-6 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-skeleton"></div>
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded-md animate-skeleton"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 gap-4">
              <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-t animate-skeleton"></div>
              <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-t animate-skeleton"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-t animate-skeleton"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-skeleton"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-skeleton"></div>
                  </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-3">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-3">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-skeleton"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-skeleton"></div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm space-y-4">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-skeleton"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
