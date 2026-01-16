"use client";
import React from "react";
import { Eye, ShieldOff, ShieldCheck, MoreVertical, Mail, Phone, Calendar, User } from "lucide-react";

export interface UserData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "Customer" | "Vendor" | "Rider" | "Admin";
    status: "Active" | "Blocked" | "Inactive";
    createdAt: string;
}

interface UserTableProps {
    users: UserData[];
    onViewProfile: (user: UserData) => void;
    onToggleStatus: (id: string, currentStatus: string) => void;
}

const roleStyles = {
    Customer: "bg-blue-50 text-blue-600 border-blue-100",
    Vendor: "bg-purple-50 text-purple-600 border-purple-100",
    Rider: "bg-amber-50 text-amber-600 border-amber-100",
    Admin: "bg-rose-50 text-rose-600 border-rose-100",
};

const statusStyles = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Blocked: "bg-red-100 text-red-700 border-red-200",
    Inactive: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function UserTable({ users, onViewProfile, onToggleStatus }: UserTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                                            <div className="text-[#1877F2] font-black text-sm">{user.name.charAt(0)}</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{user.name}</div>
                                            <div className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-tighter">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail size={12} className="text-gray-400" />
                                            <span className="text-xs font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone size={12} className="text-gray-400" />
                                            <span className="text-xs font-medium">{user.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${roleStyles[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusStyles[user.status]}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Calendar size={14} />
                                        <span className="text-xs font-medium">{user.createdAt}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onViewProfile(user)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Profile"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(user.id, user.status)}
                                            className={`p-1.5 rounded-lg transition-colors ${user.status === "Blocked" ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"
                                                }`}
                                            title={user.status === "Blocked" ? "Unblock User" : "Block User"}
                                        >
                                            {user.status === "Blocked" ? <ShieldCheck size={16} /> : <ShieldOff size={16} />}
                                        </button>
                                    </div>
                                    <button className="p-1 text-gray-400 group-hover:hidden transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{users.length}</span> of <span className="font-medium">{users.length}</span> users</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 bg-[#1877F2] border border-[#1877F2] rounded text-xs font-medium text-white hover:bg-[#166fe5]">Next</button>
                </div>
            </div>
        </div>
    );
}
