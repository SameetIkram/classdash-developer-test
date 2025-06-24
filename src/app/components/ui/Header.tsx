'use client'
import React from 'react';
import SearchBar from './SearchBar';
import FilterChips from './FilterChips';
import AdvancedFilters from './AdvancedFilters';
import { AdvancedFilters as AdvancedFiltersType, SortOption } from './types';

interface HeaderProps {
  searchQuery: string;
  selectedFilters: string[];
  advancedFilters: AdvancedFiltersType;
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
  filterOptions: string[];
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onAdvancedFiltersChange: (filters: AdvancedFiltersType) => void;
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
  onClearAll: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  selectedFilters,
  advancedFilters,
  sortBy,
  sortDirection,
  filterOptions,
  onSearchChange,
  onFilterChange,
  onAdvancedFiltersChange,
  onSortChange,
  onSortDirectionChange,
  onClearAll
}) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-4 w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Class-Dash Test</h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        
        <FilterChips 
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
        />

        <AdvancedFilters 
          advancedFilters={advancedFilters}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onAdvancedFiltersChange={onAdvancedFiltersChange}
          onSortChange={onSortChange}
          onSortDirectionChange={onSortDirectionChange}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
};

export default Header; 