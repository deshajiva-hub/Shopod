"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { User, Mail, Phone, Calendar, Clock, CreditCard, ShoppingBag, MapPin, ShieldOff, ShieldCheck } from "lucide-react";
import { UserData } from "./UserTable";

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData | null;
    onToggleStatus: (id: string, currentStatus: string) => void;
}

const MOCK_ORDER_HISTORY = [
    { id: "#ORD-7721", date: "Jan 12, 2026", vendor: "Pizza Hut", total: "$124.50", status: "Delivered" },
    { id: "#ORD-7715", date: "Dec 28, 2025", vendor: "Burger King", total: "$42.20", status: "Delivered" },
    { id: "#ORD-7690", date: "Nov 15, 2025", vendor: "Green Grocer", total: "$289.00", status: "Cancelled" },
];

export default function UserProfileModal({ isOpen, onClose, user, onToggleStatus }: UserProfileModalProps) {
    if (!user) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="User Profile Details"
            size="lg"
        >
            <div className="p-8 space-y-8">
                {/* Header Profile Section */}
                <div className="flex items-start gap-6 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-[#1877F2]/10 flex items-center justify-center border-4 border-white shadow-lg shrink-0">
                        <span className="text-3xl font-black text-[#1877F2]">{user.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.status === "Active" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                                }`}>
                                {user.status}
                            </span>
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">User ID: {user.id} • {user.role}</p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Mail size={16} className="text-gray-400" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Phone size={16} className="text-gray-400" />
                                {user.phone}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info & Stats */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Clock size={14} /> Account Activity
                            </h4>
                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-gray-500 font-medium">Joined On</span>
                                    <span className="text-gray-800">{user.createdAt}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-gray-500 font-medium">Last Login</span>
                                    <span className="text-gray-800">2 hours ago</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-gray-500 font-medium">Platform</span>
                                    <span className="text-gray-800">iOS App</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Management Actions</h4>
                            <button
                                onClick={() => onToggleStatus(user.id, user.status)}
                                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm ${user.status === "Blocked"
                                        ? "bg-green-600 text-white hover:bg-green-700 shadow-green-100"
                                        : "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                                    }`}
                            >
                                {user.status === "Blocked" ? (
                                    <><ShieldCheck size={18} /> Unblock Account</>
                                ) : (
                                    <><ShieldOff size={18} /> Block User Account</>
                                )}
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">
                                {user.status === "Blocked"
                                    ? "Unblocking will restore user access to the platform."
                                    : "Blocking will immediately restrict user access."}
                            </p>
                        </div>
                    </div>

                    {/* Order History Summary */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <ShoppingBag size={14} /> Recent Order History
                        </h4>
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-50">
                            {MOCK_ORDER_HISTORY.map((order) => (
                                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-black text-[#1877F2]">{order.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{order.vendor}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{order.date}</p>
                                        </div>
                                        <span className="text-sm font-black text-gray-900">{order.total}</span>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#1877F2] transition-colors">
                                View Full Order History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
