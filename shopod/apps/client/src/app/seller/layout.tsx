"use client";
import React from "react";
import Sidebar from "@/components/seller/Layout/Sidebar";
import Header from "@/components/seller/Layout/Header";
import RoleGuard from "@/components/common/Auth/RoleGuard";

import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <RoleGuard allowedRoles={["seller"]}>
            <div className="flex bg-gray-50 min-h-screen">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <div className={`flex-1 transition-all duration-300 min-h-screen ${isSidebarOpen ? 'ml-0' : 'ml-0 md:ml-64'}`}>
                    <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <main className="p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
