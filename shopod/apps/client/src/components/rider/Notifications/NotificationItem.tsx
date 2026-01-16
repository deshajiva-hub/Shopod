"use client";
import React from 'react';
import { ShoppingBag, IndianRupee, Gift, Flame, AlertTriangle, Clock } from 'lucide-react';

export type NotificationType = 'order' | 'payment' | 'incentive' | 'demand' | 'warning';

interface NotificationItemProps {
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    isRead?: boolean;
    onClick?: () => void;
}

const typeConfigs = {
    order: { icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    payment: { icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    incentive: { icon: Gift, color: 'text-orange-600', bg: 'bg-orange-50' },
    demand: { icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50' }
};

export default function NotificationItem({ type, title, message, time, isRead, onClick }: NotificationItemProps) {
    const config = typeConfigs[type];
    const Icon = config.icon;

    return (
        <div
            onClick={onClick}
            className={`p-4 flex gap-4 hover:bg-gray-50 transition-all cursor-pointer relative ${!isRead ? 'bg-green-50/30' : ''}`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm font-black text-gray-900 ${!isRead ? 'pr-3' : ''}`}>{title}</h4>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest shrink-0">
                        <Clock size={10} /> {time}
                    </span>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {message}
                </p>
                {!isRead && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-green-600 rounded-full"></div>
                )}
            </div>
        </div>
    );
}
