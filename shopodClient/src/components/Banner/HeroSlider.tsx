"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

type HeroSliderProps = {
  onShopNowClick?: () => void;
};

export default function HeroSlider({ onShopNowClick }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const slides = [
    {
      id: 1,
      title: "Stock up on daily essentials",
      subtitle:
        "Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more",
      bg: "bg-gradient-to-r from-green-600 to-green-400",
      image: "https://placehold.co/600x300/png?text=Vegetables+Basket",
    },
    {
      id: 2,
      title: "Delicious Meals Delivered",
      subtitle:
        "Hot and fresh meals from top rated restaurants near you",
      bg: "bg-gradient-to-r from-orange-500 to-yellow-400",
      image: "https://placehold.co/600x300/png?text=Tasty+Food",
    },
    {
      id: 3,
      title: "Fastest Grocery Delivery",
      subtitle:
        "Everything you need, delivered in 20 minutes or less",
      bg: "bg-gradient-to-r from-blue-600 to-blue-400",
      image: "https://placehold.co/600x300/png?text=Fast+Delivery",
    },
  ];

  return (
    <section className="relative mx-auto my-6 max-w-7xl px-4 sm:px-6">
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
              <div
                className={`relative flex h-[250px] w-full items-center overflow-hidden md:h-[350px] ${slide.bg}`}
              >
                {/* Content */}
                <div className="relative z-10 w-full p-8 text-white md:w-1/2 md:p-16">
                  <h2 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mb-8 max-w-md text-sm opacity-90 md:text-lg">
                    {slide.subtitle}
                  </p>

                  {/* 🔥 SHOP NOW BUTTON */}
                  <button
                    onClick={onShopNowClick}
                    className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 text-sm font-bold text-gray-900 transition hover:bg-gray-100"
                  >
                    Shop Now <ArrowRight size={16} />
                  </button>
                </div>

                {/* Image */}
                <div className="absolute right-0 top-0 hidden h-full w-1/2 items-center justify-center md:flex">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover opacity-90 mix-blend-overlay"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1 w-8 rounded-full transition-all ${index === selectedIndex
                  ? "scale-110 bg-white"
                  : "bg-white/50"
                }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
