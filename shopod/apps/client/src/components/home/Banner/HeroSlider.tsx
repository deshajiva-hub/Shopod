"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

interface HeroSliderProps {
  onShopNowClick?: () => void;
}

const banners = [
  {
    id: 1,
    title: "Fresh Vegetables & Fruits",
    subtitle: "Organic & Fresh from Farm",
    discount: "UP TO 30% OFF",
    bgWithGradient: "bg-[linear-gradient(120deg,#d4fc79_0%,#96e6a1_100%)]",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600",
    textColor: "text-[#1a4a1d]"
  },
  {
    id: 2,
    title: "Daily Essentials Delivered",
    subtitle: "Milk, Eggs, Bread & More",
    discount: "FREE DELIVERY",
    bgWithGradient: "bg-[linear-gradient(to_right,#e0c3fc,#8ec5fc)]",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    textColor: "text-[#2c3e50]"
  },
  {
    id: 3,
    title: "Premium Snacks & Drinks",
    subtitle: "For your movie nights",
    discount: "FLAT 20% CASHBACK",
    bgWithGradient: "bg-[linear-gradient(to_top,#fbc2eb_0%,#a6c1ee_100%)]",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600",
    textColor: "text-[#5e2d4e]"
  }
];

export default function HeroSlider({ onShopNowClick }: HeroSliderProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="mt-6 md:mt-8 px-4 md:px-0">
      <div className="overflow-hidden rounded-3xl shadow-sm" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={banner.id}>
              <div className={`${banner.bgWithGradient} h-48 md:h-[400px] w-full flex items-center justify-between px-6 md:px-20 py-8 md:py-0 relative overflow-hidden`}>
                {/* Text Content */}
                <div className="z-10 max-w-lg space-y-2 md:space-y-6">
                  <span className={`inline-block px-3 py-1 bg-white/30 backdrop-blur-sm rounded-lg text-xs font-black tracking-widest ${banner.textColor} border border-white/20`}>
                    {banner.discount}
                  </span>
                  <h2 className={`text-2xl md:text-5xl font-black leading-tight tracking-tight ${banner.textColor}`}>
                    {banner.title}
                  </h2>
                  <p className={`text-sm md:text-xl font-medium opacity-90 ${banner.textColor}`}>
                    {banner.subtitle}
                  </p>
                  <button
                    onClick={onShopNowClick}
                    className="mt-4 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20 flex items-center gap-2 group"
                  >
                    Shop Now
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image */}
                <div className="absolute -right-10 -bottom-10 md:right-10 md:bottom-0 md:relative md:block w-32 h-32 md:w-96 md:h-96">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-contain md:object-cover drop-shadow-2xl rounded-full md:rounded-3xl rotate-[-10deg] md:rotate-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
