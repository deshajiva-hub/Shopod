"use client";
import React from "react";
import { ArrowUpRight, ArrowDownRight, Info, LucideIcon } from "lucide-react";
import Link from "next/link";

interface KPICardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend: string;
    isUp: boolean;
    period: string;
    tooltip: string;
    href: string;
    color: "blue" | "orange" | "green" | "purple" | "red" | "yellow" | "indigo" | "pink";
}

const colorMap = {
    blue: { bg: "bg-blue-600 shadow-blue-100", iconBg: "bg-blue-50 text-blue-600", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    orange: { bg: "bg-orange-500 shadow-orange-100", iconBg: "bg-orange-50 text-orange-500", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    green: { bg: "bg-green-500 shadow-green-100", iconBg: "bg-green-50 text-green-500", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    purple: { bg: "bg-purple-600 shadow-purple-100", iconBg: "bg-purple-50 text-purple-600", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    red: { bg: "bg-red-500 shadow-red-100", iconBg: "bg-red-50 text-red-500", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    yellow: { bg: "bg-amber-400 shadow-amber-100", iconBg: "bg-amber-50 text-amber-600", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    indigo: { bg: "bg-indigo-600 shadow-indigo-100", iconBg: "bg-indigo-50 text-indigo-600", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
    pink: { bg: "bg-pink-500 shadow-pink-100", iconBg: "bg-pink-50 text-pink-500", trendPos: "bg-green-50 text-green-600", trendNeg: "bg-red-50 text-red-600" },
};

export default function KPICard({
    title,
    value,
    icon,
    trend,
    isUp,
    period,
    tooltip,
    href,
    color
}: KPICardProps) {
    const theme = colorMap[color];

    return (
        <Link
            href={href}
            className="group block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
        >
            {/* Background Accent */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 ${theme.bg}`}></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3 rounded-2xl shadow-lg text-white transform group-hover:-translate-y-1 transition-transform duration-300 ${theme.bg}`}>
                    {icon}
                </div>
                <div className="flex items-center gap-1.5">
                    <div
                        className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${isUp ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                            }`}
                    >
                        {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {trend}
                    </div>
                    <div className="group/tip relative">
                        <Info size={14} className="text-gray-300 hover:text-[#1877F2] transition-colors cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all shadow-xl z-50">
                            {tooltip}
                            <div className="absolute top-full right-1.5 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight transition-all group-hover:translate-x-1 duration-300">{value}</h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase italic">vs {period}</span>
                </div>
            </div>

            <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 absolute bottom-0 left-0 ${theme.bg}`}></div>
        </Link>
    );
}
