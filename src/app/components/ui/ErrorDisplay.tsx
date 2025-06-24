'use client'
import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-2">
      <div className="text-center bg-white p-4 sm:p-8 rounded-xl shadow-lg">
        <p className="text-red-600 mb-3 sm:mb-4 text-base sm:text-lg">Error loading classes:</p>
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
        <button 
          onClick={onRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay; 