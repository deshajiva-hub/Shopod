"use client";
import React from 'react';
import {
    Bell,
    Shield,
    Smartphone,
    Languages,
    ToggleLeft,
    ToggleRight,
    Map,
    Eye,
    Moon,
    Volume2,
    Lock,
    Save
} from 'lucide-react';

export default function RiderSettingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Portal Settings</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Configure your notification preferences and account security.</p>
                </div>
                <button className="px-8 py-3 bg-green-600 rounded-xl text-xs font-black text-white hover:bg-green-700 transition-all uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-100">
                    <Save size={18} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Categories */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Notifications Section */}
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Bell size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Notification Channels</h3>
                        </div>

                        <div className="space-y-6">
                            <SettingToggle
                                title="New Order Alerts"
                                description="Get notified immediately when a new delivery is available in your zone."
                                enabled={true}
                            />
                            <SettingToggle
                                title="Payout Settlements"
                                description="Receive notification when your earnings are settled to your bank account."
                                enabled={true}
                            />
                            <SettingToggle
                                title="System Announcements"
                                description="Important updates regarding platform policy and safety protocols."
                                enabled={false}
                            />
                        </div>
                    </div>

                    {/* App & Navigation Section */}
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                                <Map size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Navigation & Display</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preferred Map Engine</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm font-bold text-gray-700">
                                    <option>Google Maps (Default)</option>
                                    <option>Apple Maps</option>
                                    <option>Waze Navigation</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Density</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm font-bold text-gray-700">
                                    <option>Comfortable</option>
                                    <option>Compact (More Data)</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Moon size={18} className="text-gray-400" />
                                    <span className="text-sm font-bold">Dark Mode</span>
                                </div>
                                <button className="text-gray-300"><ToggleLeft size={32} /></button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Volume2 size={18} className="text-gray-400" />
                                    <span className="text-sm font-bold">Voice Navigation</span>
                                </div>
                                <button className="text-green-600"><ToggleRight size={32} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Security & Privacy */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Security</h3>
                        </div>

                        <div className="space-y-4">
                            <SecurityButton icon={<Lock size={16} />} label="Change Password" />
                            <SecurityButton icon={<Eye size={16} />} label="Privacy Settings" />
                            <SecurityButton icon={<Smartphone size={16} />} label="Two-Factor Auth" status="Disabled" />
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <Shield size={100} className="absolute -bottom-5 -right-5 opacity-10 rotate-12" />
                        <h4 className="text-xl font-black tracking-tight mb-2">Safety Policy</h4>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed mb-6">
                            Your safety is our priority. Review the updated Rider Safety & Conduct policy for 2026.
                        </p>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Read Policy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingToggle({ title, description, enabled }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
            <div className="max-w-[80%]">
                <h4 className="text-sm font-black text-gray-900 mb-1">{title}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{description}</p>
            </div>
            <button className={enabled ? "text-green-600" : "text-gray-300"}>
                {enabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
        </div>
    );
}

function SecurityButton({ icon, label, status }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-600/30 hover:bg-white transition-all group">
            <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-green-600">{icon}</div>
                <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{label}</span>
            </div>
            {status ? (
                <span className="text-[8px] font-black bg-red-50 text-red-500 px-2 py-1 rounded-lg border border-red-100 uppercase">{status}</span>
            ) : (
                <Eye size={14} className="text-gray-300" />
            )}
        </button>
    );
}
