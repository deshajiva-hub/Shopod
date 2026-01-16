"use client";
import React, { useState, useMemo } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, PieChart, TrendingUp, AlertCircle, RefreshCcw } from "lucide-react";
import TransactionTable, { Transaction } from "@/components/admin/transactions/TransactionTable";
import TransactionFilters from "@/components/admin/transactions/TransactionFilters";

const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: "TXN-7701", orderId: "#ORD-9901", customer: "Liam Johnson", amount: "₹4,250.00", method: "Razorpay", status: "Success", date: "2026-01-12 14:30" },
    { id: "TXN-7702", orderId: "#ORD-9902", customer: "Olivia Smith", amount: "₹1,240.20", method: "UPI", status: "Success", date: "2026-01-12 12:15" },
    { id: "TXN-7703", orderId: "#ORD-9903", customer: "Noah Williams", amount: "₹890.00", method: "COD", status: "Pending", date: "2026-01-11 19:45" },
    { id: "TXN-7704", orderId: "#ORD-9904", customer: "Emma Brown", amount: "₹320.00", method: "Credit Card", status: "Failed", date: "2026-01-10 10:20" },
    { id: "TXN-7705", orderId: "#ORD-9905", customer: "Ava Jones", amount: "₹12,600.00", method: "Bank Transfer", status: "Success", date: "2026-01-09 16:00" },
    { id: "TXN-7706", orderId: "#ORD-9906", customer: "Lucas Miller", amount: "₹2,150.00", method: "Razorpay", status: "Refunded", date: "2026-01-08 11:30" },
    { id: "TXN-7707", orderId: "#ORD-9907", customer: "Sophia Garcia", amount: "₹5,400.00", method: "UPI", status: "Success", date: "2026-01-07 09:15" },
];

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [methodFilter, setMethodFilter] = useState("All");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const filteredTransactions = useMemo(() => {
        return transactions.filter(txn => {
            const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                txn.customer.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === "All" || txn.status === statusFilter;
            const matchesMethod = methodFilter === "All" || txn.method === methodFilter;

            const txnDate = txn.date.split(' ')[0]; // Extract YYYY-MM-DD
            const matchesDate = (!dateRange.start || txnDate >= dateRange.start) &&
                (!dateRange.end || txnDate <= dateRange.end);

            return matchesSearch && matchesStatus && matchesMethod && matchesDate;
        });
    }, [transactions, searchQuery, statusFilter, methodFilter, dateRange]);

    const handleExport = () => {
        const headers = ["Transaction ID,Order ID,Customer,Amount,Method,Status,Date"];
        const rows = filteredTransactions.map(t =>
            `${t.id},${t.orderId},${t.customer},"${t.amount}",${t.method},${t.status},${t.date}`
        );

        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Shopod_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const stats = useMemo(() => {
        const successOnly = filteredTransactions.filter(t => t.status === "Success");
        const totalAmount = successOnly.reduce((acc, t) => acc + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0);
        return {
            volume: `₹${totalAmount.toLocaleString()}`,
            count: filteredTransactions.length,
            successRate: filteredTransactions.length ? ((successOnly.length / filteredTransactions.length) * 100).toFixed(1) + "%" : "0%",
            failed: filteredTransactions.filter(t => t.status === "Failed").length,
            pending: filteredTransactions.filter(t => t.status === "Pending").length
        };
    }, [filteredTransactions]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Financial Records</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest">Audit payments, track settlements, and manage platform cashflow.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 rounded-xl text-xs font-black hover:bg-[#1877F2] hover:text-white transition-all uppercase tracking-widest">
                        <RefreshCcw size={18} /> Sync Gateway
                    </button>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#1877F2]/30 transition-all">
                    <div className="p-3 bg-blue-50 text-[#1877F2] rounded-xl group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Volume</p>
                        <p className="text-2xl font-black text-gray-900">{stats.volume}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-green-500/30 transition-all">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</p>
                        <p className="text-2xl font-black text-gray-900">{stats.successRate}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-red-500/30 transition-all">
                    <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Failed Attempts</p>
                        <p className="text-2xl font-black text-gray-900">{stats.failed}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-amber-500/30 transition-all">
                    <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <RefreshCcw size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Payouts</p>
                        <p className="text-2xl font-black text-gray-900">{stats.pending}</p>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <TransactionFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                methodFilter={methodFilter}
                onMethodChange={setMethodFilter}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                onExport={handleExport}
            />

            {/* Main Table */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time Financial Stream</span>
                </div>
                <TransactionTable transactions={filteredTransactions} />
            </div>
        </div>
    );
}
