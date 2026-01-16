"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";

interface Order {
    id: string;
    customer: string;
    phone: string;
    vendor: string;
    city: string;
    date: string;
    paymentMode: string;
    paymentStatus: string;
    orderStatus: "Pending" | "Confirmed" | "Out for Delivery" | "Delivered" | "Cancelled";
    total: string;
}

interface OrderFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (order: Partial<Order>) => void;
    initialData?: Order | null;
    mode: "new" | "edit";
}

export default function OrderFormModal({ isOpen, onClose, onSave, initialData, mode }: OrderFormModalProps) {
    const [formData, setFormData] = useState<Partial<Order>>({
        customer: "",
        phone: "",
        vendor: "",
        city: "",
        paymentMode: "Cash",
        paymentStatus: "Pending",
        orderStatus: "Pending",
        total: "",
    });

    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData(initialData);
        } else {
            setFormData({
                customer: "",
                phone: "",
                vendor: "",
                city: "",
                paymentMode: "Cash",
                paymentStatus: "Pending",
                orderStatus: "Pending",
                total: "",
            });
        }
    }, [initialData, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "new" ? "Create New Order" : "Update Order"}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-4 md:col-span-2">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Customer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.customer}
                                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Order Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Vendor / Store</label>
                                <select
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.vendor}
                                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                                >
                                    <option value="">Select Vendor</option>
                                    <option value="Pizza Hut">Pizza Hut</option>
                                    <option value="Burger King">Burger King</option>
                                    <option value="Green Grocer">Green Grocer</option>
                                    <option value="Subway">Subway</option>
                                    <option value="Fresh Catch">Fresh Catch</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financials & Status */}
                    <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Status & Payment</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Order Status</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.orderStatus}
                                    onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value as any })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Payment Status</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
                                    value={formData.paymentStatus}
                                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Total Amount</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="$0.00"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-[#1877F2]"
                                    value={formData.total}
                                    onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100"
                    >
                        {mode === "new" ? "Create Order" : "Save Changes"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
