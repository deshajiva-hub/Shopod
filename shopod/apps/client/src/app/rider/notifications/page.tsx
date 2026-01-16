"use client";
import React, { useState } from 'react';
import { Bell, Filter, CheckSquare, Search, Trash2, MoreVertical, Settings } from 'lucide-react';
import NotificationItem, { NotificationType } from '@/components/rider/Notifications/NotificationItem';

const allNotifications = [
    {
        id: '1',
        type: 'order' as NotificationType,
        title: 'New Order Received',
        message: 'Order #ORD-5542 from Burger King is ready for pickup. Customer is 2.5km away.',
        time: '2 mins ago',
        isRead: false
    },
    {
        id: '2',
        type: 'payment' as NotificationType,
        title: 'Payment Received',
        message: 'Your weekly settlement of ₹2,450.00 has been processed successfully to your bank account.',
        time: '1 hour ago',
        isRead: false
    },
    {
        id: '3',
        type: 'demand' as NotificationType,
        title: 'High Demand Zone',
        message: 'Demand is surging in Chembur East! Riders in this zone are earning an extra ₹20 per delivery.',
        time: '4 hours ago',
        isRead: true
    },
    {
        id: '4',
        type: 'incentive' as NotificationType,
        title: 'Daily Goal Reached',
        message: 'Congratulations! You completed 20 deliveries today and earned a ₹500 performance bonus.',
        time: '6 hours ago',
        isRead: true
    },
    {
        id: '5',
        type: 'warning' as NotificationType,
        title: 'Account Warning',
        message: 'Your vehicle insurance is set to expire in 3 days. Please upload new documents to avoid deactivation.',
        time: '1 day ago',
        isRead: true
    },
    {
        id: '6',
        type: 'order' as NotificationType,
        title: 'Order Cancelled',
        message: 'Order #ORD-5510 has been cancelled by the customer. A cancellation fee of ₹25 has been added to your wallet.',
        time: '2 days ago',
        isRead: true
    },
    {
        id: '7',
        type: 'payment' as NotificationType,
        title: 'Instant Payout Success',
        message: 'Your request for instant payout of ₹1,200.00 has been completed.',
        time: '2 days ago',
        isRead: true
    }
];

export default function NotificationsPage() {
    const [filter, setFilter] = useState<'all' | NotificationType>('all');

    const filteredNotifications = filter === 'all'
        ? allNotifications
        : allNotifications.filter(n => n.type === filter);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notification Center</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Stay updated with orders, payments, and system alerts.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckSquare size={18} /> Mark All Read
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                        <Settings size={18} /> Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Filter by Type</h3>
                        <div className="space-y-1">
                            {['all', 'order', 'payment', 'incentive', 'demand', 'warning'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type as any)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${filter === type
                                            ? "bg-green-600 text-white shadow-lg shadow-green-100"
                                            : "text-gray-500 hover:bg-gray-50 text-left"
                                        }`}
                                >
                                    {type}
                                    {filter !== type && (
                                        <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md text-[10px]">
                                            {type === 'all' ? allNotifications.length : allNotifications.filter(n => n.type === type).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold transition-all uppercase tracking-wider">
                            <Trash2 size={16} /> Clear All History
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden divide-y divide-gray-50">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notif) => (
                                <div key={notif.id} className="group relative">
                                    <NotificationItem {...notif} />
                                    <button className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <Bell size={32} />
                                </div>
                                <h4 className="text-lg font-black text-gray-900 tracking-tight">No notifications found</h4>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Try changing your filters</p>
                            </div>
                        )}
                    </div>

                    {filteredNotifications.length > 0 && (
                        <div className="text-center pt-4">
                            <button className="px-8 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200">
                                Load Previous Notifications
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
