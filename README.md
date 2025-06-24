# 🏃‍♂️ Class-Dash Developer Assessment

## 🎯 Task Overview
Build a responsive fitness class discovery component that demonstrates your React, TypeScript, and Supabase integration skills.

## ⚡ Quick Start
1. Fork this repository
2. Clone your fork: `git clone [your-fork-url]`
3. Install dependencies: `npm install`
4. Copy environment: `cp .env.example .env.local`
5. Start development: `npm run dev`
6. Open: http://localhost:3000

## 📋 Requirements

### Core Functionality (Required)
- [x] Fetch classes from Supabase `available_classes` view
- [x] Search functionality (class title, studio name, instructor)
- [x] Filter by class_type (Yoga, HIIT, Pilates, Boxing, etc.)
- [x] Display class cards with key information
- [x] Loading states and error handling
- [x] Mobile-first responsive design

### Bonus Points (Optional)
- [x] Advanced filtering (difficulty, time, price range)
- [x] Sort functionality (price, time, popularity)
- [x] Smooth animations and transitions
- [x] Accessibility features
- [x] Performance optimizations
- [x] **URL-based filtering** - Filter state persists in URL for sharing and navigation

## 🔗 URL Filtering Feature

The component now supports URL-based filtering, allowing users to:
- **Share filtered results** - URLs with active filters can be shared and will load with the same filters applied
- **Browser navigation** - Back/forward buttons work correctly with filter changes
- **Bookmark filtered views** - Users can bookmark specific filter combinations

### URL Parameters
- `search` - Search query for class titles, studio names, or instructors
- `filters` - Comma-separated list of class types (e.g., `Yoga,HIIT`)

### Example URLs
- `http://localhost:3000` - All classes
- `http://localhost:3000?search=yoga` - Classes matching "yoga" search
- `http://localhost:3000?filters=Yoga,HIIT` - Only Yoga and HIIT classes
- `http://localhost:3000?search=studio&filters=Pilates` - Pilates classes matching "studio"

## 🎨 Design Guidelines
- Use Tailwind CSS for styling
- Pale blue/green color scheme (Class-Dash brand)
- Mobile-first approach (test on phone/tablet)
- Clean, modern card-based layout
- Professional typography and spacing

## 📊 Test Data
- **8 studios** across North London
- **15+ classes** in next 48 hours
- **Various class types** and difficulty levels
- **Dynamic pricing** with discounts
- **Realistic booking data**

## 🏆 Evaluation Criteria
- **Code Quality (30%)** - Clean, maintainable, well-commented
- **UI/UX Design (25%)** - Professional, responsive, intuitive
- **Functionality (25%)** - Works as specified, handles edge cases
- **Performance (20%)** - Fast loading, efficient queries

## 📤 Submission
1. Complete your solution in your forked repository
2. Deploy to Vercel/Netlify (free tier)
3. Email us with:
   - GitHub repository link
   - Live demo URL
   - Brief explanation of your approach
   - Time spent on the task

## ⏰ Timeline
- **Deadline:** 48 hours from task assignment
- **Estimated effort:** 3-4 hours
- **Questions:** Email us anytime during the test

## 🤝 Need Help?
- Check Supabase connection with simple query
- Review existing data structure in `available_classes` view
- Test responsive design on multiple screen sizes
- Ask specific questions if requirements unclear

**Good luck! We're excited to see your solution! 🚀**
