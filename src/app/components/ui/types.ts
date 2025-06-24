// Define the class type interface
export interface ClassItem {
  id: number;
  title: string;
  studio_name: string;
  instructor_name: string;
  class_type: string;
  start_time: string;
  price: number;
  current_price?: number;
  max_capacity: number;
  current_bookings: number;
  difficulty?: string;
}

// Define filter and sort types
export interface AdvancedFilters {
  difficulty: string[];
  timeRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
}

export type SortOption = 'time' | 'price' | 'popularity' | 'name'; 