// ============================================================================
// FILE: app/discover-example/page.tsx
// ============================================================================
// Description: An example page for discovering baby names.
// Demonstrates client-side data fetching, loading states, error handling,
// filtering, pagination, and usage of custom components.

'use client'; // This page uses client-side React hooks.

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; // Next.js hooks for routing and search params

// Adjust import paths based on your project structure
import { Name, ApiSuccessResponse, ApiErrorResponse } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NameCardExample from '@/components/NameCardExample';

/**
 * A debounce function to delay execution of a function.
 * Useful for preventing excessive API calls on rapid input changes (e.g., typing in a search box).
 * @template F The type of the function to debounce.
 * @param func The function to debounce.
 * @param waitFor The debounce delay in milliseconds.
 * @returns A debounced version of the function.
 */
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void; // Ensure void return for typical debounced event handlers
};

export default function DiscoverExamplePage() {
  // State for storing fetched names, loading status, and errors
  const [names, setNames] = useState<Name[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0); // For accurate pagination text

  // Next.js hooks for accessing URL search parameters and navigation
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State for filters and pagination, initialized from URL search parameters or defaults
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
  const [genderFilter, setGenderFilter] = useState(() => searchParams.get('gender') || 'All');
  const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get('page') || '1', 10));
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 6; // Number of names to display per page

  /**
   * Updates the URL query parameters based on new filter/pagination values.
   * This function is memoized with useCallback to prevent unnecessary re-creations.
   */
  const updateQueryParams = useCallback((newParams: Record<string, string | number | undefined>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || String(value).trim() === '' || (key === 'gender' && value === 'All') || (key === 'page' && value === 1)) {
        current.delete(key); // Remove param if it's empty, default gender, or first page
      } else {
        current.set(key, String(value));
      }
    });

    const query = current.toString();
    // Push the new URL to the router. scroll: false prevents scrolling to top.
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [searchParams, router, pathname]);


  /**
   * Fetches names from the API based on current filter and pagination parameters.
   * Memoized with useCallback.
   */
  const fetchNames = useCallback(async (params: { search: string; gender: string; page: number; limit: number }) => {
    setIsLoading(true);
    setError(null);

    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.gender && params.gender !== 'All') query.set('gender', params.gender);
    query.set('page', String(params.page));
    query.set('limit', String(params.limit));

    try {
      const response = await fetch(`/api/names-example?${query.toString()}`); // Fetch from the mock API
      if (!response.ok) {
        // Try to parse error response from API, otherwise use a generic message
        let errorData: ApiErrorResponse | null = null;
        try {
          errorData = await response.json();
        } catch (parseError) {
          // Ignore if response is not JSON
        }
        throw new Error(errorData?.message || `API request failed with status: ${response.status}`);
      }
      const result: ApiSuccessResponse<Name[]> = await response.json();
      setNames(result.data || []);
      setTotalPages(result.meta?.totalPages || 1);
      setCurrentPage(result.meta?.page || 1); // Ensure currentPage is updated from API response
      setTotalItems(result.meta?.total || 0); // Store total items for pagination display
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred while fetching names.');
      setNames([]); // Clear names on error
      setTotalPages(1); // Reset total pages on error
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies, as it uses passed-in params

  /**
   * A debounced version of fetchNames, used for search input to limit API calls.
   * Memoized with useMemo to ensure the debounced function is stable.
   */
  const debouncedFetchNames = useMemo(() => debounce(fetchNames, 400), [fetchNames]);

  /**
   * useEffect hook to fetch names when URL search parameters change (e.g., browser back/forward).
   * Also updates local state (searchTerm, genderFilter, currentPage) to reflect URL.
   */
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentGender = searchParams.get('gender') || 'All';
    const currentPageNum = parseInt(searchParams.get('page') || '1', 10);

    // Update local state to match URL (important for browser navigation)
    setSearchTerm(currentSearch);
    setGenderFilter(currentGender);
    // setCurrentPage(currentPageNum); // fetchNames will update this from API response

    // Fetch names based on the current URL parameters
    fetchNames({ search: currentSearch, gender: currentGender, page: currentPageNum, limit: itemsPerPage });
  }, [searchParams, fetchNames, itemsPerPage]); // Re-run when searchParams or fetchNames changes

  // Event handlers for filter changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm); // Update local state immediately for responsiveness
    // setCurrentPage(1); // Reset to first page on new search - updateQueryParams will handle this
    // Update URL and trigger debounced fetch
    updateQueryParams({ search: newSearchTerm, gender: genderFilter, page: 1 });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenderFilter = event.target.value;
    setGenderFilter(newGenderFilter); // Update local state
    // setCurrentPage(1); // Reset to first page - updateQueryParams will handle this
    // Update URL and trigger fetch
    updateQueryParams({ search: searchTerm, gender: newGenderFilter, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page numbers
    // setCurrentPage(newPage); // Update local state - updateQueryParams will handle this
    // Update URL and trigger fetch
    updateQueryParams({ search: searchTerm, gender: genderFilter, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  // Example favorite toggle handler (implement actual logic as needed)
  const handleToggleFavorite = useCallback((nameId: string) => {
    console.log(`Toggle favorite for name ID: ${nameId}`);
    // In a real app:
    // 1. Make an API call to update the favorite status in the database.
    // 2. Update the local 'names' state to reflect the change, or re-fetch.
    // Example of local state update (if you add 'isFavorite' to Name interface and manage it):
    // setNames(prevNames =>
    //   prevNames.map(name =>
    //     name.id === nameId ? { ...name, isFavorite: !name.isFavorite } : name
    //   )
    // );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl antialiased">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-pink-700 tracking-tight sm:text-5xl lg:text-6xl">
          Discover Baby Names
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore a world of names. Use the filters below to find the perfect one for your little stork.
        </p>
      </header>

      {/* Filters Section */}
      <section aria-labelledby="filter-names-heading" className="mb-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 id="filter-names-heading" className="sr-only">Filter Names</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">
              Search by Name, Meaning, or Origin
            </label>
            <input
              type="search"
              id="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="E.g., Aurora, Fiery, Latin..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out placeholder-gray-400"
              aria-describedby="search-description"
            />
            <p id="search-description" className="sr-only">Enter a search term to filter names.</p>
          </div>
          <div>
            <label htmlFor="gender-select" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender-select"
              value={genderFilter}
              onChange={handleGenderChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out bg-white"
            >
              <option value="All">All Genders</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content Area: Loading, Error, Empty, or Names Grid */}
      <main>
        {isLoading ? (
          <LoadingSpinner size="lg" className="mt-16" message="Searching for names..." />
        ) : error ? (
          <div role="alert" className="text-center mt-16 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-700">Oops! Something went wrong.</h2>
            <p className="text-red-600 mt-3 mb-5">{error}</p>
            <button
              onClick={() => fetchNames({ search: searchTerm, gender: genderFilter, page: currentPage, limit: itemsPerPage })}
              className="px-6 py-2.5 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        ) : names.length === 0 ? (
          <div className="text-center mt-16 p-8 bg-blue-50 border-2 border-blue-200 rounded-lg">
             <h2 className="text-2xl font-semibold text-blue-700">No Names Found</h2>
             <p className="text-blue-600 mt-3">
              Try adjusting your search terms or filters, or explore all names.
             </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mb-10">
              {names.map((name) => (
                <NameCardExample
                  key={name.id}
                  name={name}
                  // Pass favorite status if you manage it:
                  // isFavorite={favorites.includes(name.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span>
                  - <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
                  {' '}of <span className="font-medium">{totalItems}</span> results
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500 px-2 hidden md:inline">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

