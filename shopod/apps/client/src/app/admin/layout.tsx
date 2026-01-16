"use client";
import React from "react";
import AdminLayout from "@/components/admin/Layout/AdminLayout";
import RoleGuard from "@/components/common/Auth/RoleGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["admin"]}>
            <AdminLayout>{children}</AdminLayout>
        </RoleGuard>
    );
}
