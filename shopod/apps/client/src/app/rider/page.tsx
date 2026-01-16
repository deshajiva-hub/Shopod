"use client";
import React, { useState, useEffect } from 'react';
import {
    IndianRupee,
    ShoppingBag,
    Star,
    Zap,
    Navigation,
    MapPin,
    Clock,
    ArrowUpRight,
    Bike,
    Wallet,
    CheckCircle2,
    Power,
    XCircle
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import LiveMap from '@/components/rider/Dashboard/LiveMap';

export default function RiderDashboard() {
    const { user } = useSelector((state: RootState) => state.user);
    const [isOnline, setIsOnline] = useState(true);
    const [orderStatus, setOrderStatus] = useState<'OFFERED' | 'ACCEPTED' | 'PICKED' | 'DELIVERING' | null>('OFFERED');
    const [rejectReason, setRejectReason] = useState(false);
    const [activeOrder, setActiveOrder] = useState<any>({
        id: "ORD-8842",
        store: "La Pino'z Pizza",
        customer: "Aditya Singh",
        pickup: "Oberoi Mall, Goregaon East",
        dropoff: "B-402, Royal Residency, Malad West",
        amount: 85.00,
        distance: "3.2 KM",
        eta: "14 Mins",
        paymentType: "Online",
        items: "2x Farmhouse Pizza, 1x Coke (L)",
        emoji: "🍕"
    });

    // Simulated Metrics
    const metrics = {
        todayEarnings: "₹1,240",
        todayDeliveries: "14",
        walletBalance: "₹4,820",
        avgRating: "4.92"
    };

    const handleAction = (nextStatus: any) => {
        setOrderStatus(nextStatus);
    };

    return (
        <div className="space-y-8">
            {/* Live Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-100 rounded-lg">
                            Live Portal
                        </span>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                            Welcome back, {user?.email?.split('@')[0] || 'Partner'}!
                        </h1>
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        Last Sync: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isOnline
                            ? "bg-green-600 text-white shadow-lg shadow-green-100 ring-4 ring-green-600/10"
                            : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}
                    >
                        <Power size={18} />
                        {isOnline ? "Go Offline" : "Go Online"}
                    </button>
                    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Today's Earnings"
                    value={metrics.todayEarnings}
                    subValue="+₹240 from bonuses"
                    icon={<IndianRupee size={22} />}
                    color="green"
                />
                <MetricCard
                    title="Deliveries (Today)"
                    value={metrics.todayDeliveries}
                    subValue="Target: 20 per day"
                    icon={<ShoppingBag size={22} />}
                    color="blue"
                />
                <MetricCard
                    title="Wallet Balance"
                    value={metrics.walletBalance}
                    subValue="Available to payout"
                    icon={<Wallet size={22} />}
                    color="orange"
                />
                <MetricCard
                    title="Avg. Rating"
                    value={metrics.avgRating}
                    subValue="Top 1% in Mumbai"
                    icon={<Star size={22} />}
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Center Column: Active Work */}
                <div className="lg:col-span-2 space-y-6">
                    {orderStatus && <LiveMap />}

                    {orderStatus ? (
                        <div className={`bg-white rounded-[40px] border-2 shadow-xl overflow-hidden transition-all ${orderStatus === 'OFFERED' ? 'border-orange-500 shadow-orange-500/5' : 'border-green-600 shadow-green-600/5'
                            }`}>
                            <div className={`px-8 py-4 flex items-center justify-between ${orderStatus === 'OFFERED' ? 'bg-orange-500' : 'bg-green-600'
                                }`}>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="p-2 bg-white/20 rounded-xl">
                                        <Zap size={20} fill="white" />
                                    </div>
                                    <h2 className="font-black text-sm uppercase tracking-widest">
                                        {orderStatus === 'OFFERED' ? 'New Delivery Request' : 'Active Delivery Task'}
                                    </h2>
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] animate-pulse">
                                    {orderStatus === 'OFFERED' ? 'Expiring in 59s' : orderStatus}
                                </span>
                            </div>

                            <div className="p-8">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-[28px] flex items-center justify-center text-3xl border border-gray-100 shadow-sm transition-transform group-hover:scale-110">
                                            {activeOrder.emoji}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">{activeOrder.store}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {activeOrder.id}</p>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${activeOrder.paymentType === 'COD'
                                                    ? 'bg-red-50 text-red-500 border-red-100'
                                                    : 'bg-green-50 text-green-600 border-green-100'
                                                    }`}>
                                                    {activeOrder.paymentType === 'COD' ? 'Cash on Delivery' : 'Paid Online'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-green-600">₹{activeOrder.amount.toFixed(2)}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Earnings</p>
                                    </div>
                                </div>

                                {/* Order Logistics Details */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                                    <DetailItem label="Total Items" value={activeOrder.items} />
                                    <DetailItem label="Total Distance" value={activeOrder.distance} />
                                    <DetailItem label="Estimated ETA" value={activeOrder.eta} accent />
                                    <DetailItem label="Payment" value={activeOrder.paymentType} />
                                </div>

                                <div className="space-y-8 relative mb-10">
                                    <div className="absolute left-[13px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-gray-200"></div>
                                    <div className="flex gap-6 relative">
                                        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white ring-8 ring-orange-50 mr-[-2px]">
                                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup Store</p>
                                            <p className="font-bold text-gray-800 text-sm">{activeOrder.pickup}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 relative">
                                        <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-100">
                                            <MapPin size={14} fill="white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer Location</p>
                                            <p className="font-bold text-gray-800 text-sm whitespace-pre-wrap">{activeOrder.dropoff}</p>
                                        </div>
                                    </div>
                                </div>

                                {orderStatus === 'OFFERED' ? (
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setRejectReason(true)}
                                            className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-red-100 hover:text-red-500 transition-all"
                                        >
                                            Reject Task
                                        </button>
                                        <button
                                            onClick={() => handleAction('ACCEPTED')}
                                            className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={18} /> Accept Order
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-4">
                                        <button className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
                                            SOS Help
                                        </button>
                                        {orderStatus === 'ACCEPTED' && (
                                            <button
                                                onClick={() => handleAction('PICKED')}
                                                className="flex-[2] py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Navigation size={18} /> Mark as Picked
                                            </button>
                                        )}
                                        {orderStatus === 'PICKED' && (
                                            <button
                                                onClick={() => handleAction('DELIVERING')}
                                                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Bike size={18} /> Start Delivery
                                            </button>
                                        )}
                                        {orderStatus === 'DELIVERING' && (
                                            <button
                                                onClick={() => handleAction(null)}
                                                className="flex-[2] py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 size={18} /> Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Reject Reason Modal Overlay */}
                            {rejectReason && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center">
                                    <XCircle size={48} className="text-red-500 mb-4" />
                                    <h3 className="text-xl font-black text-gray-900 mb-2">Reject Delivery Task?</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Please provide a reason for rejection.</p>

                                    <div className="w-full space-y-3 mb-8">
                                        {["Store too far", "Too many items", "Bicycle breakdown", "Personal emergency"].map(reason => (
                                            <button
                                                key={reason}
                                                onClick={() => { setOrderStatus(null); setRejectReason(false); }}
                                                className="w-full py-4 px-6 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:border-red-100 hover:text-red-500 transition-all"
                                            >
                                                {reason}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setRejectReason(false)}
                                        className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900"
                                    >
                                        Cancel & Go Back
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border border-gray-100 p-12 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mx-auto text-4xl grayscale opacity-30">
                                🛵
                            </div>
                            <h3 className="text-xl font-black text-gray-900">No Active Tasks</h3>
                            <p className="text-sm font-bold text-gray-400 max-w-xs mx-auto leading-relaxed">
                                {isOnline
                                    ? "Waiting for orders in your zone... Stay near Goregaon East for better chances."
                                    : "You are currently offline. Go online to start receiving delivery requests."
                                }
                            </p>
                            {isOnline && (
                                <div className="pt-4 flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Scanning Zone...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Today's Log Table */}
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-8 border-b border-gray-50">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Today&apos;s Performance</h3>
                            <Link href="/rider/orders" className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline px-4 py-2 bg-green-50 rounded-xl">Full History</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                                        <th className="px-8 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Outcome</th>
                                        <th className="px-8 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Earning</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50/30 transition-all cursor-pointer">
                                            <td className="px-8 py-5">
                                                <p className="text-xs font-black text-gray-900">ORD-53{i}2</p>
                                                <p className="text-[8px] font-bold text-gray-400 uppercase leading-relaxed mt-0.5">Jan 16 • Chembur Hub</p>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 size={10} /> Delivered
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right font-black text-xs text-gray-900">+₹65.00</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Zone & Incentives */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">Hot Zones<br />Near You</h3>
                        </div>
                        <div className="space-y-6">
                            <ZoneHeat label="Goregaon East" demand="Very High" multiplier="1.5x" color="red" />
                            <ZoneHeat label="Malad West" demand="Moderate" multiplier="1.2x" color="orange" />
                            <ZoneHeat label="Andheri West" demand="Low" multiplier="1.0x" color="gray" />
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <Bike size={140} className="absolute -bottom-10 -right-10 opacity-10 rotate-[25deg] group-hover:scale-110 transition-transform" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">Partner Incentive</p>
                        <h4 className="text-2xl font-black leading-tight mb-4">Night Surge<br />is Active! 🌙</h4>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-[200px]">Complete 5 deliveries between 10 PM - 2 AM to unlock ₹200 bonus.</p>
                        <button className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-green-900/50">
                            Apply Incentive
                        </button>
                    </div>

                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Account Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Trips</span>
                                <span className="text-xs font-black text-gray-900 tracking-tighter">1,248</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Join Date</span>
                                <span className="text-xs font-black text-gray-900 tracking-tighter">Mar 2024</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fleet Rank</span>
                                <span className="text-xs font-black text-green-600 tracking-tighter">#42 (Mumbai)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, accent }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
            <p className={`text-xs font-black tracking-tight ${accent ? 'text-green-600' : 'text-gray-900'}`}>{value}</p>
        </div>
    );
}

function MetricCard({ title, value, subValue, icon, color }: any) {
    const accentColors: any = {
        green: "bg-green-600 text-white shadow-green-100",
        blue: "bg-blue-600 text-white shadow-blue-100",
        orange: "bg-orange-600 text-white shadow-orange-100",
        purple: "bg-purple-600 text-white shadow-purple-100"
    };

    return (
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={`p-4 rounded-2xl ${accentColors[color]} shadow-lg transition-transform group-hover:rotate-12`}>
                    {icon}
                </div>
            </div>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                <ArrowUpRight size={12} /> {subValue}
            </p>
        </div>
    );
}

function ZoneHeat({ label, demand, multiplier, color }: any) {
    const colorClasses: any = {
        red: "bg-red-500",
        orange: "bg-orange-500",
        gray: "bg-gray-300"
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-sm font-black text-gray-900 tracking-tight">{label}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${demand === 'Very High' ? 'text-red-500' : 'text-gray-400'}`}>
                        {demand} Demand
                    </p>
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tighter">{multiplier}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                <div className={`h-full ${colorClasses[color]} rounded-full`} style={{ width: demand === 'Very High' ? '100%' : demand === 'Moderate' ? '60%' : '30%' }}></div>
            </div>
        </div>
    );
}
