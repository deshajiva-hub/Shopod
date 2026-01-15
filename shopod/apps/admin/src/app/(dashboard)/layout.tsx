"use client";
import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <AdminLayout>{children}</AdminLayout>
        </AuthGuard>
    );
}
