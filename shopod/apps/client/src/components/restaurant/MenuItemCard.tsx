"use client";

import React from "react";
import Image from "next/image";
import { QuantitySelector, PriceTag, Rating } from "../common";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  isVeg: boolean;
  rating?: number;
  ratingCount?: number;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  isVeg,
  rating,
  ratingCount,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  className = "",
}) => {
  return (
    <div className={`flex justify-between gap-4 p-4 border-b border-gray-100 last:border-0 bg-white ${className}`}>
      {/* Left Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          {/* Veg/Non-Veg Badge */}
          <div className={`w-4 h-4 border ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center rounded-sm`}>
            <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
          {/* Bestseller/Badge could go here */}
        </div>

        <h4 className="font-bold text-gray-800 text-base leading-tight">{name}</h4>

        <PriceTag price={price} originalPrice={originalPrice} />

        {rating && (
          <div className="mt-1">
            <Rating rating={rating} count={ratingCount} size={12} color="#fca5a5" />
          </div>
        )}

        <p className="text-gray-500 text-sm line-clamp-2 mt-2 leading-snug">
          {description}
        </p>
      </div>

      {/* Right Content (Image & Action) */}
      <div className="relative flex-shrink-0 w-32 h-28">
        {image ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
            {/* Dark gradient for text readability if needed */}
          </div>
        ) : (
          <div className="w-full h-full rounded-xl bg-gray-50 border border-gray-100"></div>
        )}

        {/* Add Button / Quantity Selector */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-lg rounded-lg bg-white overflow-hidden max-w-[120px]">
          {quantity > 0 ? (
            <QuantitySelector
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              size="sm"
              className="border-0 !rounded-none !bg-white !shadow-none"
            />
          ) : (
            <button
              onClick={onAdd}
              className="h-9 w-24 flex items-center justify-center font-bold text-green-600 uppercase text-sm border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition-all"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
