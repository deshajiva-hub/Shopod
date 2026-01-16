"use client";
import React from 'react';
import {
    User,
    Bike,
    ShieldCheck,
    FileText,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight,
    Star,
    Clock,
    CheckCircle2,
    MapPin,
    Calendar,
    CloudDownload
} from 'lucide-react';

export default function RiderProfilePage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Partner Profile</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Manage your personal details, vehicle and KYC documents.</p>
                </div>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center gap-2">
                    <Settings size={18} className="text-gray-400" /> Account Settings
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Overview */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="w-40 h-40 bg-gray-50 rounded-[50px] overflow-hidden border-8 border-white shadow-2xl relative z-10">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-2xl border-4 border-white shadow-lg z-20">
                                <ShieldCheck size={28} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rahul Sharma</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Gold Tier Delivery Partner</p>

                        <div className="grid grid-cols-3 gap-4 w-full mt-10">
                            {[
                                { label: 'Rating', value: '4.8', icon: <Star size={14} className="text-orange-500 fill-orange-500" /> },
                                { label: 'On-Time', value: '98%', icon: <Clock size={14} className="text-blue-500" /> },
                                { label: 'Badge', value: 'Pro', icon: <CheckCircle2 size={14} className="text-green-500" /> }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
                                    <div className="flex items-center gap-1 text-sm font-black text-gray-900">
                                        {stat.icon} {stat.value}
                                    </div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-600 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <FileText size={120} className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-black tracking-tight mb-2 text-white">Verification Status</h4>
                        <p className="text-xs font-bold text-green-100 opacity-80 uppercase tracking-widest mb-6">All Documents Cleared</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                                <CheckCircle2 size={14} className="text-green-400" /> Aadhar Card
                            </li>
                            <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                                <CheckCircle2 size={14} className="text-green-400" /> Driving License
                            </li>
                            <li className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                                <CheckCircle2 size={14} className="text-green-400" /> Vehicle RC
                            </li>
                        </ul>
                        <button className="w-full mt-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            View Digital Documents
                        </button>
                    </div>
                </div>

                {/* Right Column: Detailed Settings */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-10 pb-4">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-sm font-bold text-gray-900">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-sm font-bold text-gray-900">rahul.rider@shopod.com</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vehicle Number</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Bike size={18} /></div>
                                        <p className="text-sm font-bold text-gray-900 uppercase">MH-04-AB-1234</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Hub Location</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><MapPin size={18} /></div>
                                        <p className="text-sm font-bold text-gray-900">Chembur East Hub</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 pt-4 mt-4 border-t border-gray-50">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Fleet Support</h3>
                            <div className="space-y-4">
                                <SupportItem icon={<HelpCircle size={20} />} title="Partner Help Center" subtitle="Browse FAQs and platform guides" />
                                <SupportItem icon={<User size={20} />} title="Emergency Contact" subtitle="Notify hub manager in case of accident" />
                                <SupportItem icon={<CloudDownload size={20} />} title="Tax Certificates" subtitle="Download form 16A and TDS reports" />
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-6 bg-red-50 text-red-500 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-[0.98]">
                        <LogOut size={20} /> Terminate Current Session
                    </button>

                    <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pb-8">
                        Shopod Partner Portal • Enterprise Edition v2.8.0
                    </p>
                </div>
            </div>
        </div>
    );
}

function SupportItem({ icon, title, subtitle }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-[#1877F2]/20 hover:bg-white transition-all cursor-pointer group">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 group-hover:text-[#1877F2] transition-colors">
                    {icon}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1 leading-none">{title}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{subtitle}</p>
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 group-hover:text-[#1877F2] transition-all" />
        </div>
    );
}
