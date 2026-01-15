"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  count,
  children,
  initiallyExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <div className="border-b-[12px] border-gray-50 first:border-t-0 last:border-b-0 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white"
      >
        <h3 className="font-extrabold text-lg text-gray-900">
          {title} <span className="text-sm font-medium text-gray-500 ml-1">({count})</span>
        </h3>
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
};
