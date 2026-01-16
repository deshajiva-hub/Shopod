"use client";
import React from "react";
import Link from "next/link";
import { Eye, Edit2, XCircle, MoreVertical } from "lucide-react";

interface Order {
    id: string;
    customer: string;
    phone: string;
    vendor: string;
    city: string;
    date: string;
    paymentMode: string;
    paymentStatus: string;
    orderStatus: "Pending" | "Confirmed" | "Out for Delivery" | "Delivered" | "Cancelled";
    total: string;
}

interface OrderTableProps {
    orders: Order[];
    onEdit: (id: string) => void;
    onCancel: (id: string) => void;
}

const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    "Out for Delivery": "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const paymentStatusStyles = {
    Paid: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Failed: "bg-red-50 text-red-600 border-red-100",
};

export default function OrderTable({ orders, onEdit, onCancel }: OrderTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Vendor</th>
                            <th className="px-6 py-4">City</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-[#1877F2] hover:underline cursor-pointer">
                                        {order.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{order.customer}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{order.phone}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                        {order.vendor}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{order.city}</td>
                                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase font-bold text-gray-400">{order.paymentMode}</span>
                                        <span className={`w-fit px-2 py-0.5 rounded-full text-[10px] font-bold border ${paymentStatusStyles[order.paymentStatus as keyof typeof paymentStatusStyles] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ${statusStyles[order.orderStatus]}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/orders/${order.id.replace('#', '')}`}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <button
                                            onClick={() => onEdit(order.id)}
                                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                            title="Edit Order"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onCancel(order.id)}
                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Cancel Order"
                                        >
                                            <XCircle size={16} />
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
                <p className="text-xs text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">45</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 bg-[#1877F2] border border-[#1877F2] rounded text-xs font-medium text-white hover:bg-[#166fe5]">Next</button>
                </div>
            </div>
        </div>
    );
}
