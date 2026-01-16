"use client";
import React from "react";
import { Search, Filter, X, ChevronDown, MapPin } from "lucide-react";

interface VendorFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: any) => void;
}

export default function VendorFilters({ onSearch, onFilterChange }: VendorFiltersProps) {
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Vendor Name or Shop Name..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm font-medium"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-bold text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ city: e.target.value })}
                        >
                            <option value="">All Cities</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Pune">Pune</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-bold text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ status: e.target.value })}
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active Partner</option>
                            <option value="Pending">Pending Approval</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <button
                        onClick={() => {
                            onSearch("");
                            onFilterChange({ city: "", status: "" });
                        }}
                        className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest px-2"
                    >
                        <X size={14} /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
