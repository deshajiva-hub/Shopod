"use client";
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function RiderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <Sidebar />
            <Header />
            <main className="pl-64 pt-16 min-h-screen">
                <div className="p-8 max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
