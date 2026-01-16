"use client";

import React, { useState, useEffect } from "react";
import {
    Lock,
    Mail,
    Loader2,
    ArrowRight,
    Shield,
    ShoppingBag,
    User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function UnifiedLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // role from URL or dev switch
    const [targetRole, setTargetRole] = useState<string>(
        searchParams.get("role") || "client"
    );

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) setTargetRole(role);
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resolveRole = (backendRole?: string) => {
        // 1. If backend returns a specific role (not just 'user'/'client'), use it
        if (backendRole && backendRole !== "user" && backendRole !== "client") {
            return backendRole;
        }

        // 2. Fallback to smart email detection
        const email = formData.email.toLowerCase();
        if (email.includes("admin")) return "admin";
        if (email.includes("seller")) return "seller";
        if (email.includes("rider")) return "rider";

        // 3. Fallback to targetRole from UI
        return targetRole;
    };

    const redirectByRole = (role: string) => {
        if (role === "admin") router.push("/admin");
        else if (role === "seller") router.push("/seller");
        else if (role === "rider") router.push("/rider");
        else router.push("/");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result: any = await login(formData).unwrap();

            const role = resolveRole(result?.role);

            dispatch(
                setUser({
                    user: { email: formData.email },
                    token: result.token,
                    role: role as any,
                })
            );

            toast.success("Login successful!");

            const redirectPath = searchParams.get("redirect");
            if (redirectPath) {
                router.push(redirectPath);
            } else {
                redirectByRole(role);
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Login failed. Using dev login.");

            // 🔥 DEV FALLBACK LOGIN
            if (process.env.NODE_ENV === "development") {
                const role = targetRole;

                dispatch(
                    setUser({
                        user: { email: formData.email },
                        token: "mock-token-" + Date.now(),
                        role: role as any,
                    })
                );

                redirectByRole(role);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-black">
                {/* HEADER */}
                <div
                    className={`${targetRole === "seller"
                        ? "bg-primary"
                        : targetRole === "rider"
                            ? "bg-green-600"
                            : "bg-[#1877F2]"
                        } p-8 text-center transition-colors`}
                >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Shopod</h1>
                    <p className="text-white/90 text-sm mt-2">
                        {targetRole === "admin"
                            ? "Admin Access"
                            : targetRole === "seller"
                                ? "Seller Partner"
                                : targetRole === "rider"
                                    ? "Delivery Partner"
                                    : "Welcome Back"}
                    </p>
                </div>

                {/* FORM */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${targetRole === "seller"
                                ? "bg-primary"
                                : targetRole === "rider"
                                    ? "bg-green-600"
                                    : "bg-[#1877F2]"
                                } text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2`}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* DEV ROLE SWITCH */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="mt-8 border-t pt-6">
                            <p className="text-[10px] text-gray-400 font-bold text-center mb-4">
                                DEVELOPMENT ROLE SWITCH
                            </p>
                            <div className="flex gap-2">
                                {[
                                    { id: "admin", icon: Shield },
                                    { id: "seller", icon: ShoppingBag },
                                    { id: "rider", icon: Shield },
                                    { id: "client", icon: User },
                                ].map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => setTargetRole(r.id)}
                                        className={`flex-1 p-2 rounded-lg border ${targetRole === r.id
                                            ? "bg-blue-50 border-blue-400 text-blue-600"
                                            : "bg-gray-50 text-gray-400"
                                            }`}
                                    >
                                        <r.icon size={16} />
                                        <div className="text-[10px] font-bold">{r.id}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-6">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Test Credentials</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="font-bold text-gray-600">Admin:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-red-600">admin@shopod.com</code>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="font-bold text-gray-600">Rider:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-green-600">rider@shopod.com</code>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="font-bold text-gray-600">Seller:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-orange-600">seller@shopod.com</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center text-xs text-gray-400">
                        © 2026 Shopod Inc.
                    </div>
                </div>
            </div>
        </div>
    );
}
