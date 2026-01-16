"use client";
import React, { useState } from "react";
import {
    ArrowLeft, MapPin, Package, CreditCard, ChevronDown, Check,
    Truck, User, Clock, AlertCircle, Phone, Navigation, MoreVertical, X
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Modal from "@/components/ui/Modal";

interface TimelineEvent {
    status: string;
    time: string;
    description: string;
    isCompleted: boolean;
}

const ORDER_TIMELINE: TimelineEvent[] = [
    { status: "Order Placed", time: "10:30 AM", description: "Order successfully placed by customer.", isCompleted: true },
    { status: "Confirmed", time: "10:35 AM", description: "Order confirmed by Pizza Hut.", isCompleted: true },
    { status: "Preparing", time: "10:45 AM", description: "Chef has started preparing the food.", isCompleted: true },
    { status: "Out for Delivery", time: "11:05 AM", description: "Rider John Doe picked up the order.", isCompleted: false },
    { status: "Delivered", time: "--:--", description: "Waiting for delivery confirmation.", isCompleted: false },
];

export default function OrderDetailsPage() {
    const params = useParams();
    const [status, setStatus] = useState("Confirmed");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const orderItems = [
        { id: 1, name: "Pepperoni Pizza (Large)", price: "$18.99", qty: 2, image: "bg-red-50", description: "Extra cheese, Thin crust" },
        { id: 2, name: "Garlic Breadsticks", price: "$5.99", qty: 1, image: "bg-yellow-50", description: "8 pieces" },
        { id: 3, name: "Coca Cola (1.5L)", price: "$3.50", qty: 1, image: "bg-red-100", description: "" },
    ];

    const handleCancelOrder = () => {
        console.log("Cancelling order with reason:", cancelReason);
        setStatus("Cancelled");
        setIsCancelModalOpen(false);
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order #{params.id}</h1>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                                }`}>
                                {status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">Placed on Jan 12, 2026 at 10:34 AM • 3 Items • $47.47</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCancelModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
                    >
                        Cancel Order
                    </button>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="appearance-none bg-[#1877F2] border border-[#1877F2] text-white py-2 pl-4 pr-10 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-[#166fe5] transition-all"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 text-white pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-800">
                {/* Left Column: Items & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold flex items-center gap-2">
                                <Package size={18} className="text-[#1877F2]" />
                                Order Items
                            </h3>
                            <button className="text-xs text-[#1877F2] font-bold hover:underline">Edit Items</button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {orderItems.map((item) => (
                                <div key={item.id} className="p-6 flex items-center gap-6">
                                    <div className={`w-20 h-20 rounded-xl ${item.image} flex items-center justify-center border border-gray-100`}>
                                        <Package className="text-gray-300" size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                                            <p className="font-bold text-gray-900">{item.price}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                        <p className="text-xs font-bold text-gray-700 mt-2">Qty: {item.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50/50 px-6 py-6 border-t border-gray-100">
                            <div className="space-y-3 max-w-[280px] ml-auto">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold">$40.47</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">GST (5%)</span>
                                    <span className="font-bold">$2.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Delivery Fee</span>
                                    <span className="font-bold">$5.00</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-black text-[#1877F2] pt-3 border-t border-gray-200 mt-3">
                                    <span>Total</span>
                                    <span>$47.47</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rider Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Truck size={18} className="text-[#1877F2]" />
                                Rider Details
                            </h3>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase tracking-wider">On Profile</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <User size={32} className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-black text-lg text-gray-900">John Doe</h4>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-blue-50 text-[#1877F2] rounded-lg hover:bg-blue-100 transition-colors">
                                            <Phone size={18} />
                                        </button>
                                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                            <Navigation size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">ID: #RID-2291 • Honda Activa (Black)</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs font-bold text-gray-700">Currently 1.2km away</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Address, Timeline, Payment */}
                <div className="space-y-6">
                    {/* Delivery Address */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-[#1877F2]" />
                            Delivery Address
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-black text-gray-900">Liam Johnson</p>
                                <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                    123 Main Street, Apt 4B, Building 7<br />
                                    Greenwich Village, New York, NY 10001
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Customer Phone</p>
                                <p className="text-sm font-bold text-gray-900">+1 234 567 8901</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-[#1877F2]" />
                            Order Timeline
                        </h3>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                            {ORDER_TIMELINE.map((event, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${event.isCompleted ? "bg-[#1877F2] border-[#1877F2] text-white" : "bg-white border-gray-200 text-gray-200"
                                        }`}>
                                        <Check size={12} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm font-bold ${event.isCompleted ? "text-gray-900" : "text-gray-400"}`}>{event.status}</p>
                                            <span className="text-[10px] text-gray-400 font-medium">{event.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-[#1877F2]" />
                            Payment Method
                        </h3>
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                                <span className="text-[10px] font-black italic text-blue-800 italic">VISA</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                                <p className="text-xs text-green-600 font-bold">Paid on Jan 12, 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancellation Modal */}
            <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <AlertCircle className="text-red-500" />
                            Cancel Order
                        </h3>
                        <button onClick={() => setIsCancelModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">
                        Are you sure you want to cancel order <strong>#{params.id}</strong>? This action cannot be undone and will notify the customer.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Cancellation</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                                placeholder="Please explain why this order is being cancelled..."
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                onClick={() => setIsCancelModalOpen(false)}
                                className="px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Not Now
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                disabled={!cancelReason.trim()}
                                className="px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-200"
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
