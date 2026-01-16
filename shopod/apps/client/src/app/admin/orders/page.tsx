"use client";
import React, { useState } from "react";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderFormModal from "@/components/admin/orders/OrderFormModal";
import { Download, Plus } from "lucide-react";

const MOCK_ORDERS = [
    {
        id: "#ORD-7721",
        customer: "Liam Johnson",
        phone: "+1 234 567 8901",
        vendor: "Pizza Hut",
        city: "New York",
        date: "Jan 12, 2026 14:30",
        paymentMode: "Credit Card",
        paymentStatus: "Paid",
        orderStatus: "Delivered" as const,
        total: "$124.50"
    },
    {
        id: "#ORD-7722",
        customer: "Olivia Smith",
        phone: "+1 234 567 8902",
        vendor: "Burger King",
        city: "London",
        date: "Jan 12, 2026 15:15",
        paymentMode: "Cash",
        paymentStatus: "Pending",
        orderStatus: "Confirmed" as const,
        total: "$54.20"
    },
    {
        id: "#ORD-7723",
        customer: "Noah Williams",
        phone: "+1 234 567 8903",
        vendor: "Green Grocer",
        city: "Tokyo",
        date: "Jan 11, 2026 10:00",
        paymentMode: "PayPal",
        paymentStatus: "Paid",
        orderStatus: "Delivered" as const,
        total: "$289.00"
    },
    {
        id: "#ORD-7724",
        customer: "Emma Brown",
        phone: "+1 234 567 8904",
        vendor: "Subway",
        city: "New York",
        date: "Jan 10, 2026 18:20",
        paymentMode: "Credit Card",
        paymentStatus: "Failed",
        orderStatus: "Cancelled" as const,
        total: "$32.00"
    },
    {
        id: "#ORD-7725",
        customer: "Ava Jones",
        phone: "+1 234 567 8905",
        vendor: "Fresh Catch",
        city: "London",
        date: "Jan 09, 2026 12:45",
        paymentMode: "Credit Card",
        paymentStatus: "Paid",
        orderStatus: "Pending" as const,
        total: "$560.00"
    },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"new" | "edit">("new");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const handleSearch = (query: string) => {
        if (!query) {
            setOrders(MOCK_ORDERS);
            return;
        }
        const filtered = MOCK_ORDERS.filter(order =>
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase()) ||
            order.phone.includes(query)
        );
        setOrders(filtered);
    };

    const handleFilterChange = (filters: any) => {
        let filtered = [...MOCK_ORDERS];
        if (filters.status) filtered = filtered.filter(o => o.orderStatus === filters.status);
        if (filters.paymentStatus) filtered = filtered.filter(o => o.paymentStatus === filters.paymentStatus);
        if (filters.vendor) filtered = filtered.filter(o => o.vendor === filters.vendor);
        if (filters.city) filtered = filtered.filter(o => o.city === filters.city);
        setOrders(filtered);
    };

    const handleNewOrder = () => {
        setModalMode("new");
        setSelectedOrder(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        const order = orders.find(o => o.id === id);
        if (order) {
            setModalMode("edit");
            setSelectedOrder(order);
            setIsModalOpen(true);
        }
    };

    const handleSaveOrder = (orderData: any) => {
        if (modalMode === "new") {
            const newOrder = {
                ...orderData,
                id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ''),
            };
            setOrders([newOrder, ...orders]);
        } else {
            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, ...orderData } : o));
        }
    };

    const handleCancel = (id: string) => {
        if (confirm(`Are you sure you want to cancel order ${id}?`)) {
            setOrders(prev => prev.map(o => o.id === id ? { ...o, orderStatus: "Cancelled" as const } : o));
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage, track and analyze your platform orders in real-time.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} className="text-gray-400" /> Export CSV
                    </button>
                    <button
                        onClick={handleNewOrder}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1877F2] rounded-lg text-sm font-medium text-white hover:bg-[#166fe5] transition-all shadow-sm"
                    >
                        <Plus size={18} /> New Order
                    </button>
                </div>
            </div>

            <OrderFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-xs font-bold">
                        <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                        {orders.length} Total Orders
                    </div>
                </div>
                <OrderTable
                    orders={orders}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                />
            </div>

            <OrderFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveOrder}
                initialData={selectedOrder}
                mode={modalMode}
            />
        </div>
    );
}
