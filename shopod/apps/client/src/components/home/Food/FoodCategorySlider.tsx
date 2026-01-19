"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const foods = [
    { id: 1, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300", count: "25+ Options" },
    { id: 2, name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300", count: "15+ Options" },
    { id: 3, name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300", count: "10+ Options" },
    { id: 4, name: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=300", count: "12+ Restaurants" },
    { id: 5, name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300", count: "Fresh Salads" },
    { id: 6, name: "Dessert", image: "https://images.unsplash.com/photo-1563729784474-d779b95f3ea6?auto=format&fit=crop&q=80&w=300", count: "Sweet Treats" },
    { id: 7, name: "Asian", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=300", count: "Authentic Taste" },
];

export default function FoodCategorySlider() {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    });

    return (
        <section className="py-8 px-4 md:px-0">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Cuisines & more</h2>
                    <p className="text-xs md:text-sm font-bold text-gray-400">Discover delicious food options</p>
                </div>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <ArrowRight size={16} className="rotate-180 text-gray-400" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden -mx-4 px-4 md:px-0" ref={emblaRef}>
                <div className="flex gap-4">
                    {foods.map((food) => (
                        <Link
                            href={`/food/${food.id}`}
                            key={food.id}
                            className="flex-[0_0_140px] md:flex-[0_0_200px] group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] shadow-sm"
                        >
                            <img
                                src={food.image}
                                alt={food.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-lg md:text-xl font-black text-white leading-none mb-1">{food.name}</h3>
                                <p className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">{food.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
