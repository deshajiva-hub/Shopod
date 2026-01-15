"use client";
import Link from 'next/link';

export default function MobileBottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around md:hidden px-4 z-50">
            {[
                { label: 'Home', icon: '🏠', href: '/' },
                { label: 'Search', icon: '🔍', href: '/search' },
                { label: 'Categories', icon: '📦', href: '/categories' },
                { label: 'Profile', icon: '👤', href: '/profile' },
            ].map((item) => (
                <Link key={item.label} href={item.href} className="flex flex-col items-center justify-center gap-1 group">
                    <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-primary transition-colors cursor-pointer">{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
