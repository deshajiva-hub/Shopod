
"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
    isLiked?: boolean;
    onToggle?: (newState: boolean) => void;
    className?: string;
    size?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
    isLiked = false,
    onToggle,
    className = "",
    size = 20,
}) => {
    const [liked, setLiked] = useState(isLiked);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering parent card click
        const newState = !liked;
        setLiked(newState);
        onToggle?.(newState);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-90 ${className}`}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                size={size}
                className={`transition-colors duration-300 ${liked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-gray-600"
                    }`}
            />
        </button>
    );
};
