"use client";
import React, { useState } from "react";
import VendorTable, { Vendor } from "@/components/admin/vendors/VendorTable";
import VendorFilters from "@/components/admin/vendors/VendorFilters";
import { Download, Plus, Store, Users, Clock, Percent } from "lucide-react";

const MOCK_VENDORS: Vendor[] = [
    {
        id: "VND-1001",
        vendorName: "John Smith",
        shopName: "Pizza Hut",
        phone: "+1 234 567 890",
        city: "Mumbai",
        status: "Active",
        commission: 15,
        createdAt: "Jan 12, 2026"
    },
    {
        id: "VND-1002",
        vendorName: "Sarah Connor",
        shopName: "Burger King",
        phone: "+1 987 654 321",
        city: "Delhi",
        status: "Active",
        commission: 12,
        createdAt: "Jan 12, 2026"
    },
    {
        id: "VND-1003",
        vendorName: "Mike Ross",
        shopName: "Green Grocer",
        phone: "+1 555 123 456",
        city: "Bangalore",
        status: "Pending",
        commission: 10,
        createdAt: "Jan 11, 2026"
    },
    {
        id: "VND-1004",
        vendorName: "Harvey Specter",
        shopName: "Subway",
        phone: "+1 444 987 654",
        city: "Pune",
        status: "Blocked",
        commission: 20,
        createdAt: "Dec 30, 2025"
    },
];

export default function VendorsPage() {
    const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);

    const handleSearch = (query: string) => {
        if (!query) {
            setVendors(MOCK_VENDORS);
            return;
        }
        const filtered = MOCK_VENDORS.filter(v =>
            v.vendorName.toLowerCase().includes(query.toLowerCase()) ||
            v.shopName.toLowerCase().includes(query.toLowerCase())
        );
        setVendors(filtered);
    };

    const handleFilterChange = (filters: any) => {
        let filtered = [...MOCK_VENDORS];
        if (filters.city) filtered = filtered.filter(v => v.city === filters.city);
        if (filters.status) filtered = filtered.filter(v => v.status === filters.status);
        setVendors(filtered);
    };

    const handleApprove = (id: string) => {
        if (confirm("Approve this vendor to sell on the platform?")) {
            setVendors(prev => prev.map(v => v.id === id ? { ...v, status: "Active" } : v));
        }
    };

    const handleBlock = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
        if (confirm(`Are you sure you want to ${newStatus === "Blocked" ? "Block" : "Unblock"} this vendor?`)) {
            setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus as any } : v));
        }
    };

    const handleCommissionChange = (id: string, value: number) => {
        setVendors(prev => prev.map(v => v.id === id ? { ...v, commission: value } : v));
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Vendors Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Approve new partners, manage shop visibility and commissions.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} className="text-gray-400" /> Export Partners
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1877F2] rounded-xl text-sm font-bold text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100">
                        <Plus size={18} /> Add Vendor
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#1877F2]/30 transition-all">
                    <div className="p-3 bg-blue-50 text-[#1877F2] rounded-xl group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Vendors</p>
                        <p className="text-2xl font-black text-gray-900">1,240</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-amber-500/30 transition-all">
                    <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Pending Review</p>
                        <p className="text-2xl font-black text-gray-900">42</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-green-500/30 transition-all">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                        <Store size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Shops</p>
                        <p className="text-2xl font-black text-gray-900">1,120</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-purple-500/30 transition-all">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <Percent size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Avg. Commission</p>
                        <p className="text-2xl font-black text-gray-900">14.5%</p>
                    </div>
                </div>
            </div>

            <VendorFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                        {vendors.length} Total Partners
                    </div>
                </div>
                <VendorTable
                    vendors={vendors}
                    onApprove={handleApprove}
                    onBlock={handleBlock}
                    onCommissionChange={handleCommissionChange}
                />
            </div>
        </div>
    );
}
