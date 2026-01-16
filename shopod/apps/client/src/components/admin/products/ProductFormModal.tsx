"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Upload, X, Package, DollarSign, Tag, Database, Layers, Eye, EyeOff } from "lucide-react";
import { Product } from "./ProductTable";

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Partial<Product>) => void;
    initialData?: Product | null;
    mode: "new" | "edit";
}

export default function ProductFormModal({ isOpen, onClose, onSave, initialData, mode }: ProductFormModalProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        sku: "",
        category: "",
        vendor: "",
        price: "",
        discount: "",
        stock: 0,
        visibility: "Active",
        image: "",
    });

    const [description, setDescription] = useState("");
    const [subcategory, setSubcategory] = useState("");

    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                sku: "",
                category: "",
                vendor: "",
                price: "",
                discount: "",
                stock: 0,
                visibility: "Active",
                image: "",
            });
            setDescription("");
            setSubcategory("");
        }
    }, [initialData, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            createdAt: mode === "new" ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : formData.createdAt
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "new" ? "Add New Product" : "Edit Product"}
            size="xl"
        >
            <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Images & Status */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Product Display</label>
                            <div className="aspect-square w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 group hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 transition-all cursor-pointer relative overflow-hidden">
                                {formData.image ? (
                                    <>
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: "" }); }}
                                            className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#1877F2] transition-colors">
                                            <Upload size={28} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-gray-700">Upload Image</p>
                                            <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Visibility Settings</h4>
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${formData.visibility === "Active" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400"}`}>
                                        {formData.visibility === "Active" ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{formData.visibility}</p>
                                        <p className="text-[10px] text-gray-500">Visible to customers</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, visibility: formData.visibility === "Active" ? "Inactive" : "Active" })}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${formData.visibility === "Active" ? "bg-blue-600" : "bg-gray-300"}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.visibility === "Active" ? "left-7" : "left-1"}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                    <Package size={14} /> Product Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Organic Fujian Appls"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Brief describe your product..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all text-sm leading-relaxed"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">SKU Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="SKU-00000"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-mono text-sm"
                                    value={formData.sku}
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Vendor / Store</label>
                                <select
                                    required
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-medium appearance-none"
                                    value={formData.vendor}
                                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                                >
                                    <option value="">Select Vendor</option>
                                    <option value="Pizza Hut">Pizza Hut</option>
                                    <option value="Burger King">Burger King</option>
                                    <option value="Green Grocer">Green Grocer</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                    <Layers size={14} /> Main Category
                                </label>
                                <select
                                    required
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-medium appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Bakery">Bakery</option>
                                    <option value="Meat">Meat</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Subcategory</label>
                                <select
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-medium appearance-none"
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                >
                                    <option value="">Select Subcategory</option>
                                    <option value="Fresh">Fresh</option>
                                    <option value="Frozen">Frozen</option>
                                    <option value="Packaged">Packaged</option>
                                </select>
                            </div>

                            <div className="pt-4 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100">
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        <DollarSign size={14} /> Regular Price
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="$0.00"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-black text-gray-900"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        <Tag size={14} /> Discount Value
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0%"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-black text-red-500"
                                        value={formData.discount}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                        <Database size={14} /> Stock Level
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-black text-gray-900"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-8">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
                            >
                                Discard Changes
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] px-6 py-4 bg-[#1877F2] text-white rounded-2xl font-black hover:bg-[#166fe5] transition-all shadow-xl shadow-blue-100 uppercase tracking-widest text-xs"
                            >
                                {mode === "new" ? "Publish Product" : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
