'use client'
import React from 'react';
import { X } from 'lucide-react';

interface ClearFiltersButtonProps {
  onClear: () => void;
}

const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({ onClear }) => {
  return (
    <div className="flex-shrink-0">
      <button
        onClick={onClear}
        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <X className="w-4 h-4" />
        <span>Clear</span>
      </button>
    </div>
  );
};

export default ClearFiltersButton; 