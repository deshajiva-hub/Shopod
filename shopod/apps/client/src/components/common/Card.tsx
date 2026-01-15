
import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = "",
    onClick,
    hoverEffect = true,
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${hoverEffect ? "hover:shadow-lg transition-shadow duration-300" : ""
                } ${onClick ? "cursor-pointer" : ""} ${className}`}
        >
            {children}
        </div>
    );
};
