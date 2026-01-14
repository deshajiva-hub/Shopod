"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { QuantitySelector, PriceTag, LikeButton } from "../common";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    weight: string; // e.g., "500 g"
    price: number;
    originalPrice?: number;
    deliveryTime?: string; // e.g., "12 mins"
    quantity: number;
    onAdd: () => void;
    onIncrease: () => void;
    onDecrease: () => void;
    className?: string;
    isBestseller?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    image,
    weight,
    price,
    originalPrice,
    deliveryTime,
    quantity,
    onAdd,
    onIncrease,
    onDecrease,
    className = "",
    isBestseller,
}) => {
    return (
        <div className={`flex flex-col w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full ${className}`}>
            {/* Image Section */}
            <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Like Button */}
                <div className="absolute top-2 right-2 z-10">
                    <LikeButton size={18} />
                </div>

                {isBestseller && (
                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 uppercase tracking-wide">
                        Bestseller
                    </div>
                )}

                {deliveryTime && (
                    <div className="absolute bottom-2 left-2 bg-gray-100/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-600 flex items-center gap-1">
                        <Clock size={10} />
                        {deliveryTime}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-3">
                <div className="mb-auto">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-1" title={name}>
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-2">{weight}</p>
                </div>

                {/* Footer: Price + Add Button */}
                <div className="flex items-end justify-between gap-2 mt-2">
                    <div className="flex flex-col">
                        <PriceTag price={price} originalPrice={originalPrice} size="sm" />
                    </div>

                    <div className="w-[85px] h-9 shrink-0 relative">
                        <div className="absolute inset-0">
                            {quantity > 0 ? (
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    size="sm"
                                    className="w-full !rounded-lg"
                                />
                            ) : (
                                <button
                                    onClick={onAdd}
                                    className="w-full h-full flex items-center justify-center font-bold text-green-600 text-xs uppercase border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 active:scale-95 transition-all"
                                >
                                    ADD
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
