"use client";

import { Minus, Plus } from "lucide-react";
import React from "react";

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 0,
    max = 99,
    className = "",
    size = "md",
}) => {
    const isMin = quantity <= min;
    const isMax = quantity >= max;

    const sizeClasses = {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
    };

    const btnSizeClasses = {
        sm: "w-7",
        md: "w-9",
        lg: "w-11",
    };

    const iconSizes = {
        sm: 14,
        md: 16,
        lg: 20,
    };

    if (quantity === 0 && min === 0) {
        return (
            <button
                onClick={onIncrease}
                className={`flex items-center justify-center font-bold uppercase border border-gray-300 rounded-lg text-green-600 bg-white hover:bg-green-50 active:scale-95 transition-all shadow-sm ${sizeClasses[size]} ${className}`}
            >
                Add
            </button>
        );
    }

    return (
        <div
            className={`flex items-center bg-green-50 border border-green-200 rounded-lg overflow-hidden shadow-sm ${className}`}
        >
            <button
                onClick={onDecrease}
                // disabled={isMin}
                className={`flex items-center justify-center text-green-700 hover:bg-green-100 active:bg-green-200 transition-colors ${btnSizeClasses[size]} h-full`}
                aria-label="Decrease quantity"
            >
                <Minus size={iconSizes[size]} strokeWidth={2.5} />
            </button>

            <div className={`flex items-center justify-center font-bold text-green-800 min-w-[24px] ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
                {quantity}
            </div>

            <button
                onClick={onIncrease}
                disabled={isMax}
                className={`flex items-center justify-center text-green-700 hover:bg-green-100 active:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${btnSizeClasses[size]} h-full`}
                aria-label="Increase quantity"
            >
                <Plus size={iconSizes[size]} strokeWidth={2.5} />
            </button>
        </div>
    );
};
