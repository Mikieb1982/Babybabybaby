// ============================================================================
// FILE: components/ui/LoadingSpinner.tsx
// ============================================================================
// Description: A reusable UI component that displays a loading spinner.
// Useful for indicating background processes or data fetching.

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'; // Defines the size of the spinner
  className?: string; // Allows for additional Tailwind CSS classes or custom styling
  message?: string; // Optional message to display below the spinner
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md', // Default size is medium
  className = '',
  message = 'Loading...', // Default loading message
}) => {
  // Tailwind CSS classes for different spinner sizes
  const sizeClasses = {
    sm: 'w-4 h-4 border-2', // Small spinner
    md: 'w-8 h-8 border-4', // Medium spinner
    lg: 'w-12 h-12 border-[6px]', // Large spinner
  };

  return (
    <div
      className={`flex flex-col justify-center items-center text-center p-4 ${className}`}
      role="status" // Informs assistive technologies that this region's content may change
      aria-live="polite" // Indicates that updates should be announced at the next graceful opportunity
    >
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-pink-600 border-t-transparent`}
        aria-hidden="true" // The visual spinner is decorative; screen readers use the message.
      >
        {/* The visual spinner itself */}
      </div>
      {/* Display the message if provided */}
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      {/* Screen reader only text, ensures accessibility even if message prop is not used */}
      <span className="sr-only">{message || 'Content is loading'}</span>
    </div>
  );
};

export default LoadingSpinner;

