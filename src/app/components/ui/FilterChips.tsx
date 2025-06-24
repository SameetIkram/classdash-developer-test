'use client'
import React from 'react';

interface FilterChipsProps {
  filterOptions: string[];
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  filterOptions, 
  selectedFilters, 
  onFilterChange 
}) => {
  return (
    <div className="flex space-x-2 gap-x-2 overflow-x-auto pb-2 w-full scrollbar-thin scrollbar-thumb-gray-200">
      {filterOptions.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all min-w-[80px] sm:min-w-[0] ${
            selectedFilters.includes(filter)
              ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterChips; 