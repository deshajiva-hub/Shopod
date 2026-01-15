"use client";

import React from "react";
import Image from "next/image";

interface CategoryPillProps {
    id: string;
    name: string;
    image: string;
    onClick?: () => void;
    isActive?: boolean;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
    id,
    name,
    image,
    onClick,
    isActive = false,
}) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 group min-w-[72px]"
        >
            <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center p-2 transition-all duration-300 ${isActive ? 'ring-2 ring-green-600 ring-offset-2' : 'group-hover:scale-105'}`}>
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <span className={`text-xs font-medium text-center leading-tight max-w-[80px] line-clamp-2 ${isActive ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
                {name}
            </span>
        </button>
    );
};

interface CategoryListProps {
    categories: Array<{ id: string; name: string; image: string }>;
    activeId?: string;
    onSelect?: (id: string) => void;
    className?: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    activeId,
    onSelect,
    className = "",
}) => {
    return (
        <div className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4 ${className}`}>
            {categories.map((cat) => (
                <CategoryPill
                    key={cat.id}
                    {...cat}
                    isActive={activeId === cat.id}
                    onClick={() => onSelect?.(cat.id)}
                />
            ))}
        </div>
    );
};
