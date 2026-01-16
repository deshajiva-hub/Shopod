"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Download, Plus, UserPlus } from "lucide-react";
import UserTable, { UserData } from "@/components/admin/customers/UserTable";
import UserFilters from "@/components/admin/customers/UserFilters";
import UserProfileModal from "@/components/admin/customers/UserProfileModal";
import UserFormModal from "@/components/admin/customers/UserFormModal";

const MOCK_USERS: UserData[] = [
    {
        id: "USR-001",
        name: "Liam Johnson",
        email: "liam@example.com",
        phone: "+1 234 567 890",
        role: "Customer",
        status: "Active",
        createdAt: "Jan 12, 2026"
    },
    {
        id: "USR-002",
        name: "Olivia Smith",
        email: "olivia@example.com",
        phone: "+1 987 654 321",
        role: "Vendor",
        status: "Active",
        createdAt: "Jan 12, 2026"
    },
    {
        id: "USR-003",
        name: "Noah Williams",
        email: "noah@example.com",
        phone: "+1 555 123 456",
        role: "Rider",
        status: "Active",
        createdAt: "Jan 11, 2026"
    },
    {
        id: "USR-004",
        name: "Emma Brown",
        email: "emma@example.com",
        phone: "+1 444 987 654",
        role: "Customer",
        status: "Blocked",
        createdAt: "Dec 30, 2025"
    },
    {
        id: "USR-005",
        name: "William Garcia",
        email: "garcia@example.com",
        phone: "+1 333 444 555",
        role: "Admin",
        status: "Active",
        createdAt: "Nov 05, 2025"
    },
];

export default function CustomersPage() {
    const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"new" | "edit">("new");
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleSearch = (query: string) => {
        if (!query) {
            setUsers(MOCK_USERS);
            return;
        }
        const filtered = MOCK_USERS.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.phone.includes(query)
        );
        setUsers(filtered);
    };

    const handleFilterChange = (filters: any) => {
        let filtered = [...MOCK_USERS];
        if (filters.role) filtered = filtered.filter(u => u.role === filters.role);
        if (filters.status) filtered = filtered.filter(u => u.status === filters.status);
        setUsers(filtered);
    };

    const handleViewProfile = (user: UserData) => {
        setSelectedUser(user);
        setIsProfileModalOpen(true);
    };

    const handleAddNew = () => {
        setFormMode("new");
        setSelectedUser(null);
        setIsFormModalOpen(true);
    };

    const handleSaveUser = (userData: Partial<UserData>) => {
        if (formMode === "new") {
            const newUser: UserData = {
                ...userData as UserData,
                id: `USR-${Math.floor(100 + Math.random() * 900)}`,
            };
            setUsers([newUser, ...users]);
        } else {
            setUsers(users.map(u => u.id === selectedUser?.id ? { ...u, ...userData } : u));
        }
    };

    const handleToggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
        if (confirm(`Are you sure you want to ${newStatus === "Blocked" ? "Block" : "Unblock"} this user?`)) {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus as any } : u));
            if (selectedUser?.id === id) {
                setSelectedUser(prev => prev ? { ...prev, status: newStatus as any } : null);
            }
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Users Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage system users, roles, permissions and account visibility.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm uppercase tracking-widest text-[11px]">
                        <Download size={18} className="text-gray-400" /> Export CSV
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1877F2] rounded-xl text-sm font-black text-white hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest text-[11px]"
                    >
                        <UserPlus size={18} /> Add New User
                    </button>
                </div>
            </div>

            <UserFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] rounded-full text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span>
                        {users.length} Total Users
                    </div>
                </div>
                <UserTable
                    users={users}
                    onViewProfile={handleViewProfile}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            <UserProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                user={selectedUser}
                onToggleStatus={handleToggleStatus}
            />

            <UserFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveUser}
                initialData={selectedUser}
                mode={formMode}
            />
        </div>
    );
}
