"use client";
import React from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

interface UserFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: any) => void;
}

export default function UserFilters({ onSearch, onFilterChange }: UserFiltersProps) {
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or Phone..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm font-medium"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-bold text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ role: e.target.value })}
                        >
                            <option value="">All Roles</option>
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Rider">Rider</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 transition-all cursor-pointer font-bold text-gray-700 pr-10"
                            onChange={(e) => onFilterChange({ status: e.target.value })}
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <button
                        onClick={() => {
                            onSearch("");
                            onFilterChange({ role: "", status: "" });
                        }}
                        className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest px-2"
                    >
                        <X size={14} /> Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
