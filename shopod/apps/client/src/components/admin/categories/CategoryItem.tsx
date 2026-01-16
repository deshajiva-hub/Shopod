"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Edit2, Plus, Trash2, Layers, GripVertical } from "lucide-react";

export interface Category {
    id: string;
    name: string;
    icon: string;
    status: "Active" | "Inactive";
    sortOrder: number;
    subcategories?: Category[];
    parentId?: string | null;
}

interface CategoryItemProps {
    category: Category;
    level: number;
    onEdit: (cat: Category) => void;
    onAddSub: (parentId: string) => void;
    onDelete: (id: string) => void;
    onStatusToggle: (id: string, status: "Active" | "Inactive") => void;
}

export default function CategoryItem({
    category,
    level,
    onEdit,
    onAddSub,
    onDelete,
    onStatusToggle
}: CategoryItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSub = category.subcategories && category.subcategories.length > 0;

    return (
        <div className="select-none">
            <div
                className={`flex items-center justify-between py-4 pr-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors group ${level > 0 ? "ml-12" : ""
                    }`}
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-gray-300 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity" />
                        {hasSub ? (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                            >
                                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </button>
                        ) : (
                            <div className="w-7"></div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:bg-white transition-colors">
                            {category.icon || <Layers size={18} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-gray-900">{category.name}</h4>
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                    Order: {category.sortOrder}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <button
                                    onClick={() => onStatusToggle(category.id, category.status === "Active" ? "Inactive" : "Active")}
                                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${category.status === "Active"
                                            ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100"
                                            : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                                        }`}
                                >
                                    {category.status}
                                </button>
                                {hasSub && (
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                        • {category.subcategories?.length} Sub-categories
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    {level < 2 && ( // Limit nesting to 2 levels for this UI
                        <button
                            onClick={() => onAddSub(category.id)}
                            className="p-2 text-[#1877F2] hover:bg-blue-50 rounded-lg transition-colors border border-blue-50"
                            title="Add Sub-category"
                        >
                            <Plus size={16} />
                        </button>
                    )}
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                        title="Edit Category"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors border border-red-50"
                        title="Delete Category"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {isExpanded && hasSub && (
                <div className="bg-gray-50/20">
                    {category.subcategories?.map((sub) => (
                        <CategoryItem
                            key={sub.id}
                            category={sub}
                            level={level + 1}
                            onEdit={onEdit}
                            onAddSub={onAddSub}
                            onDelete={onDelete}
                            onStatusToggle={onStatusToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
