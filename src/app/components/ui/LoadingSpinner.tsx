'use client'
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading classes..." 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-2">
      <div className="text-center">
        <Loader className="w-10 h-10 sm:w-8 sm:h-8 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 text-base sm:text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 