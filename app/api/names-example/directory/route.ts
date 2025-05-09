// ============================================================================
// FILE: app/api/names-example/route.ts
// ============================================================================
// Description: A mock API route for fetching a list of names.
// In a real application, this would interact with a database (e.g., using Prisma).
// This route supports filtering by search term, gender, and pagination.

import { NextResponse } from 'next/server';
import { Name, ApiErrorResponse, ApiSuccessResponse } from '@/types'; // Adjust path if needed

// Mock database of names for demonstration purposes
const mockNamesDb: Name[] = [
  { id: '1', name: 'Aurora', meaning: 'Dawn', origin: 'Latin', gender: 'Female', popularity: 85 },
  { id: '2', name: 'Jasper', meaning: 'Treasurer', origin: 'Persian', gender: 'Male', popularity: 70 },
  { id: '3', name: 'Luna', meaning: 'Moon', origin: 'Latin', gender: 'Female', popularity: 92 },
  { id: '4', name: 'Orion', meaning: 'Hunter', origin: 'Greek', gender: 'Male', popularity: 60 },
  { id: '5', name: 'Seraphina', meaning: 'Fiery-winged', origin: 'Hebrew', gender: 'Female', popularity: 78 },
  { id: '6', name: 'Finnian', meaning: 'Fair', origin: 'Irish', gender: 'Male', popularity: 82 },
  { id: '7', name: 'Willow', meaning: 'Slender, graceful', origin: 'English', gender: 'Female', popularity: 75 },
  { id: '8', name: 'Kai', meaning: 'Sea', origin: 'Hawaiian', gender: 'Unisex', popularity: 88 },
  { id: '9', name: 'Elara', meaning: 'Shining one', origin: 'Greek', gender: 'Female', popularity: 65 },
  { id: '10', name: 'Rhys', meaning: 'Ardor', origin: 'Welsh', gender: 'Male', popularity: 50 },
  { id: '11', name: 'Isla', meaning: 'Island', origin: 'Scottish', gender: 'Female', popularity: 90 },
  { id: '12', name: 'Leo', meaning: 'Lion', origin: 'Latin', gender: 'Male', popularity: 89 },
  { id: '13', name: 'Rowan', meaning: 'Little redhead', origin: 'Irish', gender: 'Unisex', popularity: 72 },
  { id: '14', name: 'Clara', meaning: 'Clear, bright', origin: 'Latin', gender: 'Female', popularity: 80 },
  { id: '15', name: 'Silas', meaning: 'Forest, wood', origin: 'Latin', gender: 'Male', popularity: 68 },
  { id: '16', name: 'Astrid', meaning: 'Divinely beautiful', origin: 'Norse', gender: 'Female', popularity: 77 },
  { id: '17', name: 'Felix', meaning: 'Lucky, successful', origin: 'Latin', gender: 'Male', popularity: 76 },
  { id: '18', name: 'Cora', meaning: 'Maiden', origin: 'Greek', gender: 'Female', popularity: 83 },
  { id: '19', name: 'Ezra', meaning: 'Help', origin: 'Hebrew', gender: 'Male', popularity: 81 },
  { id: '20', name: 'Nova', meaning: 'New', origin: 'Latin', gender: 'Female', popularity: 91 },
];

/**
 * Handles GET requests to fetch names.
 * Supports query parameters for search, gender, page, and limit.
 * @param request The incoming Next.js API request object.
 * @returns A NextResponse object with the list of names or an error message.
 */
export async function GET(request: Request): Promise<NextResponse<ApiSuccessResponse<Name[]> | ApiErrorResponse>> {
  // Simulate a realistic API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200)); // 200-1000ms delay

  try {
    const { searchParams } = new URL(request.url); // Extract search parameters from the request URL

    // Get filter and pagination parameters from the query string
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';
    const genderFilter = searchParams.get('gender') || 'All'; // Default to 'All' genders
    const page = parseInt(searchParams.get('page') || '1', 10); // Default to page 1
    const limit = parseInt(searchParams.get('limit') || '6', 10); // Default to 6 items per page

    let filteredNames = mockNamesDb;

    // Apply search term filter (checks name, meaning, and origin)
    if (searchTerm) {
      filteredNames = filteredNames.filter(name =>
        name.name.toLowerCase().includes(searchTerm) ||
        name.meaning?.toLowerCase().includes(searchTerm) ||
        name.origin?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply gender filter
    if (genderFilter && genderFilter !== 'All') {
      filteredNames = filteredNames.filter(name => name.gender === genderFilter);
    }

    // Calculate pagination details
    const totalNames = filteredNames.length;
    const totalPages = Math.ceil(totalNames / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedNames = filteredNames.slice(startIndex, endIndex);

    // Simulate a random error for demonstration (uncomment to test error handling)
    // if (Math.random() > 0.9) { // 10% chance of error
    //   console.error('Simulated API Error: Could not fetch names from mock DB.');
    //   return NextResponse.json(
    //     { message: 'Simulated server error while fetching names.' },
    //     { status: 500 }
    //   );
    // }

    // Return a successful response with the paginated names and metadata
    return NextResponse.json(
      {
        message: 'Names fetched successfully from mock API.',
        data: paginatedNames,
        meta: {
          total: totalNames,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error('API Error in /api/names-example:', error);
    // Determine the error message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred on the server.';
    // Return an error response
    return NextResponse.json(
      { message: 'Failed to fetch names due to a server issue.', error: errorMessage },
      { status: 500 }
    );
  }
}

