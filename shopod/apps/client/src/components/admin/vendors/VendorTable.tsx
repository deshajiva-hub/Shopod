"use client";
import React from "react";
import { Link2, MoreVertical, ShieldCheck, ShieldOff, Eye, MapPin, Store, Percent, Calendar } from "lucide-react";
import Link from "next/link";

export interface Vendor {
    id: string;
    vendorName: string;
    shopName: string;
    phone: string;
    city: string;
    status: "Active" | "Pending" | "Blocked";
    commission: number;
    createdAt: string;
}

interface VendorTableProps {
    vendors: Vendor[];
    onApprove: (id: string) => void;
    onBlock: (id: string, currentStatus: string) => void;
    onCommissionChange: (id: string, value: number) => void;
}

const statusStyles = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Blocked: "bg-red-100 text-red-700 border-red-200",
};

export default function VendorTable({ vendors, onApprove, onBlock, onCommissionChange }: VendorTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Vendor & Shop</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Commission</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center border border-[#1877F2]/20">
                                            <Store className="text-[#1877F2]" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{vendor.vendorName}</div>
                                            <div className="text-[10px] text-[#1877F2] font-black uppercase tracking-tight">{vendor.shopName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Calendar size={12} className="text-gray-400" />
                                        </div>
                                        {vendor.phone}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin size={14} className="text-gray-300" />
                                        <span className="text-xs font-semibold">{vendor.city}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative group/input">
                                            <input
                                                type="number"
                                                className="w-16 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-black text-[#1877F2] focus:outline-none focus:ring-1 focus:ring-[#1877F2]"
                                                value={vendor.commission}
                                                onChange={(e) => onCommissionChange(vendor.id, parseFloat(e.target.value))}
                                            />
                                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">%</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusStyles[vendor.status]}`}>
                                        {vendor.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-gray-500">{vendor.createdAt}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/vendors/${vendor.id}`}
                                            className="p-1.5 text-[#1877F2] hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        {vendor.status === "Pending" && (
                                            <button
                                                onClick={() => onApprove(vendor.id)}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-100"
                                                title="Approve Vendor"
                                            >
                                                <ShieldCheck size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onBlock(vendor.id, vendor.status)}
                                            className={`p-1.5 rounded-lg transition-colors border ${vendor.status === "Blocked" ? "text-green-600 hover:bg-green-50 border-green-100" : "text-red-600 hover:bg-red-50 border-red-100"
                                                }`}
                                            title={vendor.status === "Blocked" ? "Unblock Vendor" : "Block Vendor"}
                                        >
                                            {vendor.status === "Blocked" ? <ShieldCheck size={16} /> : <ShieldOff size={16} />}
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
                <p className="text-xs text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{vendors.length}</span> of <span className="font-medium">{vendors.length}</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 bg-[#1877F2] border border-[#1877F2] rounded text-xs font-medium text-white hover:bg-[#166fe5]">Next</button>
                </div>
            </div>
        </div>
    );
}
