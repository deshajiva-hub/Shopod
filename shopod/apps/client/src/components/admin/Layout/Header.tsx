"use client";
import React from "react";
import { Bell, Search, Menu } from "lucide-react";

interface HeaderProps {
    onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-4 md:px-6 transition-all duration-300 md:left-64">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                >
                    <Menu size={24} />
                </button>
                <div className="md:hidden font-bold text-[#1877F2]">
                    Shopod<span className="text-gray-400 font-normal">Admin</span>
                </div>
                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg w-96">
                    <Search className="text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search everywhere..."
                        className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@shopod.com</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                        AU
                    </div>
                </div>
            </div>
        </header>
    );
}
