"use client";
import React, { useState } from "react";
import ProductTable, { Product } from "@/components/admin/products/ProductTable";
import ProductFilters from "@/components/admin/products/ProductFilters";
import ProductFormModal from "@/components/admin/products/ProductFormModal";
import { Download, Plus, Trash2 } from "lucide-react";

const MOCK_PRODUCTS: Product[] = [
    {
        id: "PRD-1001",
        image: "",
        name: "Organic Bananas",
        sku: "FRT-BAN-001",
        category: "Fruits",
        vendor: "Green Grocer",
        price: "$4.99",
        discount: "10%",
        stock: 120,
        visibility: "Active",
        createdAt: "Jan 12, 2026"
    },
    {
        id: "PRD-1002",
        image: "",
        name: "Whole Milk",
        sku: "DRY-MLK-002",
        category: "Dairy",
        vendor: "Fresh Dairy",
        price: "$3.49",
        discount: "",
        stock: 45,
        visibility: "Active",
        createdAt: "Jan 12, 2026"
    },
    {
        id: "PRD-1003",
        image: "",
        name: "Sourdough Bread",
        sku: "BKY-SRD-003",
        category: "Bakery",
        vendor: "Daily Bread",
        price: "$5.99",
        discount: "15%",
        stock: 5,
        visibility: "Active",
        createdAt: "Jan 11, 2026"
    },
    {
        id: "PRD-1004",
        image: "",
        name: "Chicken Breast",
        sku: "MET-CHK-004",
        category: "Meat",
        vendor: "Prime Meats",
        price: "$12.99",
        discount: "",
        stock: 0,
        visibility: "Inactive",
        createdAt: "Jan 10, 2026"
    },
    {
        id: "PRD-1005",
        image: "",
        name: "Organic Fujian Apples",
        sku: "FRT-APL-005",
        category: "Fruits",
        vendor: "Green Grocer",
        price: "$6.50",
        discount: "5%",
        stock: 85,
        visibility: "Active",
        createdAt: "Jan 15, 2026"
    },
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"new" | "edit">("new");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleSearch = (query: string) => {
        if (!query) {
            setProducts(MOCK_PRODUCTS);
            return;
        }
        const filtered = MOCK_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
    };

    const handleFilterChange = (filters: any) => {
        let filtered = [...MOCK_PRODUCTS];
        if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
        if (filters.vendor) filtered = filtered.filter(p => p.vendor === filters.vendor);
        if (filters.visibility) filtered = filtered.filter(p => p.visibility === filters.visibility);
        if (filters.stockStatus) {
            if (filters.stockStatus === "In Stock") filtered = filtered.filter(p => p.stock >= 10);
            if (filters.stockStatus === "Low Stock") filtered = filtered.filter(p => p.stock > 0 && p.stock < 10);
            if (filters.stockStatus === "Out of Stock") filtered = filtered.filter(p => p.stock === 0);
        }
        setProducts(filtered);
    };

    const handleAddNew = () => {
        setModalMode("new");
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setModalMode("edit");
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleBulkDelete = (ids: string[]) => {
        if (confirm(`Are you sure you want to delete ${ids.length} products?`)) {
            setProducts(products.filter(p => !ids.includes(p.id)));
        }
    };

    const handleSaveProduct = (productData: Partial<Product>) => {
        if (modalMode === "new") {
            const newProduct: Product = {
                ...productData as Product,
                id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
            };
            setProducts([newProduct, ...products]);
        } else {
            setProducts(products.map(p => p.id === selectedProduct?.id ? { ...p, ...productData } : p));
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Products Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Add, edit and manage your product catalog with inventory control.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} className="text-gray-400" /> Export List
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1877F2] rounded-xl text-sm font-bold text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>
            </div>

            <ProductFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                        {products.length} Total SKUs
                    </div>
                </div>
                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                />
            </div>

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                initialData={selectedProduct}
                mode={modalMode}
            />
        </div>
    );
}
