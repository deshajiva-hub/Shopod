"use client";
import React from "react";
import { Search, Filter, Calendar, Download, ChevronDown } from "lucide-react";

interface TransactionFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: string;
    onStatusChange: (status: string) => void;
    methodFilter: string;
    onMethodChange: (method: string) => void;
    dateRange: { start: string; end: string };
    onDateRangeChange: (range: { start: string; end: string }) => void;
    onExport: () => void;
}

export default function TransactionFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    methodFilter,
    onMethodChange,
    dateRange,
    onDateRangeChange,
    onExport
}: TransactionFiltersProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Transaction ID or Life ID (#ORD-001)..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-200"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-[#1877F2]" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Filters:</span>
                </div>

                {/* Status Filter */}
                <div className="relative min-w-[140px]">
                    <select
                        className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg appearance-none font-black text-[10px] text-gray-600 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1877F2]/30 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>

                {/* Method Filter */}
                <div className="relative min-w-[160px]">
                    <select
                        className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg appearance-none font-black text-[10px] text-gray-600 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1877F2]/30 cursor-pointer"
                        value={methodFilter}
                        onChange={(e) => onMethodChange(e.target.value)}
                    >
                        <option value="All">Payment Methods</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Razorpay">Razorpay</option>
                        <option value="UPI">UPI</option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                    <Calendar size={14} className="text-gray-400" />
                    <input
                        type="date"
                        className="bg-transparent text-[10px] font-black text-gray-600 uppercase tracking-widest focus:outline-none"
                        value={dateRange.start}
                        onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                    />
                    <span className="text-gray-200">-</span>
                    <input
                        type="date"
                        className="bg-transparent text-[10px] font-black text-gray-600 uppercase tracking-widest focus:outline-none"
                        value={dateRange.end}
                        onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                    />
                </div>

                {(searchQuery || statusFilter !== 'All' || methodFilter !== 'All' || dateRange.start || dateRange.end) && (
                    <button
                        onClick={() => {
                            onSearchChange("");
                            onStatusChange("All");
                            onMethodChange("All");
                            onDateRangeChange({ start: "", end: "" });
                        }}
                        className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                    >
                        Clear All
                    </button>
                )}
            </div>
        </div>
    );
}
