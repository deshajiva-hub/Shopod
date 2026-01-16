"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    DollarSign,
    User,
    LogOut,
    Bell,
    Bike,
    Settings,
    HelpCircle
} from "lucide-react";

const menuItems = [
    { name: "Live Dashboard", icon: LayoutDashboard, href: "/rider" },
    { name: "My Deliveries", icon: ShoppingBag, href: "/rider/orders" },
    { name: "Earnings & Payouts", icon: DollarSign, href: "/rider/earnings" },
    { name: "Notifications", icon: Bell, href: "/rider/notifications" },
];

const accountItems = [
    { name: "Profile & KYC", icon: User, href: "/rider/profile" },
    { name: "Settings", icon: Settings, href: "/rider/settings" },
    { name: "Support Center", icon: HelpCircle, href: "/rider/support" },
];

export default function RiderSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-[#F8F9FB]/50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-100">
                        <Bike className="text-white" size={18} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tighter">
                        SHOPOD<span className="text-green-600">RIDER</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3">
                <div className="space-y-8">
                    <div>
                        <h3 className="px-3 mb-3 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            Operations
                        </h3>
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                                                ? "bg-green-600 text-white shadow-lg shadow-green-100"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <h3 className="px-3 mb-3 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            Account
                        </h3>
                        <ul className="space-y-1">
                            {accountItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                                                ? "bg-green-600 text-white shadow-lg shadow-green-100"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Status Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">Online & Active</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userRole");
                        window.location.href = "/login";
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
