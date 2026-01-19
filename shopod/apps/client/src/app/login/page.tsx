"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import Success from "../success/success";

export default function UnifiedLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [redirectPath, setRedirectPath] = useState("/");

    const [targetRole, setTargetRole] = useState("client");

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) setTargetRole(role);
    }, [searchParams]);

    const contentMap: Record<string, { title: React.ReactNode; desc: string; color: string }> = {
        admin: {
            title: <>Admin <span className="text-red-600">Console</span></>,
            desc: "Secure access for system administrators. Manage users, vendors, and platform settings.",
            color: "bg-red-600"
        },
        seller: {
            title: <>Seller <span className="text-blue-600">Dashboard</span></>,
            desc: "Manage your inventory, track orders, and analyze your business growth.",
            color: "bg-blue-600"
        },
        rider: {
            title: <>Rider <span className="text-green-600">App</span></>,
            desc: "View earnings, manage deliveries, and track your performance in real-time.",
            color: "bg-green-600"
        },
        client: {
            title: <>Welcome to <span className="text-[#6b4dd7]">Shopod</span></>,
            desc: "Discover the best local products and get them delivered to your doorstep.",
            color: "bg-[#6b4dd7]"
        }
    };

    const activeText = contentMap[targetRole] || contentMap.client;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentialRole =
            formData.email === "admin@shopod.com" && formData.password === "admin123"
                ? "admin"
                : formData.email === "seller@shopod.com" && formData.password === "seller123"
                    ? "seller"
                    : formData.email === "user@shopod.com" && formData.password === "user123"
                        ? "client"
                        : formData.email === "rider@shopod.com" && formData.password === "rider123"
                            ? "rider"
                            : null;

        try {
            // In a real app, this would be a real API call
            // For now, let's simulate role-based login logic
            // In production, the backend might return the role in the JWT or response

            // Mocking the API response based on specific emails for demo/dev purposes
            // Or just allow any login for now and assign role based on targetRole

            const result = await login(formData).unwrap();

            // Assume the backend returns role, if not we use targetRole for now
            const role = credentialRole || (result as any).role || targetRole;

            dispatch(setUser({
                user: { email: formData.email },
                token: result.token,
                role: role as any
            }));

            toast.success("Login successful!");

            // Redirect based on role
            let targetPath = "/";
            if (role === "admin") targetPath = "/admin";
            else if (role === "seller") targetPath = "/seller";

            setRedirectPath(targetPath);
            setIsSuccess(true);

        } catch (err: any) {
            // Fallback mock for development if API is not ready
            if (process.env.NODE_ENV === "development" && credentialRole) {
                console.warn("Using mock login for development");
                const mockRole = credentialRole;

                dispatch(setUser({
                    user: { email: formData.email },
                    token: "mock-token-" + Date.now(),
                    role: mockRole as any
                }));

                toast.success("Login successful!");

                let targetPath = "/";
                if (mockRole === "admin") targetPath = "/admin";
                else if (mockRole === "seller") targetPath = "/seller";

                setRedirectPath(targetPath);
                setIsSuccess(true);
                return;
            }

            toast.error(err?.data?.message || "Login failed. Please try again.");
        }
    };

    if (isSuccess) {
        return <Success onComplete={() => router.push(redirectPath)} />;
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f4f1fb_45%,#f6f6fb_100%)] px-4 py-10 sm:px-6 sm:py-12 flex items-center">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] ">
                <section className="text-center lg:text-left">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 mb-6 transition-all duration-300`}>
                        <span className={`w-2 h-2 rounded-full ${activeText.color}`}></span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{targetRole} Access</span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight text-[#262626] md:text-6xl tracking-tighter transition-all duration-300">
                        {activeText.title}
                    </h1>
                    <p className="mt-6 text-lg text-[#8b8b93] font-medium max-w-md transition-all duration-300">
                        {activeText.desc}
                    </p>
                    <p className="mt-2 text-sm text-[#8b8b93]">
                        Don&apos;t have an account?
                    </p>
                    <p className="text-base text-[#8b8b93]">
                        You can{" "}
                        <Link className="font-semibold text-[#6b4dd7]" href="/signup">
                            Register here!
                        </Link>
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center lg:justify-start">
                        <div aria-hidden="true">
                            <img src="/Demoo.png" alt="" />
                        </div>
                    </div>
                </section>

                <section className="flex justify-center lg:justify-end">
                    <div className="w-full max-w-105 rounded-4xl bg-white p-6 shadow-[0_18px_40px_rgba(68,54,128,0.15)] sm:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <label className="flex items-center gap-3 rounded-[18px] border border-transparent bg-[#f2f3f7] px-4 py-4 focus-within:border-[#6b4dd7]/40 cursor-pointer">
                                <input
                                    name="email"
                                    type="text"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email or Phone number"
                                    className="w-full bg-transparent text-sm text-[#262626] outline-none sm:text-base"
                                    suppressHydrationWarning
                                />
                            </label>
                            <div className="flex items-center gap-3 rounded-[18px] border border-transparent bg-[#f2f3f7] px-4 py-4 focus-within:border-[#6b4dd7]/40 transition-colors">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full bg-transparent text-sm text-[#262626] outline-none sm:text-base"
                                    suppressHydrationWarning
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-[#a1a1aa] hover:text-[#6b4dd7] transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="mt-2 text-right text-sm text-[#8b8b93]">
                                Forgot password?
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6b4dd7] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(107,77,215,0.25)] transition hover:-translate-y-0.5 hover:bg-[#5338b4] disabled:cursor-not-allowed disabled:opacity-70 sm:py-4 sm:text-lg"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}