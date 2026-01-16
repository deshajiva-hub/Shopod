"use client";
import React from 'react';
import Link from 'next/link';
import { Bell, CheckSquare, Settings } from 'lucide-react';
import NotificationItem, { NotificationType } from './NotificationItem';

const mockNotifications = [
    {
        id: '1',
        type: 'order' as NotificationType,
        title: 'New Order Received',
        message: 'Order #ORD-5542 from Burger King is ready for pickup.',
        time: '2 mins ago',
        isRead: false
    },
    {
        id: '2',
        type: 'payment' as NotificationType,
        title: 'Payment Received',
        message: '₹2,450.00 has been credited to your wallet.',
        time: '1 hour ago',
        isRead: false
    },
    {
        id: '3',
        type: 'demand' as NotificationType,
        title: 'High Demand Zone',
        message: 'High demand in Chembur East! Earn 1.5x surge on orders.',
        time: '3 hours ago',
        isRead: true
    },
    {
        id: '4',
        type: 'incentive' as NotificationType,
        title: 'Daily Goal Reached',
        message: 'You unlocked a ₹500 bonus for 20 deliveries!',
        time: '5 hours ago',
        isRead: true
    },
    {
        id: '5',
        type: 'warning' as NotificationType,
        title: 'Account Warning',
        message: 'Your document (Insurance) is expiring in 3 days.',
        time: '1 day ago',
        isRead: true
    }
];

export default function NotificationDropdown({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute top-full right-0 mt-4 w-[380px] bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-[100]">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Notifications</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">You have 2 unread alerts</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100 transition-all">
                        <CheckSquare size={18} />
                    </button>
                    <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100 transition-all">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
                {mockNotifications.map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        {...notif}
                        onClick={onClose}
                    />
                ))}
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
                <Link
                    href="/rider/notifications"
                    onClick={onClose}
                    className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline"
                >
                    View All Notifications
                </Link>
            </div>
        </div>
    );
}
