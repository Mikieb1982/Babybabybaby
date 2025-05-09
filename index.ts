// ============================================================================
// FILE: types/index.ts
// ============================================================================
// Description: Defines shared TypeScript types and interfaces for the application.
// These types ensure consistency across components, API routes, and data handling.

/**
 * Represents the structure of a baby name object.
 */
export interface Name {
  id: string; // Unique identifier for the name
  name: string; // The baby name itself
  origin?: string | null; // Optional: The origin of the name (e.g., Latin, Greek)
  meaning?: string | null; // Optional: The meaning of the name
  gender?: 'Male' | 'Female' | 'Unisex' | string; // The gender association of the name
  popularity?: number | null; // Optional: A numerical representation of popularity (e.g., 1-100)
  // Add any other relevant properties for a name, e.g.:
  // syllables?: number;
  // relatedNames?: string[];
}

/**
 * Standard structure for API error responses.
 */
export interface ApiErrorResponse {
  message: string; // A user-friendly error message
  error?: string; // Optional: A more technical error detail or code
}

/**
 * Standard structure for successful API responses, allowing for generic data types.
 * @template T The type of the data being returned.
 */
export interface ApiSuccessResponse<T> {
  message: string; // A message indicating the success of the operation
  data: T; // The actual data payload (e.g., an array of Names, a single Name object)
  meta?: { // Optional metadata, often used for pagination
    total?: number; // Total number of items available
    page?: number; // Current page number
    limit?: number; // Number of items per page
    totalPages?: number; // Total number of pages
  };
}

