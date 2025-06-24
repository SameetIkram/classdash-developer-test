'use client'
import React from 'react';
import { ClassItem } from './types';
import ClassCard from './ClassCard';

interface ClassListProps {
  classes: ClassItem[];
  onClearFilters: () => void;
}

const ClassList: React.FC<ClassListProps> = ({ classes, onClearFilters }) => {
  if (classes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No classes match your criteria</p>
        <button 
          onClick={onClearFilters}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {classes.map(classItem => (
        <ClassCard key={classItem.id} classItem={classItem} />
      ))}
    </div>
  );
};

export default ClassList; 