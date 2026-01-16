"use client";
import React from "react";
import { Search, Filter, Calendar, X } from "lucide-react";

interface OrderFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: any) => void;
}

export default function OrderFilters({ onSearch, onFilterChange }: OrderFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name, or Phone..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Date Range - Simplified for now */}
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="date"
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {/* Status Filter */}
                <select
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer"
                    onChange={(e) => onFilterChange({ status: e.target.value })}
                >
                    <option value="">Order Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                {/* Payment Status Filter */}
                <select
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer"
                    onChange={(e) => onFilterChange({ paymentStatus: e.target.value })}
                >
                    <option value="">Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                </select>

                {/* Vendor Filter */}
                <select
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer"
                    onChange={(e) => onFilterChange({ vendor: e.target.value })}
                >
                    <option value="">Select Vendor</option>
                    <option value="Pizza Hut">Pizza Hut</option>
                    <option value="Burger King">Burger King</option>
                    <option value="Green Grocer">Green Grocer</option>
                </select>

                {/* City Filter */}
                <select
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer"
                    onChange={(e) => onFilterChange({ city: e.target.value })}
                >
                    <option value="">Select City</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Tokyo">Tokyo</option>
                </select>

                <button
                    className="ml-auto flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                    <X size={16} /> Reset Filters
                </button>
            </div>
        </div>
    );
}
