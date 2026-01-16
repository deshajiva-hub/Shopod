"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Layers, CheckCircle, Tag, Hash, Zap } from "lucide-react";
import { Category } from "./CategoryItem";

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Category>) => void;
    initialData?: Category | null;
    parentId?: string | null;
    parentName?: string | null;
}

export default function CategoryFormModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    parentId,
    parentName
}: CategoryFormModalProps) {
    const [formData, setFormData] = useState<Partial<Category>>({
        name: "",
        icon: "",
        status: "Active",
        sortOrder: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                icon: "",
                status: "Active",
                sortOrder: 0,
                parentId: parentId || null
            });
        }
    }, [initialData, parentId, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Edit Category" : parentId ? `Add Subcategory to ${parentName}` : "Create Global Category"}
            size="md"
        >
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Tag size={12} /> Basic Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Icon/Emoji</label>
                            <input
                                type="text"
                                maxLength={2}
                                placeholder="🍕"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-center text-xl"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Category Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Italian Cuisine"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={12} /> Display & Status
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-wider">Sort Order</label>
                            <div className="relative">
                                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                <input
                                    type="number"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm"
                                    value={formData.sortOrder}
                                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
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
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
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
                        {initialData ? "Apply Changes" : "Create Now"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
