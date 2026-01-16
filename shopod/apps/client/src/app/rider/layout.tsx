"use client";
import React from 'react';
import RiderLayout from '@/components/rider/Layout/RiderLayout';
import RoleGuard from "@/components/common/Auth/RoleGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["rider"]}>
            <RiderLayout>{children}</RiderLayout>
        </RoleGuard>
    );
}
