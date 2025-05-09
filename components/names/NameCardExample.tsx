// ============================================================================
// FILE: components/NameCardExample.tsx
// ============================================================================
// Description: An example component to display individual name details in a card format.
// This component is designed to be reusable for listing names.

import React from 'react';
import { Name } from '@/types'; // Assuming types are in @/types, adjust path if needed

// If you use an icon library like Heroicons or Lucide React:
// import { HeartIcon } from '@heroicons/react/24/outline'; // Example for outline heart
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'; // Example for solid heart

interface NameCardExampleProps {
  name: Name; // The name object to display, conforming to the Name interface
  isFavorite?: boolean; // Optional: Indicates if the name is marked as a favorite
  onToggleFavorite?: (nameId: string) => void; // Optional: Callback function when the favorite button is clicked
}

const NameCardExample: React.FC<NameCardExampleProps> = ({
  name,
  isFavorite = false, // Default to not being a favorite
  onToggleFavorite,
}) => {
  return (
    <article // Using <article> as each card can be considered a self-contained piece of content
      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 flex flex-col justify-between h-full"
      aria-labelledby={`name-card-title-${name.id}`}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 id={`name-card-title-${name.id}`} className="text-2xl font-bold text-pink-600">
            {name.name}
          </h3>
          {/* Favorite button, only rendered if onToggleFavorite callback is provided */}
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(name.id)}
              aria-pressed={isFavorite} // Indicates the current state of the toggle button
              aria-label={isFavorite ? `Remove ${name.name} from favorites` : `Add ${name.name} to favorites`}
              className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                isFavorite ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' : 'bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-500'
              }`}
            >
              {/* Placeholder for an icon. Replace with actual SVG or icon component */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="sr-only">{isFavorite ? 'Favorited' : 'Not favorited'}</span>
            </button>
          )}
        </div>

        {/* Display name meaning if available */}
        {name.meaning && (
          <p className="text-sm text-gray-700 mb-1">
            <strong className="font-medium text-gray-800">Meaning:</strong> {name.meaning}
          </p>
        )}
        {/* Display name origin if available */}
        {name.origin && (
          <p className="text-sm text-gray-700 mb-1">
            <strong className="font-medium text-gray-800">Origin:</strong> {name.origin}
          </p>
        )}
        {/* Display name gender if available */}
        {name.gender && (
          <p className="text-sm text-gray-600 mb-1">
            <strong className="font-medium text-gray-800">Gender:</strong> {name.gender}
          </p>
        )}
        {/* Display name popularity if available */}
        {typeof name.popularity === 'number' && ( // Check if popularity is a number
           <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Popularity:</strong> {name.popularity}/100
          </p>
        )}
      </div>

      {/* Example of an action button at the bottom of the card */}
      {/* <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
          View Details
        </button>
      </div> */}
    </article>
  );
};

export default NameCardExample;

