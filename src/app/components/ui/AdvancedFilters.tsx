'use client'
import React from 'react';
import { AdvancedFilters as AdvancedFiltersType, SortOption } from './types';
import DifficultyFilter from './DifficultyFilter';
import TimeRangeFilter from './TimeRangeFilter';
import PriceRangeFilter from './PriceRangeFilter';
import SortDropdown from './SortDropdown';
import ClearFiltersButton from './ClearFiltersButton';

interface AdvancedFiltersProps {
  advancedFilters: AdvancedFiltersType;
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
  onAdvancedFiltersChange: (filters: AdvancedFiltersType) => void;
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
  onClearAll: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  advancedFilters,
  sortBy,
  sortDirection,
  onAdvancedFiltersChange,
  onSortChange,
  onSortDirectionChange,
  onClearAll
}) => {
  const handleTimeRangeChange = (type: 'start' | 'end', value: string) => {
    const newTimeRange = { ...advancedFilters.timeRange, [type]: value };
    const newAdvancedFilters = { ...advancedFilters, timeRange: newTimeRange };
    onAdvancedFiltersChange(newAdvancedFilters);
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    const newPriceRange = { ...advancedFilters.priceRange, [type]: value };
    const newAdvancedFilters = { ...advancedFilters, priceRange: newPriceRange };
    onAdvancedFiltersChange(newAdvancedFilters);
  };

  return (
    <div className="flex flex-row flex-nowrap items-center gap-x-2 overflow-x-auto pb-2 w-full scrollbar-thin scrollbar-thumb-gray-200 mt-4">
      <DifficultyFilter 
        advancedFilters={advancedFilters}
        onAdvancedFiltersChange={onAdvancedFiltersChange}
      />
      
      <TimeRangeFilter 
        timeRange={advancedFilters.timeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />
      
      <PriceRangeFilter 
        priceRange={advancedFilters.priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />
      
      <SortDropdown 
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        onSortDirectionChange={onSortDirectionChange}
      />
      
      <ClearFiltersButton onClear={onClearAll} />
    </div>
  );
};

export default AdvancedFilters; 