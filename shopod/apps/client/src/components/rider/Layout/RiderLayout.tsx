"use client";
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';


import { useState } from "react";

export default function RiderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className={`transition-all duration-300 min-h-screen pt-16 ${isSidebarOpen ? 'pl-0' : 'pl-0 md:pl-64'}`}>
                <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
