"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Bike, MoreVertical, Compass } from 'lucide-react';

export default function LiveMap() {
    return (
        <div className="relative w-full h-[400px] bg-slate-900 rounded-[40px] overflow-hidden shadow-xl group border-4 border-white">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            {/* Simulated Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d="M 150 250 Q 250 150 400 200 T 600 150"
                    fill="none"
                    stroke="rgba(34, 197, 94, 0.4)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="animate-[dash_5s_linear_infinite]"
                    style={{ strokeDasharray: '20, 10' }}
                />
                <path
                    d="M 150 250 Q 250 150 400 200 T 600 150"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>

            {/* Markers */}
            {/* Rider Location */}
            <div className="absolute left-[150px] top-[250px] -translate-x-1/2 -translate-y-1/2 group">
                <div className="relative">
                    <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-ping"></div>
                    <div className="relative w-8 h-8 bg-green-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg transform hover:scale-125 transition-all cursor-pointer">
                        <Bike size={14} className="text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        You (Current)
                    </div>
                </div>
            </div>

            {/* Pickup Marker */}
            <div className="absolute left-[400px] top-[200px] -translate-x-1/2 -translate-y-1/2 group">
                <div className="relative">
                    <div className="relative w-10 h-10 bg-orange-600 rounded-2xl border-2 border-white flex items-center justify-center shadow-lg transform hover:scale-125 transition-all cursor-pointer">
                        <MapPin size={18} className="text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase whitespace-nowrap shadow-xl">
                        Pickup: La Pino'z
                    </div>
                </div>
            </div>

            {/* Dropout Marker */}
            <div className="absolute left-[600px] top-[150px] -translate-x-1/2 -translate-y-1/2 group">
                <div className="relative">
                    <div className="relative w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg transform hover:scale-125 transition-all cursor-pointer">
                        <MapPin size={14} className="text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Customer Drop
                    </div>
                </div>
            </div>

            {/* Map Controls */}
            <div className="absolute right-6 top-6 flex flex-col gap-2">
                <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                    <Compass size={20} />
                </button>
                <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Live Navigation UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl flex items-center gap-4">
                    <div className="p-3 bg-green-600 rounded-2xl shadow-lg ring-4 ring-green-600/20">
                        <Navigation size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Next Turn in 400m</p>
                        <p className="text-sm font-black text-white">Left onto Link Road Bypass</p>
                    </div>
                </div>
                <button
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=19.1663,72.8444', '_blank')}
                    className="p-5 bg-green-600 rounded-3xl text-white shadow-xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
                >
                    <Navigation size={24} fill="white" />
                </button>
            </div>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </div>
    );
}
