"use client";
import React from "react";
import Link from "next/link";
import {
  Apple,
  Milk,
  Beef,
  Cake,
  Fish,
  Carrot,
  Coffee,
  Dog
} from "lucide-react";

export default function AllCategories() {
  const categories = [
    { id: 1, name: "Fruits & Veg", icon: Apple, color: "bg-green-100", text: "text-green-600" },
    { id: 2, name: "Dairy & Eggs", icon: Milk, color: "bg-blue-100", text: "text-blue-600" },
    { id: 3, name: "Meat & Fish", icon: Beef, color: "bg-red-100", text: "text-red-600" },
    { id: 4, name: "Bakery", icon: Cake, color: "bg-orange-100", text: "text-orange-600" },
    { id: 5, name: "Seafood", icon: Fish, color: "bg-teal-100", text: "text-teal-600" },
    { id: 6, name: "Organic", icon: Carrot, color: "bg-emerald-100", text: "text-emerald-600" },
    { id: 7, name: "Beverages", icon: Coffee, color: "bg-amber-100", text: "text-amber-600" },
    { id: 8, name: "Pet Care", icon: Dog, color: "bg-purple-100", text: "text-purple-600" },
  ];

  return (
    <section className="py-8 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
        <Link href="/categories" className="text-sm font-bold text-[#6b4dd7] hover:underline">View All</Link>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link href={`/category/${cat.id}`} key={cat.id} className="group flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-24 md:h-24 ${cat.color} rounded-2xl md:rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 shadow-sm`}>
              <cat.icon className={`w-7 h-7 md:w-10 md:h-10 ${cat.text}`} />
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-700 text-center leading-tight group-hover:text-[#6b4dd7] transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
