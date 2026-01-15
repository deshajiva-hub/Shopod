
import { Star, StarHalf } from "lucide-react";
import React from "react";

interface RatingProps {
    rating: number; // 0 to 5
    count?: number; // Number of reviews
    size?: number; // Size of stars in px
    color?: string; // Color of stars (default generic yellow/gold)
    className?: string;
}

export const Rating: React.FC<RatingProps> = ({
    rating,
    count,
    size = 16,
    color = "#fbbf24", // amber-400
    className = "",
}) => {
    // Ensure rating is between 0 and 5
    const clampedRating = Math.max(0, Math.min(5, rating));

    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="flex items-center">
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <Star
                        key={`full-${i}`}
                        size={size}
                        fill={color}
                        color={color}
                        className="mr-0.5"
                    />
                ))}

                {/* Half Star */}
                {hasHalfStar && (
                    <div className="relative">
                        <StarHalf
                            size={size}
                            fill={color}
                            color={color}
                            className="mr-0.5"
                        />
                    </div>
                )}

                {/* Empty Stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star
                        key={`empty-${i}`}
                        size={size}
                        color="#d1d5db" // gray-300
                        className="mr-0.5"
                    />
                ))}
            </div>

            {count !== undefined && (
                <span className="text-xs text-gray-500 font-medium ml-1">
                    ({count > 1000 ? `${(count / 1000).toFixed(1)}k` : count})
                </span>
            )}
        </div>
    );
};
