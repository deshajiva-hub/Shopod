# Import Path Migration Guide

## 🔄 Updated Import Paths

After the folder restructuring, the following import paths have changed:

### ✅ Fixed Import Paths

| Old Path | New Path | Status |
|----------|----------|--------|
| `@/components/Searchbar/SearchBar` | `@/components/layout/Searchbar/SearchBar` | ✅ Fixed |
| `@/components/Banner/HeroSlider` | `@/components/home/Banner/HeroSlider` | ✅ Fixed |
| `@/components/Category/AllCategories` | `@/components/home/Category/AllCategories` | ✅ Fixed |
| `@/components/Features/BenefitBar` | `@/components/home/Features/BenefitBar` | ✅ Fixed |
| `@/components/Food/FoodCategorySlider` | `@/components/home/Food/FoodCategorySlider` | ✅ Fixed |
| `@/components/Food/FoodSection` | `@/components/home/Food/FoodSection` | ✅ Fixed |
| `@/components/RecommendedSection/...` | `@/components/home/RecommendedSection/...` | ✅ Fixed |
| `@/components/Header/Header` | `@/components/layout/Header/Header` | ✅ Fixed |
| `@/components/Footer/Footer` | `@/components/layout/Footer/Footer` | ✅ Fixed |
| `@/components/Modal` | `@/components/ui/Modal` | ✅ Fixed |

### 📋 Import Path Reference

Use these import paths going forward:

#### **Layout Components**
```typescript
import SearchBar from "@/components/layout/Searchbar/SearchBar";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
```

#### **Home Page Components**
```typescript
import HeroSlider from "@/components/home/Banner/HeroSlider";
import AllCategories from "@/components/home/Category/AllCategories";
import BenefitBar from "@/components/home/Features/BenefitBar";
import FoodCategorySlider from "@/components/home/Food/FoodCategorySlider";
import FoodSection from "@/components/home/Food/FoodSection";
import RecommendedSection from "@/components/home/RecommendedSection/RecommendedSection";
```

#### **Common Components**
```typescript
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Loader from "@/components/common/Loader";
import Rating from "@/components/common/Rating";
import PriceTag from "@/components/common/PriceTag";
import QuantitySelector from "@/components/common/QuantitySelector";
import LikeButton from "@/components/common/LikeButton";
import EmptyState from "@/components/common/EmptyState";
import StoreCard from "@/components/common/StoreCard";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import ProtectedRoute from "@/components/common/Auth/ProtectedRoute";
import RoleGuard from "@/components/common/Auth/RoleGuard";
```

#### **Product Components**
```typescript
import ProductCard from "@/components/product/ProductCard";
import CategoryList from "@/components/product/CategoryList";
```

#### **Restaurant Components**
```typescript
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import MenuSection from "@/components/restaurant/MenuSection";
import MenuItemCard from "@/components/restaurant/MenuItemCard";
```

#### **Cart Components**
```typescript
import BillDetails from "@/components/cart/BillDetails";
```

#### **UI Primitives**
```typescript
import Modal from "@/components/ui/Modal";
import Toaster from "@/components/ui/Toaster";
```

---

## 🔍 How to Find and Fix Import Issues

If you encounter import errors, follow these steps:

### 1. **Check the Error Message**
```
Module not found: Can't resolve '@/components/OldFolder/Component'
```

### 2. **Find the New Location**
Refer to the table above or check the folder structure:
```bash
ls -la src/components/
```

### 3. **Update the Import**
Replace the old path with the new path from the reference above.

### 4. **Search for All Occurrences**
```bash
# Search for old import paths
grep -r "@/components/Banner" src/
grep -r "@/components/Category" src/
grep -r "@/components/Features" src/
grep -r "@/components/Food" src/
grep -r "@/components/Searchbar" src/
grep -r "@/components/Modal" src/
```

---

## ✅ Files Already Fixed

The following files have been updated with correct import paths:

- ✅ `src/app/(client)/layout.tsx` - Fixed SearchBar import
- ✅ `src/app/(client)/page.tsx` - Fixed HeroSlider, AllCategories, FoodCategorySlider, BenefitBar, Modal imports

---

## 🚨 Common Issues

### Issue: "Module not found"
**Solution**: Check if the component has been moved to a new folder. Refer to the import path reference above.

### Issue: TypeScript errors about missing props
**Solution**: The simplified components accept basic props. If you need specific props, update the component definition.

### Issue: Component not rendering
**Solution**: All components are currently placeholders (single div). Implement the actual component logic as needed.

---

## 📝 Quick Reference

**Old Structure:**
```
components/
├── Banner/
├── Category/
├── Features/
├── Food/
├── RecommendedSection/
├── Header/
├── Footer/
├── Searchbar/
└── Modal.tsx
```

**New Structure:**
```
components/
├── home/
│   ├── Banner/
│   ├── Category/
│   ├── Features/
│   ├── Food/
│   └── RecommendedSection/
├── layout/
│   ├── Header/
│   ├── Footer/
│   └── Searchbar/
└── ui/
    └── Modal.tsx
```

---

## 🎯 Next Steps

1. ✅ All import paths have been fixed
2. ✅ Components accept basic props
3. 🔄 Implement actual component logic as needed
4. 🔄 Add proper TypeScript interfaces
5. 🔄 Style components

---

**Status**: ✅ All import paths migrated successfully!
