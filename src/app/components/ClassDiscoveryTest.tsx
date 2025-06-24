'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import {
  ClassItem,
  SortOption,
  Header,
  ClassList,
  LoadingSpinner,
  ErrorDisplay,
  filterClasses,
  sortClasses,
  updateURL
} from './ui';
import { AdvancedFilters } from './ui/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cwaclyxmaixhzdmwczum.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWNseXhtYWl4aHpkbXdjenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTk3MjUsImV4cCI6MjA2NjE5NTcyNX0.472QP5_k7r3verZVAWdrtfGK0V-QqLiVW2vPfwCNRNY';

const supabase = createClient(supabaseUrl, supabaseKey);

const ClassDiscoveryTest = () => {
  const searchParams = useSearchParams();
  
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    difficulty: [],
    timeRange: { start: '', end: '' },
    priceRange: { min: 0, max: 100 }
  });
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filterOptions = ['Yoga', 'HIIT', 'Pilates', 'Boxing', 'Cycling'];

  // Initialize filters from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlFilters = searchParams.get('filters')?.split(',').filter(Boolean) || [];
    const urlDifficulty = searchParams.get('difficulty')?.split(',').filter(Boolean) || [];
    const urlTimeStart = searchParams.get('timeStart') || '';
    const urlTimeEnd = searchParams.get('timeEnd') || '';
    const urlPriceMin = searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : 0;
    const urlPriceMax = searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : 100;
    const urlSortBy = (searchParams.get('sortBy') as SortOption) || 'time';
    const urlSortDir = (searchParams.get('sortDir') as 'asc' | 'desc') || 'asc';
    
    setSearchQuery(urlSearch);
    setSelectedFilters(urlFilters);
    setAdvancedFilters({
      difficulty: urlDifficulty,
      timeRange: { start: urlTimeStart, end: urlTimeEnd },
      priceRange: { min: urlPriceMin, max: urlPriceMax }
    });
    setSortBy(urlSortBy);
    setSortDirection(urlSortDir);
  }, [searchParams]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Apply filters and sorting whenever any filter or sort changes
  useEffect(() => {
    if (classes.length > 0) {
      const filtered = filterClasses(classes, searchQuery, selectedFilters, advancedFilters);
      const sorted = sortClasses(filtered, sortBy, sortDirection);
      setFilteredClasses(sorted);
    }
  }, [classes, searchQuery, selectedFilters, advancedFilters, sortBy, sortDirection]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const { data, error: supabaseError } = await supabase
        .from('test_classes')
        .select('*')
        .order('start_time', { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      // Add mock difficulty data if not present
      const classesWithDifficulty = (data || []).map((cls, index) => ({
        ...cls,
        difficulty: cls.difficulty || ['Beginner', 'Intermediate', 'Advanced'][index % 3]
      }));

      setClasses(classesWithDifficulty);
      setFilteredClasses(classesWithDifficulty);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateURL(query, selectedFilters, advancedFilters, sortBy, sortDirection);
  };

  const handleFilterChange = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(newFilters);
    updateURL(searchQuery, newFilters, advancedFilters, sortBy, sortDirection);
  };

  const handleAdvancedFiltersChange = (filters: AdvancedFilters) => {
    setAdvancedFilters(filters);
    updateURL(searchQuery, selectedFilters, filters, sortBy, sortDirection);
  };

  const handleSortChange = (sort: SortOption) => {
    const newDirection = sort === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(sort);
    setSortDirection(newDirection);
    updateURL(searchQuery, selectedFilters, advancedFilters, sort, newDirection);
  };

  const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
    setSortDirection(direction);
    updateURL(searchQuery, selectedFilters, advancedFilters, sortBy, direction);
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedFilters([]);
    setAdvancedFilters({
      difficulty: [],
      timeRange: { start: '', end: '' },
      priceRange: { min: 0, max: 100 }
    });
    setSortBy('time');
    setSortDirection('asc');
    setFilteredClasses(classes);
    window.history.replaceState({}, '', window.location.pathname);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchClasses} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header 
        searchQuery={searchQuery}
        selectedFilters={selectedFilters}
        advancedFilters={advancedFilters}
        sortBy={sortBy}
        sortDirection={sortDirection}
        filterOptions={filterOptions}
        onSearchChange={handleSearch}
        onFilterChange={handleFilterChange}
        onAdvancedFiltersChange={handleAdvancedFiltersChange}
        onSortChange={handleSortChange}
        onSortDirectionChange={handleSortDirectionChange}
        onClearAll={clearAllFilters}
      />

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {filteredClasses.length === 0 ? 'No classes found' : 
             `${filteredClasses.length} classes available`}
          </h2>
        </div>
        
        <ClassList 
          classes={filteredClasses}
          onClearFilters={clearAllFilters}
        />
      </div>
    </div>
  );
};

export default ClassDiscoveryTest; 