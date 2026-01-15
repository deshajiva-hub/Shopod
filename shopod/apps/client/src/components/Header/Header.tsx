"use client";
import React from "react";
import { ChevronDown, Search, ShoppingCart, User, Phone, Globe } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow relative z-50">
      {/* Top Bar - Blue */}
      <div className="bg-[#1877F2] text-white text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/playground" className="hover:opacity-90 flex items-center gap-1 font-bold text-yellow-200">
              <Globe size={14} /> Playground
            </Link>
            <span className="opacity-50">|</span>
            <Link href="/wishlist" className="hover:opacity-90">Wishlist</Link>
            <span className="opacity-50">|</span>
            <Link href="/orders" className="hover:opacity-90">My Orders</Link>
            <span className="opacity-50">|</span>
            <Link href="/cart" className="hover:opacity-90">Cart</Link>
          </div>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1">
              Need help? Call Us: <span className="font-bold">+1800900122</span>
            </span>
            <span className="opacity-50">|</span>
            <button className="flex items-center gap-1 hover:opacity-90">
              English <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 hover:opacity-90">
              USD <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-6">

        {/* Logo + Location */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-[#1877F2] text-3xl font-bold tracking-tight">Shopod</span>
          </Link>
          <div className="flex flex-col text-[10px] leading-tight text-gray-500 mt-1">
            <span className="font-bold text-gray-800 text-sm">Delivery in 20 minutes</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#1877F2]">
              Industrial Area, Sector 85, Ropar Division <ChevronDown size={10} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full max-w-2xl bg-[#F3F4F7] rounded-lg border border-gray-200 flex items-center px-4 py-2 relative">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder='Search "Groceries"'
            className="bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-500"
          />
          <div className="hidden md:flex items-center pl-4 border-l border-gray-300 ml-2">
            <span className="text-xs font-semibold text-gray-700 mr-1">All Categories</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1877F2] bg-[#EAF2FF] text-[#1877F2] font-semibold text-sm hover:bg-[#dbeafe] transition">
            <ShoppingCart size={18} />
            <span>My cart</span>
            <span className="bg-[#1877F2] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">1</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1877F2] text-white font-semibold text-sm hover:bg-[#1466d1] transition shadow-lg shadow-blue-200"
          >
            <User size={18} />
            <span>Log in</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
