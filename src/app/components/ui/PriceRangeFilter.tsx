'use client'
import React from 'react';
import { AdvancedFilters } from './types';

interface PriceRangeFilterProps {
  priceRange: AdvancedFilters['priceRange'];
  onPriceRangeChange: (type: 'min' | 'max', value: number) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ 
  priceRange, 
  onPriceRangeChange 
}) => {
  return (
    <>
      {/* Min Price Filter */}
      <div className="flex-shrink-0">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm">£</span>
          <input
            type="number"
            min="0"
            max="100"
            value={priceRange.min}
            onChange={(e) => {
              const value = Math.min(parseInt(e.target.value) || 0, priceRange.max);
              onPriceRangeChange('min', value);
            }}
            className="w-20 pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white text-black"
            placeholder="0"
          />
        </div>
      </div>

      {/* Max Price Filter */}
      <div className="flex-shrink-0">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm">£</span>
          <input
            type="number"
            min="0"
            max="100"
            value={priceRange.max}
            onChange={(e) => {
              const value = Math.max(parseInt(e.target.value) || 100, priceRange.min);
              onPriceRangeChange('max', value);
            }}
            className="w-20 pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white text-black"
            placeholder="100"
          />
        </div>
      </div>
    </>
  );
};

export default PriceRangeFilter; 