"use client";
import React, { useState } from "react";
import RiderTable, { Rider } from "@/components/admin/riders/RiderTable";
import RiderFilters from "@/components/admin/riders/RiderFilters";
import AssignOrderModal from "@/components/admin/riders/AssignOrderModal";
import RiderHistoryModal from "@/components/admin/riders/RiderHistoryModal";
import { Bike, Users, Clock, Star, Plus, Download, X } from "lucide-react";

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
    {
        id: "RID-205",
        name: "Priya Das",
        phone: "+91 91234 56781",
        city: "Kolkata",
        availability: "Available",
        status: "Online",
        completedOrders: 850,
        rating: 4.7,
        joinedDate: "Feb 10, 2025"
    },
    {
        id: "RID-206",
        name: "Arjun Reddy",
        phone: "+91 91234 56782",
        city: "Hyderabad",
        availability: "Busy",
        status: "In Order",
        completedOrders: 1200,
        rating: 4.6,
        joinedDate: "May 22, 2025"
    },
    {
        id: "RID-207",
        name: "Sneha Kapur",
        phone: "+91 91234 56783",
        city: "Pune",
        availability: "Available",
        status: "Offline",
        completedOrders: 310,
        rating: 4.4,
        joinedDate: "Jun 01, 2025"
    },
    {
        id: "RID-208",
        name: "Mohit Verma",
        phone: "+91 91234 56784",
        city: "Mumbai",
        availability: "Available",
        status: "Online",
        completedOrders: 2700,
        rating: 5.0,
        joinedDate: "Oct 12, 2024"
    },
    {
        id: "RID-209",
        name: "Deepak Choudhary",
        phone: "+91 91234 56785",
        city: "Chennai",
        availability: "Busy",
        status: "In Order",
        completedOrders: 560,
        rating: 4.1,
        joinedDate: "Jul 18, 2025"
    },
    {
        id: "RID-210",
        name: "Karan Malhotra",
        phone: "+91 91234 56786",
        city: "Delhi",
        availability: "Available",
        status: "Online",
        completedOrders: 1120,
        rating: 4.7,
        joinedDate: "Aug 05, 2025"
    }
];

export default function RidersPage() {
    const [riders, setRiders] = useState<Rider[]>(MOCK_RIDERS);
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);

    const [newRider, setNewRider] = useState({
        name: "",
        phone: "",
        city: "Mumbai"
    });

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
        if (filters.city && filters.city !== "All Cities") filtered = filtered.filter(r => r.city === filters.city);
        if (filters.status && filters.status !== "All Status") filtered = filtered.filter(r => r.status === filters.status);
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
    };

    const handleOnboard = (e: React.FormEvent) => {
        e.preventDefault();
        const rider: Rider = {
            id: `RID-${210 + riders.length + 1}`,
            name: newRider.name,
            phone: newRider.phone,
            city: newRider.city,
            availability: "Available",
            status: "Online",
            completedOrders: 0,
            rating: 5.0,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };
        setRiders([rider, ...riders]);
        setIsOnboardModalOpen(false);
        setNewRider({ name: "", phone: "", city: "Mumbai" });
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
                    <button
                        onClick={() => setIsOnboardModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#1877F2] rounded-xl text-xs font-black text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
                    >
                        <Plus size={18} /> Onboard Partner
                    </button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Active Partners" value={riders.length.toString()} subValue="+12 Today" icon={<Bike size={24} />} color="blue" />
                <MetricCard title="In Delivery" value="4" subValue="85% Efficiency" icon={<Users size={24} />} color="green" />
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

            {/* Modals */}
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

            {/* Onboard Modal */}
            {isOnboardModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOnboardModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="h-2 bg-[#1877F2]"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Onboard Partner</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manual Enrollment</p>
                                </div>
                                <button onClick={() => setIsOnboardModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleOnboard} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newRider.name}
                                        onChange={e => setNewRider({ ...newRider, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm font-bold"
                                        placeholder="Enter rider name"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={newRider.phone}
                                        onChange={e => setNewRider({ ...newRider, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm font-bold"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Primary City</label>
                                    <select
                                        value={newRider.city}
                                        onChange={e => setNewRider({ ...newRider, city: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm font-bold appearance-none appearance-none"
                                    >
                                        <option>Mumbai</option>
                                        <option>Delhi</option>
                                        <option>Bangalore</option>
                                        <option>Hyderabad</option>
                                        <option>Hyderabad</option>
                                        <option>Kolkata</option>
                                    </select>
                                </div>

                                <button type="submit" className="w-full py-4 bg-[#1877F2] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
                                    Confirm Onboarding
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
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
