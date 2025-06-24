'use client'
import React from 'react';
import { Clock, Users } from 'lucide-react';
import { ClassItem } from './types';

interface ClassCardProps {
  classItem: ClassItem;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => {
  const calculateDiscount = (originalPrice: number, currentPrice?: number): number => {
    if (!currentPrice || currentPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getClassEmoji = (classType: string): string => {
    switch (classType) {
      case 'Yoga': return '🧘‍♀️';
      case 'HIIT': return '💪';
      case 'Boxing': return '🥊';
      case 'Pilates': return '🧘‍♂️';
      case 'Cycling': return '🚴‍♀️';
      default: return '💫';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const discount = calculateDiscount(classItem.price, classItem.current_price);
  const finalPrice = classItem.current_price || classItem.price;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl w-full max-w-full sm:max-w-md mx-auto">
      {/* Simple class image placeholder */}
      <div className="h-28 sm:h-32 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-3xl sm:text-2xl">
          {getClassEmoji(classItem.class_type)}
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">{classItem.title}</h3>
            {classItem.difficulty && (
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(classItem.difficulty)}`}>
                {classItem.difficulty}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">{classItem.studio_name}</p>
          <p className="text-gray-500 text-xs">with {classItem.instructor_name}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
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
            <span className="text-lg sm:text-xl font-bold text-green-600">£{finalPrice}</span>
            {discount > 0 && (
              <span className="text-xs sm:text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>
          
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-base">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard; 