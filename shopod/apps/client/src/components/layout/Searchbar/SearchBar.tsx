"use client";
import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative group w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6b4dd7] transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="Search 'milk', 'bread', 'vegetables'..."
        className="w-full bg-gray-50 border border-transparent focus:border-[#6b4dd7]/20 focus:bg-white focus:ring-4 focus:ring-[#6b4dd7]/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-700 placeholder-gray-400 outline-none transition-all duration-300"
        suppressHydrationWarning
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:block">
        <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider shadow-sm">
          CMD + K
        </span>
      </div>
    </div>
  );
}
