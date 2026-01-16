"use client";
import React, { useState } from "react";
import { Plus, Download, LayoutGrid, List, Search, Layers, RefreshCw } from "lucide-react";
import CategoryItem, { Category } from "@/components/admin/categories/CategoryItem";
import CategoryFormModal from "@/components/admin/categories/CategoryFormModal";

const INITIAL_CATEGORIES: Category[] = [
    {
        id: "CAT-1",
        name: "Food & Restaurants",
        icon: "🍔",
        status: "Active",
        sortOrder: 1,
        subcategories: [
            { id: "SC-11", name: "North Indian", icon: "🍛", status: "Active", sortOrder: 1, parentId: "CAT-1" },
            { id: "SC-12", name: "Chinese", icon: "🥢", status: "Active", sortOrder: 2, parentId: "CAT-1" },
            { id: "SC-13", name: "Fast Food", icon: "🍟", status: "Active", sortOrder: 3, parentId: "CAT-1" },
        ]
    },
    {
        id: "CAT-2",
        name: "Groceries",
        icon: "🥦",
        status: "Active",
        sortOrder: 2,
        subcategories: [
            { id: "SC-21", name: "Fruits & Vegetables", icon: "🍎", status: "Active", sortOrder: 1, parentId: "CAT-2" },
            { id: "SC-22", name: "Dairy & Eggs", icon: "🥚", status: "Active", sortOrder: 2, parentId: "CAT-2" },
        ]
    },
    {
        id: "CAT-3",
        name: "Pharmacy",
        icon: "💊",
        status: "Active",
        sortOrder: 3,
        subcategories: []
    }
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [activeParent, setActiveParent] = useState<{ id: string, name: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSave = (data: Partial<Category>) => {
        if (editingCategory) {
            // Update existing
            const updateNested = (list: Category[]): Category[] => {
                return list.map(cat => {
                    if (cat.id === editingCategory.id) {
                        return { ...cat, ...data };
                    }
                    if (cat.subcategories) {
                        return { ...cat, subcategories: updateNested(cat.subcategories) };
                    }
                    return cat;
                });
            };
            setCategories(updateNested(categories));
        } else {
            // Create new
            const newCat: Category = {
                id: `CAT-${Math.floor(Math.random() * 10000)}`,
                name: data.name || "New Category",
                icon: data.icon || "📁",
                status: data.status || "Active",
                sortOrder: data.sortOrder || 0,
                parentId: activeParent?.id || null,
                subcategories: []
            };

            if (activeParent) {
                const addSub = (list: Category[]): Category[] => {
                    return list.map(cat => {
                        if (cat.id === activeParent.id) {
                            return { ...cat, subcategories: [...(cat.subcategories || []), newCat] };
                        }
                        if (cat.subcategories) {
                            return { ...cat, subcategories: addSub(cat.subcategories) };
                        }
                        return cat;
                    });
                };
                setCategories(addSub(categories));
            } else {
                setCategories([...categories, newCat]);
            }
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this category? This might affect products linked to it.")) {
            const deleteNested = (list: Category[]): Category[] => {
                return list
                    .filter(cat => cat.id !== id)
                    .map(cat => ({
                        ...cat,
                        subcategories: cat.subcategories ? deleteNested(cat.subcategories) : []
                    }));
            };
            setCategories(deleteNested(categories));
        }
    };

    const handleStatusToggle = (id: string, status: "Active" | "Inactive") => {
        const toggleNested = (list: Category[]): Category[] => {
            return list.map(cat => {
                if (cat.id === id) {
                    return { ...cat, status };
                }
                if (cat.subcategories) {
                    return { ...cat, subcategories: toggleNested(cat.subcategories) };
                }
                return cat;
            });
        };
        setCategories(toggleNested(categories));
    };

    const handleAddSub = (parentId: string) => {
        const findParent = (list: Category[]): Category | undefined => {
            for (const cat of list) {
                if (cat.id === parentId) return cat;
                if (cat.subcategories) {
                    const found = findParent(cat.subcategories);
                    if (found) return found;
                }
            }
            return undefined;
        };
        const p = findParent(categories);
        if (p) {
            setActiveParent({ id: p.id, name: p.name });
            setEditingCategory(null);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (cat: Category) => {
        setEditingCategory(cat);
        setActiveParent(null);
        setIsModalOpen(true);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subcategories?.some(sc => sc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Categories & Hierarchy</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest">Manage Global Taxonomy & Nested Subcategories.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                        <Download size={18} className="text-gray-400" /> Export JSON
                    </button>
                    <button
                        onClick={() => {
                            setEditingCategory(null);
                            setActiveParent(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] rounded-xl text-xs font-black text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
                    >
                        <Plus size={18} /> New Category
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#1877F2]/30 transition-all">
                    <div className="p-3 bg-blue-50 text-[#1877F2] rounded-xl group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <Layers size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Parent Categories</p>
                        <p className="text-2xl font-black text-gray-900">{categories.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-purple-500/30 transition-all">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <List size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Active Nodes</p>
                        <p className="text-2xl font-black text-gray-900">
                            {categories.reduce((acc, cat) => acc + 1 + (cat.subcategories?.length || 0), 0)}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-green-500/30 transition-all">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                        <RefreshCw size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Synced</p>
                        <p className="text-2xl font-black text-gray-900">Just Now</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/30">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search categories or subcategories..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all font-bold text-sm shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                        <button className="px-4 py-2 bg-gray-50 text-[#1877F2] rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <List size={14} /> Tree View
                        </button>
                        <button className="px-4 py-2 hover:bg-gray-50 text-gray-400 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all">
                            <LayoutGrid size={14} /> Grid Map
                        </button>
                    </div>
                </div>

                {/* Categories Tree */}
                <div className="divide-y divide-gray-50">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.sort((a, b) => a.sortOrder - b.sortOrder).map((cat) => (
                            <CategoryItem
                                key={cat.id}
                                category={cat}
                                level={0}
                                onEdit={handleEdit}
                                onAddSub={handleAddSub}
                                onDelete={handleDelete}
                                onStatusToggle={handleStatusToggle}
                            />
                        ))
                    ) : (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                <Layers size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900">No results found</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">We couldn't find any category matching "{searchQuery}". Try a different search term.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50/50 flex items-center justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Drag and drop to reorder categories coming soon
                    </p>
                </div>
            </div>

            {/* Modal */}
            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingCategory}
                parentId={activeParent?.id}
                parentName={activeParent?.name}
            />
        </div>
    );
}
