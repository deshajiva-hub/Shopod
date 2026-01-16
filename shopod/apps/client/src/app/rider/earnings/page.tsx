"use client";
import React, { useState } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee,
    Calendar,
    Filter,
    ChevronRight,
    TrendingUp,
    Download,
    PieChart,
    CreditCard,
    MoreVertical,
    Wallet,
    AlertCircle,
    CheckCircle2,
    X,
    Clock
} from 'lucide-react';

export default function EarningsPage() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'weekly' | 'monthly'>('weekly');

    const dailyEarnings = [
        { day: 'Mon', amount: 840 },
        { day: 'Tue', amount: 920 },
        { day: 'Wed', amount: 1240 },
        { day: 'Thu', amount: 750 },
        { day: 'Fri', amount: 1100 },
        { day: 'Sat', amount: 1350 },
        { day: 'Sun', amount: 1420 },
    ];

    const stats = {
        today: { amount: "₹840.00", orders: 12, incentives: "₹120.00" },
        weekly: { amount: "₹7,620.00", orders: 84, incentives: "₹840.00" },
        monthly: { amount: "₹28,450.00", orders: 342, incentives: "₹3,200.00" }
    };

    const maxAmount = Math.max(...dailyEarnings.map(d => d.amount));

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Earnings & Payouts</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Track your income, bonuses, penalties and wallet balance.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                        <Download size={18} className="text-gray-400" /> Statement
                    </button>
                    <button
                        onClick={() => setIsWithdrawModalOpen(true)}
                        className="flex-1 md:flex-none px-6 py-3 bg-green-600 rounded-xl text-xs font-black text-white hover:bg-green-700 transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                    >
                        <Wallet size={18} /> Withdraw Funds
                    </button>
                </div>
            </div>

            {/* Wallet & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gray-900 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Wallet Balance</p>
                        <h2 className="text-5xl font-black mt-2 tracking-tighter">₹8,420.50</h2>
                        <div className="flex items-center gap-2 mt-6 text-green-400 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <TrendingUp size={14} /> +12.5% increment
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-green-600/20 rounded-full blur-3xl group-hover:bg-green-600/30 transition-all"></div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm p-4 flex flex-col">
                    <div className="flex p-1 bg-gray-50 rounded-2xl w-fit mb-6">
                        {(['today', 'weekly', 'monthly'] as const).map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedPeriod === period
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 flex-1">
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Earned</p>
                            <h4 className="text-2xl font-black text-gray-900">{stats[selectedPeriod].amount}</h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Orders</p>
                            <h4 className="text-2xl font-black text-gray-900">{stats[selectedPeriod].orders}</h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Incentives</p>
                            <h4 className="text-2xl font-black text-green-600">{stats[selectedPeriod].incentives}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-3 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tighter">Earnings Trend</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Earnings for past 7 days</p>
                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    <div className="flex items-end justify-between h-56 gap-4 px-4">
                        {dailyEarnings.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div
                                    style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                                    className="w-full bg-green-600/10 rounded-2xl relative transition-all duration-500 hover:bg-green-600 cursor-pointer group"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                                        ₹{d.amount}
                                    </div>
                                </div>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-fit">
                    <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tighter">Income Breakdown</h3>
                    <div className="space-y-4">
                        <IncomeRow label="Base Delivery Pay" amount="₹12,450" sub="124 Orders" color="gray" />
                        <IncomeRow label="Incentives" amount="₹1,240" sub="Weekly Target" color="green" />
                        <IncomeRow label="Rain/Peak Bonus" amount="₹890" sub="Peak Hours" color="orange" />
                        <div className="pt-2 border-t border-gray-100">
                            <IncomeRow label="Penalties" amount="-₹240" sub="Late Deliveries (2)" color="red" />
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-900">
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Net Earnings</p>
                                <p className="text-xl font-black text-gray-900">₹14,340</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/20">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Transaction History</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Wallet & Withdrawal records</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-50 flex items-center gap-2">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/30">
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date & Time</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <TransactionRow type="Withdrawal" refId="#WDR-9921" date="Oct 16, 2025 • 10:30 AM" status="completed" amount="-₹2,450" />
                            <TransactionRow type="Order Payout" refId="#ORD-8821" date="Oct 16, 2025 • 09:15 AM" status="completed" amount="+₹65.00" />
                            <TransactionRow type="Incentive" refId="#INC-1221" date="Oct 15, 2025 • 11:59 PM" status="completed" amount="+₹450.00" />
                            <TransactionRow type="Penalty" refId="#PNL-1102" date="Oct 15, 2025 • 04:20 PM" status="completed" amount="-₹100.00" />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Withdraw Modal */}
            {isWithdrawModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsWithdrawModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Withdraw Funds</h3>
                                <button onClick={() => setIsWithdrawModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Available for Withdrawal</p>
                                    <h4 className="text-4xl font-black text-gray-900 text-center mt-2 tracking-tighter">₹8,420.50</h4>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Withdrawal Amount</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₹</div>
                                        <input
                                            type="text"
                                            defaultValue="8420.50"
                                            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-8 pr-4 text-xl font-black text-gray-900 focus:border-green-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        {[1000, 2000, 5000].map(amt => (
                                            <button key={amt} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[10px] font-black text-gray-600 rounded-lg transition-colors capitalize">₹{amt}</button>
                                        ))}
                                        <button className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg ml-auto">All Funds</button>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl h-fit">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-blue-900">Transfer to Linked UPI</p>
                                        <p className="text-[10px] font-bold text-blue-700/60 uppercase tracking-widest mt-0.5">rajesh.rider@okaxis</p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-gray-200">
                                        Confirm Withdrawal
                                    </button>
                                    <p className="text-[9px] text-gray-400 font-bold text-center mt-4 uppercase tracking-[0.2em] px-4">Funds will be credited to your linked bank account within 30 minutes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function IncomeRow({ label, amount, sub, color }: any) {
    const colorMap: any = {
        gray: "text-gray-900 bg-gray-50",
        green: "text-green-600 bg-green-50",
        orange: "text-orange-600 bg-orange-50",
        red: "text-red-600 bg-red-50"
    };

    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${colorMap[color].split(' ')[0].replace('text', 'bg')}`}></div>
                <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{label}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{sub}</p>
                </div>
            </div>
            <p className={`text-sm font-black ${colorMap[color].split(' ')[0]}`}>{amount}</p>
        </div>
    );
}

function TransactionRow({ type, refId, date, status, amount }: any) {
    const isCredit = amount.startsWith('+');

    return (
        <tr className="hover:bg-gray-50/50 transition-all cursor-pointer">
            <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCredit ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {type === 'Withdrawal' ? <CreditCard size={18} /> :
                            type === 'Penalty' ? <AlertCircle size={18} /> :
                                type === 'Incentive' ? <TrendingUp size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900">{type}</p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5 text-xs font-bold text-gray-400 font-mono">{refId}</td>
            <td className="px-8 py-5">
                <p className="text-xs font-bold text-gray-600">{date}</p>
            </td>
            <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">{status}</span>
                </div>
            </td>
            <td className={`px-8 py-5 text-right font-black ${isCredit ? 'text-green-600' : 'text-gray-900'}`}>
                {amount}
            </td>
        </tr>
    );
}
