"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { MapPin, CheckCircle, Smartphone, Info } from "lucide-react";
import { City } from "./CityTable";

interface CityFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<City>) => void;
    initialData?: City | null;
}

export default function CityFormModal({ isOpen, onClose, onSave, initialData }: CityFormModalProps) {
    const [formData, setFormData] = useState<Partial<City>>({
        name: "",
        status: "Active",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", status: "Active" });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Edit City Configuration" : "Register New Service City"}
            size="md"
        >
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Info size={12} /> City Details
                    </h4>

                    <div>
                        <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">City Name</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="e.g. Mumbai"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Operational Status</label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm appearance-none cursor-pointer"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        >
                            <option value="Active">Operational (Live)</option>
                            <option value="Inactive">Under Maintenance (Offline)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
                    <div className="p-2 bg-white rounded-lg text-[#1877F2] shadow-sm">
                        <Smartphone size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-[#1877F2] uppercase tracking-tight">Expansion Tip</p>
                        <p className="text-[10px] font-medium text-gray-500 leading-relaxed mt-0.5">Cities with 'Active' status will immediately be visible to users in the app. Ensure zones are correctly mapped before going live.</p>
                    </div>
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl font-black text-[10px] text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] px-6 py-4 bg-[#1877F2] text-white rounded-2xl font-black text-[10px] hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={16} />
                        {initialData ? "Save Config" : "Confirm & Register"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
