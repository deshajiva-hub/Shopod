"use client";
import React from "react";
import { Truck, Clock, ShieldCheck, HeadphonesIcon } from "lucide-react";

export default function BenefitBar() {
    const benefits = [
        {
            icon: Truck,
            title: "Free Delivery",
            desc: "On orders above $50",
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            icon: Clock,
            title: "30 Min Delivery",
            desc: "Superfast delivery to door",
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "100% safe transaction",
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            desc: "Dedicated support team",
            color: "text-orange-500",
            bg: "bg-orange-50"
        }
    ];

    return (
        <section className="py-8 px-4 md:px-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300 group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <benefit.icon className={`${benefit.color}`} size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-gray-900 leading-tight mb-0.5">{benefit.title}</h3>
                            <p className="text-xs font-bold text-gray-500">{benefit.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
