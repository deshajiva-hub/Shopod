"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Plus, Trash2, Navigation, DollarSign, Map, Zap, CheckCircle } from "lucide-react";
import { City } from "./CityTable";

export interface Zone {
    id: string;
    name: string;
    charge: number;
    status: "Active" | "Inactive";
}

interface ZoneManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    city: City | null;
}

const MOCK_ZONES: Zone[] = [
    { id: "Z-101", name: "Bandra West", charge: 45, status: "Active" },
    { id: "Z-102", name: "Andheri East", charge: 35, status: "Active" },
    { id: "Z-103", name: "Worli", charge: 50, status: "Active" },
    { id: "Z-104", name: "Juhu", charge: 60, status: "Inactive" },
];

export default function ZoneManagementModal({ isOpen, onClose, city }: ZoneManagementModalProps) {
    const [zones, setZones] = useState<Zone[]>(MOCK_ZONES);
    const [isAdding, setIsAdding] = useState(false);
    const [newZone, setNewZone] = useState<Partial<Zone>>({ name: "", charge: 0, status: "Active" });

    if (!city) return null;

    const handleAddZone = () => {
        const id = `Z-${Math.floor(Math.random() * 900) + 100}`;
        setZones([...zones, { ...newZone as Zone, id }]);
        setIsAdding(false);
        setNewZone({ name: "", charge: 0, status: "Active" });
    };

    const handleDeleteZone = (id: string) => {
        setZones(zones.filter(z => z.id !== id));
    };

    const handleToggleStatus = (id: string) => {
        setZones(zones.map(z => z.id === id ? { ...z, status: z.status === "Active" ? "Inactive" : "Active" } : z));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Zone Management: ${city.name}`}
            size="lg"
        >
            <div className="p-8 space-y-8">
                {/* Zones List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Map size={14} /> Registered Delivery Zones
                        </h4>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-[#1877F2]/5 text-[#1877F2] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#1877F2] hover:text-white transition-all flex items-center gap-1.5"
                        >
                            <Plus size={14} /> New Zone
                        </button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
                        {zones.map((zone) => (
                            <div key={zone.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${zone.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                                        }`}>
                                        <Navigation size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-black text-gray-900">{zone.name}</p>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight ${zone.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                                                }`}>
                                                {zone.status}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-tighter">ID: {zone.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Per-Order Tariff</p>
                                        <p className="text-sm font-black text-gray-900">₹{zone.charge}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <button
                                            onClick={() => handleToggleStatus(zone.id)}
                                            className="p-1.5 text-gray-400 hover:text-[#1877F2] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100"
                                        >
                                            <Zap size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteZone(zone.id)}
                                            className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add New Zone (Inline) */}
                {isAdding && (
                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-[#1877F2]/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2 text-[#1877F2] mb-2">
                            <Plus size={18} />
                            <h5 className="text-xs font-black uppercase tracking-widest">Map New Delivery Zone</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Zone Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Lokhandwala"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 font-bold text-xs"
                                    value={newZone.name}
                                    onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Delivery Charge (₹)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                    <input
                                        type="number"
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 font-bold text-xs"
                                        value={newZone.charge}
                                        onChange={(e) => setNewZone({ ...newZone, charge: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddZone}
                                className="px-6 py-2 bg-[#1877F2] text-white rounded-lg font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-lg hover:shadow-blue-100 transition-all flex items-center gap-2"
                            >
                                <CheckCircle size={14} /> Map Now
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                    <p>Subtotal Capacity: {city.ridersCount} Fleet active in {city.name}</p>
                    <button className="text-[#1877F2] hover:underline">Download Topology Map</button>
                </div>
            </div>
        </Modal>
    );
}
