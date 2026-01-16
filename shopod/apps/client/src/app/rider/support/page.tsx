"use client";
import React from 'react';
import {
    MessageCircle,
    Phone,
    Mail,
    HelpCircle,
    ChevronRight,
    Send,
    LifeBuoy,
    Clock,
    FileText,
    ExternalLink
} from 'lucide-react';

export default function RiderSupportPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Support Center</h1>
                    <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">Get help with orders, payouts, or technical issues.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center gap-2">
                        <Phone size={18} className="text-gray-400" /> SOS Help
                    </button>
                    <button className="px-6 py-3 bg-green-600 rounded-xl text-xs font-black text-white hover:bg-green-700 transition-all uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-100">
                        <MessageCircle size={18} /> Live Chat
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: FAQ & Quick Help */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Search/Header Box */}
                    <div className="bg-gradient-to-br from-green-600 to-green-700 p-12 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <LifeBuoy size={180} className="absolute -bottom-20 -right-20 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                        <h2 className="text-3xl font-black tracking-tight mb-4 relative z-10">How can we help,<br />Rahul?</h2>
                        <div className="relative max-w-md mt-8 z-10">
                            <input
                                type="text"
                                placeholder="Describe your issue..."
                                className="w-full bg-white/10 border border-white/20 backdrop-blur-md px-6 py-4 rounded-2xl outline-none placeholder:text-white/60 text-white font-bold pr-14"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-green-600 rounded-xl">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>

                    {/* FAQ Groups */}
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <FAQItem
                                question="Why is my payout delayed?"
                                category="Payments"
                                description="Standard settlements take 24-48 hours. Check if your bank details are verified in your profile."
                            />
                            <FAQItem
                                question="How to report a damaged item?"
                                category="Orders"
                                description="Take a photo of the item and upload it via the 'Order Details' page within 10 minutes."
                            />
                            <FAQItem
                                question="Issues with navigation accuracy?"
                                category="Technical"
                                description="Ensure battery saver mode is off and you have granted high-accuracy GPS permissions."
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Channels */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight mb-8">Direct Channels</h3>
                        <div className="space-y-6">
                            <ContactMethod
                                icon={<Mail size={18} />}
                                title="Email Support"
                                value="support.rider@shopod.com"
                                responseTime="4-6 Hours"
                                color="blue"
                            />
                            <ContactMethod
                                icon={<MessageCircle size={18} />}
                                title="Official WhatsApp"
                                value="+91 888 777 6655"
                                responseTime="Instant"
                                color="green"
                            />
                            <ContactMethod
                                icon={<Clock size={18} />}
                                title="Active Hub Manager"
                                value="Vikram Seth (Chembur)"
                                responseTime="Available Now"
                                color="orange"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Resources</h3>
                        <div className="space-y-3">
                            <ResourceLink icon={<FileText size={16} />} title="Rider Handbook" />
                            <ResourceLink icon={<ExternalLink size={16} />} title="Safety Protocols" />
                            <ResourceLink icon={<FileText size={16} />} title="Insurance Details" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, category, description }: any) {
    return (
        <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-green-600/20 transition-all cursor-pointer group">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-[8px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 mb-2 block w-fit">
                        {category}
                    </span>
                    <h4 className="text-sm font-black text-gray-900 mb-2">{question}</h4>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed pr-8">{description}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 mt-1 group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    );
}

function ContactMethod({ icon, title, value, responseTime, color }: any) {
    const bgColors: any = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-500"
    };

    return (
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${bgColors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{title}</p>
                <p className="text-xs font-black text-gray-900 leading-none mb-2">{value}</p>
                <span className="text-[9px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} /> {responseTime}
                </span>
            </div>
        </div>
    );
}

function ResourceLink({ icon, title }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all group shadow-sm">
            <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-green-600">{icon}</div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{title}</span>
            </div>
            <ChevronRight size={14} className="text-gray-300" />
        </button>
    );
}
