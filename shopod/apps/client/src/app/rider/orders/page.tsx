"use client";
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, ChevronRight, CheckCircle2, XCircle, IndianRupee, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function RiderOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const allOrders = useMemo(() => [
        { id: 'ORD-8842', store: 'Starbucks', status: 'Delivered', time: '2:45 PM', amount: '₹420', address: 'Malad West, Sector 5', items: '2 Items', icon: '☕' },
        { id: 'ORD-8840', store: 'Green Grocery', status: 'Delivered', time: '1:12 PM', amount: '₹1,150', address: 'Kandivali, Regency Garden', items: '5 Items', icon: '🍎' },
        { id: 'ORD-8795', store: 'The Burger Shop', status: 'Cancelled', time: '11:20 AM', amount: '₹340', address: 'Borivali, Link Road', items: '1 Item', icon: '🍔' },
        { id: 'ORD-8750', store: 'Medicine Plus', status: 'Delivered', time: 'Yesterday', amount: '₹890', address: 'Andheri, Model Town', items: '3 Items', icon: '💊' },
        { id: 'ORD-8742', store: 'Pizza Hut', status: 'Delivered', time: 'Yesterday', amount: '₹560', address: 'Malad East, Near Station', items: '1 Item', icon: '🍕' },
        { id: 'ORD-8730', store: 'KFC', status: 'Delivered', time: 'Oct 15', amount: '₹720', address: 'Goregaon West, Hub Mall', items: '4 Items', icon: '🍗' },
        { id: 'ORD-8721', store: 'Fresh Fruits', status: 'Cancelled', time: 'Oct 15', amount: '₹210', address: 'Dahisar East, Market Yard', items: '2 Items', icon: '🍇' },
        { id: 'ORD-8710', store: 'Subway', status: 'Delivered', time: 'Oct 14', amount: '₹380', address: 'Malad North, Tech Park', items: '1 Item', icon: '🥪' },
        { id: 'ORD-8705', store: 'Baskin Robbins', status: 'Delivered', time: 'Oct 14', amount: '₹150', address: 'Borivali East, IC Colony', items: '1 Item', icon: '🍦' },
        { id: 'ORD-8698', store: 'Pharmacy Direct', status: 'Delivered', time: 'Oct 13', amount: '₹1,200', address: 'Kandivali West, MG Road', items: '7 Items', icon: '🏥' },
    ], []);

    const filteredOrders = useMemo(() => {
        return allOrders.filter(order => {
            const matchesSearch =
                order.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.address.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === "All Status" || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter, allOrders]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleExport = () => {
        toast.success("Exporting delivery history to CSV...");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Delivery History</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Manage and Track all your past deliveries.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="w-full md:w-auto px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <Download size={18} className="text-gray-400" /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search deliveries by ID, Store or Location..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-bold"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="flex-1 md:flex-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm font-bold text-gray-600 appearance-none min-w-[140px] cursor-pointer"
                    >
                        <option>All Status</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("All Status");
                            setCurrentPage(1);
                        }}
                        className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-green-600 transition-all"
                    >
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Orders Table-like List */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order & Store</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right px-8">Earnings</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                                    {order.icon}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 tracking-tight">{order.store}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.id} • {order.items}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-bold text-gray-700">{order.address}</p>
                                                <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                                    <Clock size={12} /> {order.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-sm font-black text-green-600">{order.amount}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inc. Fee</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'Delivered'
                                                ? 'bg-green-50 text-green-600 border-green-100'
                                                : 'bg-red-50 text-red-500 border-red-100'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-300 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                                                <ChevronRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                            <Search size={32} />
                                        </div>
                                        <h4 className="text-lg font-black text-gray-900 tracking-tight">No deliveries found</h4>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Try adjusting your search or filters</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length > 0 && (
                    <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-bold text-gray-400">
                            Showing {Math.min(filteredOrders.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(filteredOrders.length, currentPage * itemsPerPage)} of {filteredOrders.length} deliveries
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1.5 px-4 font-black text-[10px] text-gray-900">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg transition-all ${currentPage === page
                                            ? "bg-green-600 text-white shadow-lg shadow-green-100"
                                            : "text-gray-400 hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
