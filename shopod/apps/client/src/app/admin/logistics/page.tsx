"use client";
import React, { useState } from "react";
import CityTable, { City } from "@/components/admin/logistics/CityTable";
import CityFormModal from "@/components/admin/logistics/CityFormModal";
import ZoneManagementModal from "@/components/admin/logistics/ZoneManagementModal";
import { Plus, Download, MapPin, Navigation, Settings, Search, RefreshCw, BarChart3 } from "lucide-react";

const INITIAL_CITIES: City[] = [
    { id: "CTY-101", name: "Mumbai", status: "Active", zonesCount: 12, ridersCount: 450, baseChargeRange: "₹30 - ₹60" },
    { id: "CTY-102", name: "Delhi", status: "Active", zonesCount: 18, ridersCount: 620, baseChargeRange: "₹25 - ₹50" },
    { id: "CTY-103", name: "Bangalore", status: "Inactive", zonesCount: 15, ridersCount: 510, baseChargeRange: "₹40 - ₹80" },
];

export default function LogisticsPage() {
    const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState<City | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSaveCity = (data: Partial<City>) => {
        if (editingCity) {
            setCities(cities.map(c => c.id === editingCity.id ? { ...c, ...data } : c));
        } else {
            const newCity: City = {
                id: `CTY-${Math.floor(Math.random() * 900) + 100}`,
                name: data.name || "Unnamed City",
                status: data.status || "Active",
                zonesCount: 0,
                ridersCount: 0,
                baseChargeRange: "TBD",
            };
            setCities([...cities, newCity]);
        }
    };

    const handleDeleteCity = (id: string) => {
        if (confirm("Are you sure you want to remove this city? All associated zones and rider mappings will be archived.")) {
            setCities(cities.filter(c => c.id !== id));
        }
    };

    const handleEditCity = (city: City) => {
        setEditingCity(city);
        setIsCityModalOpen(true);
    };

    const handleManageZones = (city: City) => {
        setSelectedCity(city);
        setIsZoneModalOpen(true);
    };

    const filteredCities = cities.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Logistics Network</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest">Expand Operations, Register Cities, and Map Delivery Zones.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                        <Download size={18} className="text-gray-400" /> Export Topology
                    </button>
                    <button
                        onClick={() => {
                            setEditingCity(null);
                            setIsCityModalOpen(true);
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#1877F2] rounded-xl text-xs font-black text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
                    >
                        <Plus size={18} /> Add New City
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#1877F2]/30 transition-all">
                    <div className="p-3 bg-blue-50 text-[#1877F2] rounded-xl group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Cities</p>
                        <p className="text-2xl font-black text-gray-900">{cities.filter(c => c.status === 'Active').length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-orange-500/30 transition-all">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all">
                        <Navigation size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mapped Zones</p>
                        <p className="text-2xl font-black text-gray-900">
                            {cities.reduce((acc, c) => acc + c.zonesCount, 0)}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-green-500/30 transition-all">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                        <RefreshCw size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fleet Connection</p>
                        <p className="text-2xl font-black text-gray-900">99.2%</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-purple-500/30 transition-all">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg. Tariff</p>
                        <p className="text-2xl font-black text-gray-900">₹42.50</p>
                    </div>
                </div>
            </div>

            {/* Network Control Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/30">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search service areas..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-100 bg-blue-50 text-[#1877F2] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                            <Settings size={14} /> Network Config
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-[10px] font-black uppercase tracking-wider mb-4 w-fit">
                        <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                        {cities.length} Operational Nodes Syncing
                    </div>
                    <CityTable
                        cities={filteredCities}
                        onManageZones={handleManageZones}
                        onEdit={handleEditCity}
                        onDelete={handleDeleteCity}
                    />
                </div>
            </div>

            {/* Modals */}
            <CityFormModal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
                onSave={handleSaveCity}
                initialData={editingCity}
            />

            <ZoneManagementModal
                isOpen={isZoneModalOpen}
                onClose={() => setIsZoneModalOpen(false)}
                city={selectedCity}
            />
        </div>
    );
}
