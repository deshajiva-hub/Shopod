"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, User, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotificationDropdown from "../Notifications/NotificationDropdown";
import { Menu } from "lucide-react";

interface RiderHeaderProps {
    onToggleSidebar?: () => void;
}

export default function RiderHeader({ onToggleSidebar }: RiderHeaderProps) {
    const { user } = useSelector((state: RootState) => state.user);
    const userName = user?.email?.split('@')[0] || "Partner";
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-4 md:px-8 transition-all duration-300 md:left-64">
            <div className="flex items-center gap-4 text-gray-400">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                    <MapPin size={16} className="text-green-600" />
                    <span className="text-xs font-bold text-gray-600">Chembur, Mumbai</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
                    <div className="text-right">
                        <p className="text-xs font-black text-gray-900 leading-none capitalize">{userName}</p>
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Gold Partner</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Avatar" />
                    </div>
                </div>

                <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className={`relative p-2.5 rounded-xl transition-all ${isNotificationOpen ? "text-green-600 bg-green-50" : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                            }`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    {isNotificationOpen && (
                        <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
                    )}
                    <button className="p-2.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                        <User size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
