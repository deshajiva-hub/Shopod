"use client";
import React from "react";
import { CreditCard, ExternalLink, Download, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export interface Transaction {
    id: string;
    orderId: string;
    customer: string;
    amount: string;
    method: string;
    status: "Success" | "Pending" | "Failed" | "Refunded";
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
    const getStatusStyles = (status: Transaction["status"]) => {
        switch (status) {
            case "Success":
                return { bg: "bg-green-50", text: "text-green-600", border: "border-green-100", icon: <CheckCircle size={12} /> };
            case "Pending":
                return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: <Clock size={12} /> };
            case "Failed":
                return { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", icon: <XCircle size={12} /> };
            case "Refunded":
                return { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", icon: <RefreshCw size={12} /> };
            default:
                return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100", icon: null };
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Order Ref</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Payment Method</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((txn) => {
                            const style = getStatusStyles(txn.status);
                            return (
                                <tr key={txn.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#1877F2] transition-colors">
                                                <CreditCard size={14} />
                                            </div>
                                            <span className="font-black text-gray-900">{txn.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/orders/${txn.orderId.replace('#', '')}`}
                                            className="inline-flex items-center gap-1 font-bold text-[#1877F2] hover:underline"
                                        >
                                            {txn.orderId}
                                            <ExternalLink size={12} />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-700">{txn.customer}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-1 rounded text-gray-500">
                                            {txn.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-900">{txn.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${style.bg} ${style.text} ${style.border}`}>
                                            {style.icon}
                                            {txn.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-[11px] font-bold">
                                        {txn.date}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {transactions.length === 0 && (
                <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <CreditCard size={32} />
                    </div>
                    <h3 className="text-gray-900 font-black">No transactions found</h3>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search query.</p>
                </div>
            )}

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {transactions.length} Transactions</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-black text-gray-400 cursor-not-allowed uppercase tracking-widest transition-all">Previous</button>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-black text-gray-600 hover:border-[#1877F2] hover:text-[#1877F2] uppercase tracking-widest transition-all">Next</button>
                </div>
            </div>
        </div>
    );
}
