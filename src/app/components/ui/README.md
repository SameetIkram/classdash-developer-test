# UI Components

This directory contains reusable UI components for the Class-Dash application. The components have been broken down from the original large `ClassDiscoveryTest.tsx` file into smaller, more manageable and reusable pieces.

## Component Structure

### Core Components

- **`ClassDiscoveryTest.tsx`** - Main component that orchestrates all the UI components
- **`Header.tsx`** - Contains the search bar, filters, and advanced filters
- **`ClassList.tsx`** - Displays the list of classes with empty state handling
- **`ClassCard.tsx`** - Individual class card component

### Filter Components

- **`SearchBar.tsx`** - Search input with icon
- **`FilterChips.tsx`** - Basic class type filter chips (Yoga, HIIT, etc.)
- **`AdvancedFilters.tsx`** - Container for all advanced filter components
- **`DifficultyFilter.tsx`** - Dropdown for difficulty selection
- **`TimeRangeFilter.tsx`** - Start and end time filters
- **`PriceRangeFilter.tsx`** - Min and max price inputs
- **`SortDropdown.tsx`** - Sorting options dropdown
- **`ClearFiltersButton.tsx`** - Button to clear all filters

### Utility Components

- **`LoadingSpinner.tsx`** - Loading state component
- **`ErrorDisplay.tsx`** - Error state component with retry functionality

### Supporting Files

- **`types.ts`** - TypeScript interfaces and types
- **`utils.ts`** - Utility functions for filtering, sorting, and URL management
- **`index.ts`** - Barrel export file for easy imports

## Usage

### Importing Components

```typescript
// Import individual components
import { SearchBar, ClassCard, LoadingSpinner } from './ui';

// Import types
import { ClassItem, AdvancedFilters, SortOption } from './ui';

// Import utility functions
import { filterClasses, sortClasses, updateURL } from './ui';
```

### Component Props

Each component has well-defined TypeScript interfaces for its props, making them type-safe and self-documenting.

### Benefits of This Structure

1. **Reusability** - Components can be used in other parts of the application
2. **Maintainability** - Each component has a single responsibility
3. **Testability** - Smaller components are easier to unit test
4. **Type Safety** - Full TypeScript support with proper interfaces
5. **Separation of Concerns** - Logic is separated from presentation
6. **Easier Debugging** - Issues can be isolated to specific components

## Component Hierarchy

```
ClassDiscoveryTest
├── Header
│   ├── SearchBar
│   ├── FilterChips
│   └── AdvancedFilters
│       ├── DifficultyFilter
│       ├── TimeRangeFilter
│       ├── PriceRangeFilter
│       ├── SortDropdown
│       └── ClearFiltersButton
├── LoadingSpinner (conditional)
├── ErrorDisplay (conditional)
└── ClassList
    └── ClassCard (multiple)
```

## State Management

The main state is managed in `ClassDiscoveryTest.tsx` and passed down to child components through props. This follows a top-down data flow pattern typical in React applications.

## URL Synchronization

The application maintains URL synchronization for all filters and search parameters, allowing users to bookmark and share filtered views. This is handled by the `updateURL` utility function. 