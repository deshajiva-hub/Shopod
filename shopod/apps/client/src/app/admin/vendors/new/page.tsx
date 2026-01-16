"use client";
import React, { useState } from "react";
import { ArrowLeft, Save, Upload, Store, MapPin, Mail, Phone, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddVendorPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        vendorName: "",
        shopName: "",
        email: "",
        phone: "",
        category: "Restaurant",
        address: "",
        city: "",
        zipCode: "",
        commission: 15,
        status: "Pending"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Vendor added successfully!");
        setIsLoading(false);
        router.push("/admin/vendors");
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/vendors"
                    className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add New Vendor</h1>
                    <p className="text-sm text-gray-500">Onboard a new partner to the platform.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Store size={20} className="text-[#1877F2]" />
                        Shop Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shop Name</label>
                            <input
                                name="shopName"
                                required
                                value={formData.shopName}
                                onChange={handleChange}
                                placeholder="e.g. Pizza Hut"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Business Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium appearance-none"
                            >
                                <option value="Restaurant">Restaurant</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Pharmacy">Pharmacy</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                            </select>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                            <textarea
                                rows={3}
                                placeholder="Short description of the shop..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Owner Info */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <User size={20} className="text-[#1877F2]" />
                        Owner Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="vendorName"
                                    required
                                    value={formData.vendorName}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. john@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +91 98765 43210"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin size={20} className="text-[#1877F2]" />
                        Location
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Line</label>
                            <input
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Building, Street, Area..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                            <input
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g. Mumbai"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Zip Code</label>
                            <input
                                name="zipCode"
                                required
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="e.g. 400001"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-[#1877F2]" />
                        Settings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Platform Commission (%)</label>
                            <input
                                name="commission"
                                type="number"
                                required
                                value={formData.commission}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Initial Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] font-medium appearance-none"
                            >
                                <option value="Pending">Pending (Requires Approval)</option>
                                <option value="Active">Active (Immediately Visible)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <Link
                        href="/admin/vendors"
                        className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-[#1877F2] rounded-xl text-sm font-bold text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                    >
                        {isLoading ? "Creating..." : <><Save size={18} /> Create Vendor</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
