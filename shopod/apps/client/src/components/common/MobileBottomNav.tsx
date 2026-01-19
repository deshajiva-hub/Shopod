"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, User } from "lucide-react";

export default function MobileBottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Categories", href: "/categories", icon: Grid },
        { name: "Cart", href: "/cart", icon: ShoppingBag },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 md:hidden z-50 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-[#6b4dd7]" : "text-gray-400 hover:text-[#6b4dd7]"
                            }`}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
