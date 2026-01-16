"use client";
import React, { useState } from 'react';
import { Power } from 'lucide-react';

interface StatusToggleProps {
    status: 'Online' | 'Offline';
    onToggle: (status: 'Online' | 'Offline') => void;
}

export default function StatusToggle({ status, onToggle }: StatusToggleProps) {
    const isOnline = status === 'Online';

    return (
        <div className={`p-4 rounded-3xl transition-all duration-500 flex items-center justify-between shadow-lg ${isOnline ? 'bg-[#1877F2] shadow-blue-200' : 'bg-gray-900 shadow-gray-200'
            }`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOnline ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                    <Power size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Your Status</p>
                    <p className="text-lg font-black text-white uppercase tracking-wider">
                        {isOnline ? 'Currently Online' : 'Currently Offline'}
                    </p>
                </div>
            </div>

            <button
                onClick={() => onToggle(isOnline ? 'Offline' : 'Online')}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${isOnline ? 'bg-white/30' : 'bg-white/20'
                    }`}
            >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-500 ease-out ${isOnline ? 'left-9' : 'left-1'
                    }`} />
            </button>
        </div>
    );
}
