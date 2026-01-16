import React from 'react';

interface RiderStatCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'orange' | 'purple';
}

export default function RiderStatCard({ label, value, subValue, icon, color }: RiderStatCardProps) {
    const colors = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        orange: 'text-orange-600 bg-orange-50',
        purple: 'text-purple-600 bg-purple-50'
    };

    return (
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-2xl ${colors[color]}`}>
                    {icon}
                </div>
                {subValue && (
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                        {subValue}
                    </span>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );
}
