# Client App Folder Structure

## 📁 Overview
This document outlines the clean, organized structure of the Shopod client application.

## 🗂️ Directory Structure

```
client/
├── src/
│   ├── app/                          # Next.js App Router (Pages & Routes)
│   │   ├── (client)/                # Client-facing routes (grouped)
│   │   │   ├── cart/               # Shopping cart page
│   │   │   ├── categories/         # Categories listing page
│   │   │   ├── checkout/           # Checkout page
│   │   │   ├── help/               # Help & support page
│   │   │   ├── offers/             # Offers & deals page
│   │   │   ├── orders/             # Order history & details
│   │   │   │   └── [id]/          # Individual order page
│   │   │   ├── products/           # Product listing & details
│   │   │   │   └── [id]/          # Individual product page
│   │   │   ├── profile/            # User profile
│   │   │   │   └── addresses/     # Manage addresses
│   │   │   ├── search/             # Search results page
│   │   │   ├── signup/             # User registration
│   │   │   ├── verify-otp/         # OTP verification
│   │   │   ├── layout.tsx          # Client layout wrapper
│   │   │   ├── page.tsx            # Home page
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── api/                     # API routes
│   │   │   └── auth/               # Authentication endpoints
│   │   │       └── login/          # Login endpoint
│   │   ├── login/                   # Login page
│   │   └── layout.tsx               # Root layout
│   │
│   ├── components/                   # React Components (Organized by Feature)
│   │   ├── auth/                    # Authentication components
│   │   │   └── .gitkeep            # Placeholder for future auth components
│   │   │
│   │   ├── cart/                    # Shopping cart components
│   │   │   ├── BillDetails.tsx     # Bill summary component
│   │   │   └── index.ts            # Cart exports
│   │   │
│   │   ├── common/                  # Shared/Reusable components
│   │   │   ├── Auth/               # Common auth components
│   │   │   │   ├── ProtectedRoute.tsx  # Route protection HOC
│   │   │   │   └── RoleGuard.tsx       # Role-based access control
│   │   │   ├── Button.tsx          # Reusable button component
│   │   │   ├── Card.tsx            # Generic card component
│   │   │   ├── EmptyState.tsx      # Empty state placeholder
│   │   │   ├── LikeButton.tsx      # Wishlist/like button
│   │   │   ├── Loader.tsx          # Loading spinner
│   │   │   ├── MobileBottomNav.tsx # Mobile navigation bar
│   │   │   ├── PriceTag.tsx        # Price display component
│   │   │   ├── QuantitySelector.tsx # Product quantity selector
│   │   │   ├── Rating.tsx          # Star rating component
│   │   │   ├── StoreCard.tsx       # Store/shop card
│   │   │   └── index.ts            # Common exports
│   │   │
│   │   ├── home/                    # Home page specific components
│   │   │   ├── Banner/             # Hero/banner section
│   │   │   │   └── HeroSlider.tsx  # Hero carousel
│   │   │   ├── Category/           # Category section
│   │   │   │   └── AllCategories.tsx # Category grid
│   │   │   ├── Features/           # Features/benefits section
│   │   │   │   └── BenefitBar.tsx  # Benefits display
│   │   │   ├── Food/               # Food delivery section
│   │   │   │   ├── FoodCategorySlider.tsx # Food categories
│   │   │   │   └── FoodSection.tsx        # Food section wrapper
│   │   │   └── RecommendedSection/ # Recommendations
│   │   │       └── RecommendedSection.tsx # Recommended products
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Footer/             # Site footer
│   │   │   │   └── Footer.tsx
│   │   │   ├── Header/             # Site header
│   │   │   │   └── Header.tsx
│   │   │   └── Searchbar/          # Search functionality
│   │   │       └── SearchBar.tsx
│   │   │
│   │   ├── product/                 # Product-related components
│   │   │   ├── CategoryList.tsx    # Product category list
│   │   │   ├── ProductCard.tsx     # Product card component
│   │   │   └── index.ts            # Product exports
│   │   │
│   │   ├── restaurant/              # Restaurant/food components
│   │   │   ├── MenuItemCard.tsx    # Menu item display
│   │   │   ├── MenuSection.tsx     # Menu section wrapper
│   │   │   ├── RestaurantCard.tsx  # Restaurant card
│   │   │   └── index.ts            # Restaurant exports
│   │   │
│   │   └── ui/                      # UI primitives & utilities
│   │       ├── Modal.tsx           # Modal/dialog component
│   │       └── Toaster.tsx         # Toast notifications
│   │
│   ├── redux/                       # State Management
│   │   ├── api/                    # RTK Query API slices
│   │   ├── features/               # Feature slices
│   │   └── seller/                 # Seller-specific state
│   │       └── slices/
│   │
│   ├── providers/                   # React Context Providers
│   │
│   ├── utils/                       # Utility functions
│   │
│   └── constants/                   # App constants & config
│
├── public/                          # Static assets
│
├── .env.local                       # Environment variables
├── .gitignore                       # Git ignore rules
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── postcss.config.mjs              # PostCSS config
├── eslint.config.mjs               # ESLint config
└── README.md                        # Project documentation
```

## 📋 Component Organization Principles

### 1. **Feature-Based Organization**
Components are grouped by their feature or domain:
- `auth/` - Authentication & authorization
- `cart/` - Shopping cart functionality
- `product/` - Product display & management
- `restaurant/` - Restaurant/food delivery features
- `home/` - Home page specific components

### 2. **Shared Components**
Common, reusable components are in `common/`:
- UI elements (Button, Card, Loader)
- Utility components (Rating, PriceTag, QuantitySelector)
- Layout helpers (MobileBottomNav)

### 3. **Layout Components**
Global layout components in `layout/`:
- Header (navigation, user menu)
- Footer (links, info)
- Searchbar (search functionality)

### 4. **UI Primitives**
Low-level UI components in `ui/`:
- Modal
- Toaster
- Other reusable UI primitives

## 🎯 Key Changes Made

### ✅ Removed
- ❌ `components/admin/` - Admin components don't belong in client app
- ❌ `components/seller/` - Seller components don't belong in client app
- ❌ `components/ProductCard/` - Duplicate, consolidated into `product/`
- ❌ `components/Auth/` - Moved to lowercase `auth/` for consistency

### ✅ Reorganized
- ✨ Grouped home page components under `home/`
- ✨ Grouped layout components under `layout/`
- ✨ Moved Modal to `ui/` folder
- ✨ Standardized folder naming (lowercase)

### ✅ Simplified
- 🔧 All components simplified to single `<div>` placeholders
- 🔧 Ready for implementation with clear structure
- 🔧 Easy to understand and navigate

## 🚀 Benefits

1. **Clear Separation of Concerns**: Each folder has a specific purpose
2. **Easy Navigation**: Developers can quickly find components
3. **Scalable**: Easy to add new features without cluttering
4. **Consistent**: Follows Next.js and React best practices
5. **Maintainable**: Clear structure makes maintenance easier

## 📝 Notes

- **Base files unchanged**: All configuration files (next.config.ts, tsconfig.json, etc.) remain untouched
- **App routes preserved**: All Next.js routes in `app/` directory maintained
- **State management intact**: Redux setup in `redux/` folder unchanged
- **Components simplified**: All components contain only placeholder `<div>` elements for easy implementation

## 🔄 Next Steps

1. Implement actual component logic as needed
2. Add proper TypeScript types and interfaces
3. Implement state management connections
4. Add proper styling and UI
5. Connect to backend APIs
