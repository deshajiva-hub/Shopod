"use client";
import React from "react";
import { Bike, MoreVertical, Eye, MapPin, CheckCircle2, Star, Calendar, ShoppingBag, ClipboardList } from "lucide-react";

export interface Rider {
    id: string;
    name: string;
    phone: string;
    city: string;
    availability: "Available" | "Busy";
    status: "Online" | "Offline" | "In Order";
    completedOrders: number;
    rating: number;
    joinedDate: string;
}

interface RiderTableProps {
    riders: Rider[];
    onAssignOrder: (rider: Rider) => void;
    onViewHistory: (rider: Rider) => void;
}

const statusStyles = {
    "Online": "bg-green-100 text-green-700 border-green-200",
    "Offline": "bg-gray-100 text-gray-500 border-gray-200",
    "In Order": "bg-blue-100 text-blue-700 border-blue-200",
};

export default function RiderTable({ riders, onAssignOrder, onViewHistory }: RiderTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Delivery Partner</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Availability</th>
                            <th className="px-6 py-4">Performance</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {riders.map((rider) => (
                            <tr key={rider.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center border border-[#1877F2]/20 font-black text-[#1877F2]">
                                            {rider.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-black text-gray-900">{rider.name}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{rider.phone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin size={14} className="text-gray-300" />
                                        <span className="text-xs font-bold">{rider.city}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusStyles[rider.status]}`}>
                                        {rider.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${rider.availability === "Available" ? "bg-green-500" : "bg-amber-500"}`}></div>
                                        <span className="text-xs font-bold text-gray-700">{rider.availability}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                                            {rider.rating} <Star size={12} className="text-orange-500 fill-orange-500" />
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                            {rider.completedOrders} Orders Done
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onAssignOrder(rider)}
                                            className="p-1.5 text-[#1877F2] hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                            title="Assign Order"
                                        >
                                            <ClipboardList size={16} />
                                        </button>
                                        <button
                                            onClick={() => onViewHistory(rider)}
                                            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                            title="View History"
                                        >
                                            <ShoppingBag size={16} />
                                        </button>
                                    </div>
                                    <button className="p-1 text-gray-400 group-hover:hidden transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500 font-bold">Showing <span className="font-black">1</span> to <span className="font-black">{riders.length}</span> of <span className="font-black">{riders.length}</span> partners</p>
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest">Prev</button>
                    <button className="px-4 py-1.5 bg-[#1877F2] text-white rounded-lg text-xs font-black hover:bg-[#166fe5] transition-all uppercase tracking-widest shadow-sm">Next</button>
                </div>
            </div>
        </div>
    );
}
