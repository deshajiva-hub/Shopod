"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Rider } from "./RiderTable";
import { CheckCircle, Clock, MapPin, Bike, Star, ArrowUpRight, ShoppingBag } from "lucide-react";

interface RiderHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    rider: Rider | null;
}

const MOCK_HISTORY = [
    { id: "ORD-9910", date: "Today, 11:30 AM", status: "Delivered", amount: "$12.50", area: "Bandra" },
    { id: "ORD-9885", date: "Today, 09:15 AM", status: "Delivered", amount: "$8.20", area: "Worli" },
    { id: "ORD-9502", date: "Yesterday, 08:45 PM", status: "Cancelled", amount: "$0.00", area: "Andheri" },
    { id: "ORD-9421", date: "Yesterday, 07:20 PM", status: "Delivered", amount: "$15.00", area: "Bandra" },
];

export default function RiderHistoryModal({ isOpen, onClose, rider }: RiderHistoryModalProps) {
    if (!rider) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Delivery Performance: ${rider.name}`}
            size="lg"
        >
            <div className="p-8 space-y-8">
                {/* Stats Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Deliveries</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-black text-gray-900">{rider.completedOrders}</h3>
                            <div className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                                <ArrowUpRight size={12} /> 15%
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg. Delivery Time</p>
                        <h3 className="text-2xl font-black text-gray-900">24 mins</h3>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Rating</p>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-black text-gray-900">{rider.rating}</h3>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} className={s <= Math.floor(rider.rating) ? "text-orange-500 fill-orange-500" : "text-gray-200"} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                        <ShoppingBag size={14} /> Recent Delivery Logs
                    </h4>
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
                        {MOCK_HISTORY.map((log) => (
                            <div key={log.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                        }`}>
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-gray-900">{log.id}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight ${log.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                }`}>
                                                {log.status}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase flex items-center gap-1">
                                            <Calendar size={12} /> {log.date} • <MapPin size={12} /> {log.area}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-gray-900">Earned: {log.amount}</p>
                                    <button className="text-[10px] font-black text-[#1877F2] uppercase hover:underline mt-1">View Proof</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#1877F2] transition-colors border-2 border-dashed border-gray-100 rounded-2xl">
                        Load Full Delivery Audit Log
                    </button>
                </div>
            </div>
        </Modal>
    );
}
