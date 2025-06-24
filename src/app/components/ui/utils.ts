import { ClassItem, AdvancedFilters, SortOption } from './types';

export const filterClasses = (
  classes: ClassItem[], 
  query: string, 
  filters: string[], 
  advanced: AdvancedFilters
): ClassItem[] => {
  let filtered = classes;

  // Basic search filter
  if (query) {
    filtered = filtered.filter(cls => 
      cls.title?.toLowerCase().includes(query.toLowerCase()) ||
      cls.studio_name?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Class type filter
  if (filters.length > 0) {
    filtered = filtered.filter(cls =>
      filters.includes(cls.class_type)
    );
  }

  // Difficulty filter
  if (advanced.difficulty.length > 0) {
    filtered = filtered.filter(cls =>
      advanced.difficulty.includes(cls.difficulty || 'Beginner')
    );
  }

  // Time range filter
  if (advanced.timeRange.start || advanced.timeRange.end) {
    filtered = filtered.filter(cls => {
      const classTime = new Date(cls.start_time);
      const classHour = classTime.getHours();
      
      if (advanced.timeRange.start) {
        const startHour = parseInt(advanced.timeRange.start);
        if (classHour < startHour) return false;
      }
      
      if (advanced.timeRange.end) {
        const endHour = parseInt(advanced.timeRange.end);
        if (classHour > endHour) return false;
      }
      
      return true;
    });
  }

  // Price range filter
  filtered = filtered.filter(cls => {
    const finalPrice = cls.current_price || cls.price;
    return finalPrice >= advanced.priceRange.min && finalPrice <= advanced.priceRange.max;
  });

  return filtered;
};

export const sortClasses = (
  classesToSort: ClassItem[], 
  sort: SortOption, 
  direction: 'asc' | 'desc'
): ClassItem[] => {
  const sorted = [...classesToSort].sort((a, b) => {
    let comparison = 0;
    
    switch (sort) {
      case 'time':
        comparison = new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        break;
      case 'price':
        const priceA = a.current_price || a.price;
        const priceB = b.current_price || b.price;
        comparison = priceA - priceB;
        break;
      case 'popularity':
        const popularityA = a.max_capacity - a.current_bookings;
        const popularityB = b.max_capacity - b.current_bookings;
        comparison = popularityA - popularityB;
        break;
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

export const updateURL = (
  search: string, 
  filters: string[], 
  advanced: AdvancedFilters, 
  sort: SortOption, 
  direction: 'asc' | 'desc'
) => {
  const params = new URLSearchParams();
  
  if (search && search.trim()) {
    params.set('search', search.trim());
  }
  
  if (filters.length > 0) {
    params.set('filters', filters.join(','));
  }

  if (advanced.difficulty.length > 0) {
    params.set('difficulty', advanced.difficulty.join(','));
  }

  if (advanced.timeRange.start) {
    params.set('timeStart', advanced.timeRange.start);
  }

  if (advanced.timeRange.end) {
    params.set('timeEnd', advanced.timeRange.end);
  }

  if (advanced.priceRange.min > 0) {
    params.set('priceMin', advanced.priceRange.min.toString());
  }

  if (advanced.priceRange.max < 100) {
    params.set('priceMax', advanced.priceRange.max.toString());
  }

  if (sort !== 'time') {
    params.set('sortBy', sort);
  }

  if (direction !== 'asc') {
    params.set('sortDir', direction);
  }
  
  const newURL = params.toString() ? `?${params.toString()}` : '';
  
  // Use window.history for more reliable URL updates
  if (newURL === '') {
    window.history.replaceState({}, '', window.location.pathname);
  } else {
    window.history.replaceState({}, '', newURL);
  }
}; 