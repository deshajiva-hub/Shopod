"use client";
import React from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

interface ProductFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onSearch, onFilterChange }: ProductFiltersProps) {
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Product Name or SKU..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-medium text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Meat">Meat</option>
                            <option value="Beverages">Beverages</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-medium text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ vendor: e.target.value })}
                        >
                            <option value="">All Vendors</option>
                            <option value="Pizza Hut">Pizza Hut</option>
                            <option value="Burger King">Burger King</option>
                            <option value="Green Grocer">Green Grocer</option>
                            <option value="Subway">Subway</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-medium text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ stockStatus: e.target.value })}
                        >
                            <option value="">Stock Status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-medium text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ visibility: e.target.value })}
                        >
                            <option value="">Visibility</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range:</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-20 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                            />
                            <span className="text-gray-300">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-20 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                    <X size={14} /> Reset All Filters
                </button>
            </div>
        </div>
    );
}
