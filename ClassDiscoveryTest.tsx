
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, MapPin, Clock, Users, Star, Loader } from 'lucide-react';
import { motion } from 'framer-motion'; // Will error - missing dependency

const supabaseUrl = 'https://cwaclyxmaixhzdmwczum.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWNseXhtYWl4aHpkbXdjenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTk3MjUsImV4cCI6MjA2NjE5NTcyNX0.472QP5_k7r3verZVAWdrtfGK0V-QqLiVW2vPfwCNRNY';

const supabase = createClient(supabaseUrl, supabaseKey);

const ClassDiscoveryTest = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = ['Yoga', 'HIIT', 'Pilates', 'Boxing', 'Cycling'];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const { data, error: supabaseError } = await supabase
        .from('test_classes') // Should be 'available_classes' for richer data
        .select('*')
        .order('start_time', { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      setClasses(data || []);
      setFilteredClasses(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterClasses(query, selectedFilters);
  };

  const handleFilterChange = (filter) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(newFilters);
    filterClasses(searchQuery, newFilters);
  };
  const filterClasses = (query, filters) => {
    let filtered = classes;

    if (query) {
      filtered = filtered.filter(cls => 
        cls.title?.toLowerCase().includes(query.toLowerCase()) ||
        cls.studio_name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.length > 0) {
      filtered = filtered.filter(cls =>
        filters.includes(cls.class_type)
      );
    }

    setFilteredClasses(filtered);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!currentPrice || currentPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading classes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 mb-4">Error loading classes:</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchClasses}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header - Will need Tailwind config for styling to work properly */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Class-Dash Test</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search classes, studios..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Basic Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedFilters.includes(filter)
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {filteredClasses.length === 0 ? 'No classes found' : 
             `${filteredClasses.length} classes available`}
          </h2>
        </div>
        
        {/* Class List */}
        <div className="space-y-4">
          {filteredClasses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No classes match your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilters([]);
                  setFilteredClasses(classes);
                }}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredClasses.map(classItem => {
              const discount = calculateDiscount(classItem.price, classItem.current_price);
              const finalPrice = classItem.current_price || classItem.price;
              
              return (
                <div key={classItem.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                  {/* Simple class image placeholder */}
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <div className="text-2xl">
                      {classItem.class_type === 'Yoga' ? '🧘‍♀️' : 
                       classItem.class_type === 'HIIT' ? '💪' : 
                       classItem.class_type === 'Boxing' ? '🥊' : '💫'}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg text-gray-900">{classItem.title}</h3>
                      <p className="text-gray-600 text-sm">{classItem.studio_name}</p>
                      <p className="text-gray-500 text-xs">with {classItem.instructor_name}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{new Date(classItem.start_time).toLocaleTimeString('en-GB', { 
                          hour: '2-digit', minute: '2-digit' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{classItem.max_capacity - classItem.current_bookings} spots left</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-600">£{finalPrice}</span>
                        {discount > 0 && (
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                      
                      <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDiscoveryTest;
