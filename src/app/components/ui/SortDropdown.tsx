'use client'
import React from 'react';
import { SortOption } from './types';

interface SortDropdownProps {
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  sortBy, 
  sortDirection, 
  onSortChange, 
  onSortDirectionChange 
}) => {
  const handleChange = (value: string) => {
    const [sort, direction] = value.split('-') as [SortOption, 'asc' | 'desc'];
    onSortChange(sort);
    onSortDirectionChange(direction);
  };

  return (
    <div className="flex-shrink-0">
      <select
        value={`${sortBy}-${sortDirection}`}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white"
      >
        <option value="time-asc">Time (Earliest)</option>
        <option value="time-desc">Time (Latest)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="popularity-asc">Popularity (Most Available)</option>
        <option value="popularity-desc">Popularity (Least Available)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  );
};

export default SortDropdown; 