'use client'
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AdvancedFilters } from './types';

interface DifficultyFilterProps {
  advancedFilters: AdvancedFilters;
  onAdvancedFiltersChange: (filters: AdvancedFilters) => void;
}

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({ 
  advancedFilters, 
  onAdvancedFiltersChange 
}) => {
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!showDifficultyDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDifficultyDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDifficultyDropdown]);

  useEffect(() => {
    if (showDifficultyDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 50
      });
    }
  }, [showDifficultyDropdown]);

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const newDifficulties = checked
      ? [...advancedFilters.difficulty, difficulty]
      : advancedFilters.difficulty.filter(d => d !== difficulty);
    
    const newAdvancedFilters = { ...advancedFilters, difficulty: newDifficulties };
    onAdvancedFiltersChange(newAdvancedFilters);
  };

  return (
    <div className="flex-shrink-0 relative" ref={containerRef}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowDifficultyDropdown(!showDifficultyDropdown)}
        className="px-3 py-2 min-w-[120px] mr-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-offset-2 bg-white appearance-none pr-8 flex items-center justify-between"
      >
        <span>
          {advancedFilters.difficulty.length === 0 
            ? 'Any difficulty' 
            : `${advancedFilters.difficulty.length} selected`}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showDifficultyDropdown && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div style={dropdownStyle} className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            {['Advanced', 'Intermediate', 'Beginner', 'All Levels'].map((difficulty) => (
              <label key={difficulty} className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={advancedFilters.difficulty.includes(difficulty)}
                  onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-sm text-gray-700">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DifficultyFilter; 