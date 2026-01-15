
import React from "react";

interface PriceTagProps {
    price: number;
    originalPrice?: number;
    currencySymbol?: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export const PriceTag: React.FC<PriceTagProps> = ({
    price,
    originalPrice,
    currencySymbol = "₹",
    className = "",
    size = "md",
}) => {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    };

    const discountPercentage =
        originalPrice && originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

    return (
        <div className={`flex items-baseline gap-1.5 ${className}`}>
            <span className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
                {currencySymbol}{price.toLocaleString("en-IN")}
            </span>

            {originalPrice && originalPrice > price && (
                <>
                    <span className="text-gray-500 line-through text-xs">
                        {currencySymbol}{originalPrice.toLocaleString("en-IN")}
                    </span>
                    {discountPercentage > 0 && (
                        <span className="text-xs font-bold text-green-600">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </>
            )}
        </div>
    );
};
