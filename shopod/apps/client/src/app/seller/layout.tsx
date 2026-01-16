"use client";
import React from "react";
import Sidebar from "@/components/seller/Layout/Sidebar";
import Header from "@/components/seller/Layout/Header";
import RoleGuard from "@/components/common/Auth/RoleGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["seller"]}>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 min-h-screen">
                    <Header />
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
