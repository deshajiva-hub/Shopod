"use client";

import React from "react";
import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { Rating, Card, LikeButton } from "../common";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  ratingCount?: number;
  deliveryTime: string; // e.g., "25-30 min"
  costForTwo: string; // e.g., "₹300 for two"
  discount?: string; // e.g., "50% OFF up to ₹100"
  className?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  cuisine,
  rating,
  ratingCount,
  deliveryTime,
  costForTwo,
  discount,
  className = "",
}) => {
  return (
    <Card
      className={`group w-full max-w-sm border-transparent hover:border-gray-100 ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Like Button Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <LikeButton />
        </div>

        {discount && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
            <div className="flex items-center gap-1 font-extrabold text-orange-600 text-xs uppercase">
              <Tag size={12} className="fill-orange-600 stroke-none" />
              {discount}
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-bold text-lg text-gray-900 truncate leading-tight mb-1">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <Rating rating={rating} count={ratingCount} size={14} />
        </div>

        <div className="flex items-center justify-between text-gray-500 text-xs font-medium mb-2">
          <div className="truncate pr-2">
            {cuisine.slice(0, 3).join(", ")}{cuisine.length > 3 ? "..." : ""}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Clock size={12} />
            {deliveryTime}
          </div>
        </div>

        <div className="text-gray-400 text-xs border-t border-dashed border-gray-200 pt-2 mt-1">
          {costForTwo}
        </div>
      </div>
    </Card>
  );
};
