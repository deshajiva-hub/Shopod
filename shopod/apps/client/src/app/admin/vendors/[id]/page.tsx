"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Store,
    Smartphone,
    MapPin,
    Calendar,
    CheckCircle,
    ShieldOff,
    Package,
    ShoppingBag,
    BarChart3,
    DollarSign,
    ExternalLink,
    ArrowUpRight,
    ArrowDownRight,
    Percent
} from "lucide-react";

const MOCK_VENDOR = {
    id: "VND-1001",
    vendorName: "John Smith",
    shopName: "Pizza Hut",
    phone: "+1 234 567 890",
    email: "john@pizzahut.com",
    city: "Mumbai",
    status: "Active",
    commission: 15,
    createdAt: "Jan 12, 2026",
    totalSales: "$45,280",
    totalOrders: 1250,
    totalProducts: 48,
    earnings: "$38,488",
};

const MOCK_PRODUCTS = [
    { id: "PRD-001", name: "Margherita Pizza", category: "Pizza", price: "$12.99", stock: 120, status: "Active" },
    { id: "PRD-002", name: "Pepperoni Feast", category: "Pizza", price: "$15.99", stock: 85, status: "Active" },
    { id: "PRD-003", name: "Garlic Breadsticks", category: "Sides", price: "$5.99", stock: 200, status: "Active" },
];

export default function VendorDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;
    const [activeTab, setActiveTab] = useState<"products" | "orders" | "earnings">("products");

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold transition-colors w-fit"
                >
                    <ChevronLeft size={20} /> Back to Vendors
                </button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-[#1877F2]/10 border-2 border-white shadow-xl flex items-center justify-center">
                            <Store className="text-[#1877F2]" size={40} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{MOCK_VENDOR.shopName}</h1>
                                <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {MOCK_VENDOR.status}
                                </span>
                            </div>
                            <p className="text-gray-500 font-bold text-sm mt-1">{MOCK_VENDOR.vendorName} • Partner since {MOCK_VENDOR.createdAt}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all">
                            <ShieldOff size={18} /> Block Vendor
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100">
                            <CheckCircle size={18} /> Approve Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Sales</p>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-black text-gray-900">{MOCK_VENDOR.totalSales}</p>
                        <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold">
                            <ArrowUpRight size={14} /> 12%
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-black text-gray-900">{MOCK_VENDOR.totalOrders}</p>
                        <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold">
                            <ArrowUpRight size={14} /> 5.4%
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Products</p>
                    <p className="text-2xl font-black text-gray-900">{MOCK_VENDOR.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Commission Earned</p>
                    <p className="text-2xl font-black text-gray-900">$6,792</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Info */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2">
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</p>
                                    <p className="text-sm font-bold text-gray-900">{MOCK_VENDOR.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Location</p>
                                    <p className="text-sm font-bold text-gray-900">{MOCK_VENDOR.city}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Agreement Date</p>
                                    <p className="text-sm font-bold text-gray-900">{MOCK_VENDOR.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1877F2] p-6 rounded-2xl text-white shadow-xl shadow-blue-100 space-y-4">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Store Commission</p>
                            <Percent size={20} className="opacity-80" />
                        </div>
                        <p className="text-4xl font-black">{MOCK_VENDOR.commission}%</p>
                        <p className="text-xs font-medium opacity-80 leading-relaxed">System automatically deducts this percentage from every successful order payout.</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-xs uppercase tracking-widest border border-white/20 transition-all">
                            Update Commission
                        </button>
                    </div>
                </div>

                {/* Right: Content Tabs */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex bg-gray-100 p-1 rounded-2xl w-fit">
                        {[
                            { id: "products", label: "Catalog", icon: <Package size={16} /> },
                            { id: "orders", label: "Recent Orders", icon: <ShoppingBag size={16} /> },
                            { id: "earnings", label: "Earnings Log", icon: <BarChart3 size={16} /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? "bg-white text-[#1877F2] shadow-sm"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                        {activeTab === "products" && (
                            <div className="divide-y divide-gray-50">
                                {MOCK_PRODUCTS.map((product) => (
                                    <div key={product.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                <Package className="text-gray-300" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{product.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category} • In Stock: {product.stock}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <p className="text-sm font-black text-gray-900">{product.price}</p>
                                            <button className="p-2 text-gray-400 hover:text-[#1877F2] transition-colors opacity-0 group-hover:opacity-100">
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#1877F2] transition-colors bg-gray-50">
                                    View Entire Master Catalog
                                </button>
                            </div>
                        )}
                        {activeTab === "orders" && (
                            <div className="p-12 text-center space-y-3">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <ShoppingBag size={32} />
                                </div>
                                <h4 className="text-lg font-black text-gray-900">Recent Transactions</h4>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">This vendor has no recent orders in the last 24 hours. Check back later.</p>
                            </div>
                        )}
                        {activeTab === "earnings" && (
                            <div className="p-12 text-center space-y-3">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <BarChart3 size={32} />
                                </div>
                                <h4 className="text-lg font-black text-gray-900">Revenue Analytics</h4>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">Revenue data is currently being synced. Detailed charts will be available soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
