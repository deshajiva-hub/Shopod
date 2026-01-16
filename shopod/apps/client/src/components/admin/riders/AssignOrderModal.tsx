"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Search, ShoppingBag, Package, MapPin, Clock, CheckCircle } from "lucide-react";
import { Rider } from "./RiderTable";

interface AssignOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    rider: Rider | null;
    onAssign: (orderId: string, riderId: string) => void;
}

const MOCK_UNASSIGNED_ORDERS = [
    { id: "ORD-2201", restaurant: "Pizza Hut", address: "Bandra West, Mumbai", time: "10 mins ago", items: 3 },
    { id: "ORD-2205", restaurant: "Green Grocer", address: "Andheri East, Mumbai", time: "15 mins ago", items: 5 },
    { id: "ORD-2208", restaurant: "Subway", address: "Worli, Mumbai", time: "22 mins ago", items: 2 },
];

export default function AssignOrderModal({ isOpen, onClose, rider, onAssign }: AssignOrderModalProps) {
    const [searchQuery, setSearchQuery] = useState("");

    if (!rider) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Assign Order to ${rider.name}`}
            size="md"
        >
            <div className="p-8 space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Area..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Available Unassigned Orders</h4>
                    {MOCK_UNASSIGNED_ORDERS.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#1877F2]/30 hover:shadow-lg hover:shadow-blue-100/20 transition-all group cursor-pointer"
                            onClick={() => onAssign(order.id, rider.id)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                                        <ShoppingBag size={16} />
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{order.id}</span>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-1">
                                    <Clock size={12} /> {order.time}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Restaurant</p>
                                    <p className="text-xs font-bold text-gray-700">{order.restaurant}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Distance Area</p>
                                    <p className="text-xs font-bold text-gray-700 flex items-center gap-1">
                                        <MapPin size={12} className="text-gray-300" /> {order.address}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <p className="text-[10px] font-black text-gray-400 uppercase">{order.items} Items Packed</p>
                                <button className="px-4 py-1.5 bg-[#1877F2]/5 text-[#1877F2] rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                                    Assign Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}
