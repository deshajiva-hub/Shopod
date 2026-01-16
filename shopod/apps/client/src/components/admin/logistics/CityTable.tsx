"use client";
import React from "react";
import { MapPin, Navigation, MoreVertical, Edit2, Trash2, Activity, DollarSign } from "lucide-react";

export interface City {
    id: string;
    name: string;
    status: "Active" | "Inactive";
    zonesCount: number;
    ridersCount: number;
    baseChargeRange: string;
}

interface CityTableProps {
    cities: City[];
    onManageZones: (city: City) => void;
    onEdit: (city: City) => void;
    onDelete: (id: string) => void;
}

export default function CityTable({ cities, onManageZones, onEdit, onDelete }: CityTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Service City</th>
                            <th className="px-6 py-4">Logistics</th>
                            <th className="px-6 py-4">Charge Range</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cities.map((city) => (
                            <tr key={city.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] border border-[#1877F2]/20 shadow-sm">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900">{city.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Active Operations</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-900">{city.zonesCount}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Zones</span>
                                        </div>
                                        <div className="w-px h-6 bg-gray-100"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-900">{city.ridersCount}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Riders</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                                        <DollarSign size={14} className="text-green-500" />
                                        {city.baseChargeRange}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${city.status === "Active"
                                            ? "bg-green-50 text-green-600 border-green-100"
                                            : "bg-gray-100 text-gray-500 border-gray-200"
                                        }`}>
                                        {city.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <button
                                            onClick={() => onManageZones(city)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm"
                                        >
                                            <Navigation size={12} /> Zones
                                        </button>
                                        <button
                                            onClick={() => onEdit(city)}
                                            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(city.id)}
                                            className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors border border-red-50"
                                        >
                                            <Trash2 size={16} />
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
        </div>
    );
}
