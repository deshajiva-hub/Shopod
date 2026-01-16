"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Eye, MoreVertical, Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export interface Product {
    id: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    vendor: string;
    price: string;
    discount: string;
    stock: number;
    visibility: "Active" | "Inactive";
    createdAt: string;
}

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onBulkDelete: (ids: string[]) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onBulkDelete }: ProductTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map(p => p.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-200", icon: <XCircle size={12} /> };
        if (stock < 10) return { label: "Low Stock", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <AlertTriangle size={12} /> };
        return { label: "In Stock", color: "bg-green-100 text-green-700 border-green-200", icon: <CheckCircle size={12} /> };
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {selectedIds.length > 0 && (
                <div className="bg-[#1877F2]/5 px-6 py-3 border-b border-[#1877F2]/10 flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                    <p className="text-sm font-bold text-[#1877F2]">{selectedIds.length} Products Selected</p>
                    <button
                        onClick={() => {
                            onBulkDelete(selectedIds);
                            setSelectedIds([]);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-all shadow-sm"
                    >
                        <Trash2 size={14} /> Delete Selected
                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2]"
                                    checked={selectedIds.length === products.length && products.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">SKU</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Vendor</th>
                            <th className="px-6 py-4">Price / Discount</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Visibility</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => {
                            const stockStatus = getStockStatus(product.stock);
                            return (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2]"
                                            checked={selectedIds.includes(product.id)}
                                            onChange={() => toggleSelect(product.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="text-gray-300" size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">Added {product.createdAt}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-[11px] uppercase tracking-tighter">{product.sku}</td>
                                    <td className="px-6 py-4 font-medium text-gray-700">{product.category}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">
                                            {product.vendor}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-gray-900">{product.price}</span>
                                            {product.discount && (
                                                <span className="text-[10px] font-bold text-red-500">-{product.discount} Off</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${stockStatus.color}`}>
                                            {stockStatus.icon}
                                            {product.stock} {stockStatus.label}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${product.visibility === "Active" ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-gray-100 text-gray-600 border border-gray-200"
                                            }`}>
                                            {product.visibility}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(product.id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <button className="p-1 text-gray-400 group-hover:hidden transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of <span className="font-medium">{products.length}</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 bg-[#1877F2] border border-[#1877F2] rounded text-xs font-medium text-white hover:bg-[#166fe5]">Next</button>
                </div>
            </div>
        </div>
    );
}
