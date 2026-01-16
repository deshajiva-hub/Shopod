"use client";
import React, { useState } from "react";
import RiderTable, { Rider } from "@/components/admin/riders/RiderTable";
import RiderFilters from "@/components/admin/riders/RiderFilters";
import AssignOrderModal from "@/components/admin/riders/AssignOrderModal";
import RiderHistoryModal from "@/components/admin/riders/RiderHistoryModal";
import { Bike, Users, Clock, Star, Plus, Download } from "lucide-react";

const MOCK_RIDERS: Rider[] = [
    {
        id: "RID-201",
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        city: "Mumbai",
        availability: "Available",
        status: "Online",
        completedOrders: 1540,
        rating: 4.8,
        joinedDate: "Mar 12, 2025"
    },
    {
        id: "RID-202",
        name: "Amit Kumar",
        phone: "+91 98234 56789",
        city: "Delhi",
        availability: "Busy",
        status: "In Order",
        completedOrders: 980,
        rating: 4.5,
        joinedDate: "Apr 05, 2025"
    },
    {
        id: "RID-203",
        name: "Suresh Pillai",
        phone: "+91 99887 76655",
        city: "Bangalore",
        availability: "Available",
        status: "Offline",
        completedOrders: 2100,
        rating: 4.9,
        joinedDate: "Jan 20, 2025"
    },
    {
        id: "RID-204",
        name: "Vikram Singh",
        phone: "+91 91234 56780",
        city: "Mumbai",
        availability: "Available",
        status: "Online",
        completedOrders: 420,
        rating: 4.2,
        joinedDate: "Dec 15, 2025"
    },
];

export default function RidersPage() {
    const [riders, setRiders] = useState<Rider[]>(MOCK_RIDERS);
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const handleSearch = (query: string) => {
        if (!query) {
            setRiders(MOCK_RIDERS);
            return;
        }
        const filtered = MOCK_RIDERS.filter(r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.phone.includes(query)
        );
        setRiders(filtered);
    };

    const handleFilterChange = (filters: any) => {
        let filtered = [...MOCK_RIDERS];
        if (filters.city) filtered = filtered.filter(r => r.city === filters.city);
        if (filters.status) filtered = filtered.filter(r => r.status === filters.status);
        setRiders(filtered);
    };

    const handleAssignOrder = (rider: Rider) => {
        setSelectedRider(rider);
        setIsAssignModalOpen(true);
    };

    const handleViewHistory = (rider: Rider) => {
        setSelectedRider(rider);
        setIsHistoryModalOpen(true);
    };

    const handleProcessAssignment = (orderId: string, riderId: string) => {
        alert(`Order ${orderId} has been manually assigned to Partner ${riderId}. Rider notification sent.`);
        setIsAssignModalOpen(false);
        // In real app, update state/API
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Delivery Fleet Management</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest">Track, Verify and Optimize Rider Performance.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                        <Download size={18} className="text-gray-400" /> Export List
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#1877F2] rounded-xl text-xs font-black text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest">
                        <Plus size={18} /> Onboard Partner
                    </button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Active Partners" value="1,245" subValue="+12 Today" icon={<Bike size={24} />} color="blue" />
                <MetricCard title="In Delivery" value="452" subValue="85% Efficiency" icon={<Users size={24} />} color="green" />
                <MetricCard title="Avg. Rating" value="4.82" subValue="High Satisfaction" icon={<Star size={24} />} color="orange" />
                <MetricCard title="On Time Rate" value="98.2%" subValue="-0.5% Since Prev." icon={<Clock size={24} />} color="purple" />
            </div>

            {/* Filtering & Search */}
            <RiderFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            {/* Main Fleet Table */}
            <div className="relative">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-[10px] font-black uppercase tracking-wider mb-4 w-fit">
                    <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                    {riders.length} Partners Syncing Live
                </div>
                <RiderTable
                    riders={riders}
                    onAssignOrder={handleAssignOrder}
                    onViewHistory={handleViewHistory}
                />
            </div>

            {/* Account Management Modals */}
            <AssignOrderModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                rider={selectedRider}
                onAssign={handleProcessAssignment}
            />

            <RiderHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                rider={selectedRider}
            />
        </div>
    );
}

function MetricCard({ title, value, subValue, icon, color }: any) {
    const accentColors: any = {
        blue: "bg-[#1877F2] text-white shadow-blue-100",
        green: "bg-green-600 text-white shadow-green-100",
        orange: "bg-orange-600 text-white shadow-orange-100",
        purple: "bg-purple-600 text-white shadow-purple-100"
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#1877F2]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${accentColors[color]} shadow-lg transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                {subValue}
            </p>
        </div>
    );
}
