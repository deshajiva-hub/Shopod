"use client";
import React from "react";

export default function KPISkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 h-[180px] flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl"></div>
                        <div className="w-16 h-6 bg-gray-50 rounded-lg"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="w-32 h-8 bg-gray-100 rounded-lg"></div>
                        <div className="flex justify-between">
                            <div className="w-24 h-3 bg-gray-50 rounded"></div>
                            <div className="w-12 h-3 bg-gray-50 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
