import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface AdminLayoutProps {
    children: React.ReactNode;
}

import { useState } from "react";

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
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
                <div className="p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
