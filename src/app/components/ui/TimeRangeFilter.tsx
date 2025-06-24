'use client'
import React from 'react';
import { AdvancedFilters } from './types';

interface TimeRangeFilterProps {
  timeRange: AdvancedFilters['timeRange'];
  onTimeRangeChange: (type: 'start' | 'end', value: string) => void;
}

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({ 
  timeRange, 
  onTimeRangeChange 
}) => {
  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString(),
    label: `${i.toString().padStart(2, '0')}:00`
  }));

  return (
    <>
      {/* Time Start Filter */}
      <div className="flex-shrink-0">
        <select
          value={timeRange.start}
          onChange={(e) => onTimeRangeChange('start', e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white"
        >
          <option value="">Start Time</option>
          {timeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Time End Filter */}
      <div className="flex-shrink-0">
        <select
          value={timeRange.end}
          onChange={(e) => onTimeRangeChange('end', e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white"
        >
          <option value="">End Time</option>
          {timeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TimeRangeFilter; 