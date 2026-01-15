"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function FoodCategorySlider() {
    const foodItems = [
        { name: "Pizza", img: "https://placehold.co/100x100/png?text=Pizza" },
        { name: "Burger", img: "https://placehold.co/100x100/png?text=Burger" },
        { name: "Rolls", img: "https://placehold.co/100x100/png?text=Rolls" },
        { name: "Momos", img: "https://placehold.co/100x100/png?text=Momos" },
        { name: "Fried Snacks", img: "https://placehold.co/100x100/png?text=Fried" },
        { name: "Sandwich", img: "https://placehold.co/100x100/png?text=Sandwich" },
        { name: "Pasta", img: "https://placehold.co/100x100/png?text=Pasta" },
        { name: "Cake", img: "https://placehold.co/100x100/png?text=Cake" },
        { name: "Paratha", img: "https://placehold.co/100x100/png?text=Paratha" },
        { name: "Tea", img: "https://placehold.co/100x100/png?text=Tea" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-6 font-sans">
            <div className="flex justify-between items-end mb-6">
                <h3 className="font-bold text-xl text-gray-800">food Categories</h3>
                <button className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
                    View all <ChevronRight size={16} />
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {foodItems.map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-32 flex flex-col items-center">
                        <div className="w-32 h-32 bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden mb-3 hover:shadow-lg transition-transform hover:-translate-y-1 relative">
                            <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                className="object-cover mix-blend-multiply opacity-90"
                            />
                        </div>
                        <span className="font-semibold text-gray-700 text-sm">{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
