"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
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

    const [targetRole, setTargetRole] = useState(searchParams.get("role") || "client");

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) setTargetRole(role);
    }, [searchParams]);

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
            if (role === "admin") router.push("/admin");
            else if (role === "seller") router.push("/seller");
            else router.push("/");

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

                if (mockRole === "admin") router.push("/admin");
                else if (mockRole === "seller") router.push("/seller");
                else router.push("/");
                return;
            }

            toast.error(err?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f4f1fb_45%,#f6f6fb_100%)] px-4 py-10 sm:px-6 sm:py-12 flex items-center">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] ">
                <section className="text-center lg:text-left">
                    <h1 className="text-3xl font-semibold leading-tight text-[#262626] md:text-5xl">
                        Sign In to
                        <br />
                        Shopod
                    </h1>
                    <p className="mt-6 text-base text-[#8b8b93]">
                        If you don&apos;t have an account
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
                                />
                            </label>
                            <label className="flex items-center gap-3 rounded-[18px] border border-transparent bg-[#f2f3f7] px-4 py-4 focus-within:border-[#6b4dd7]/40 cursor-pointer">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full bg-transparent text-sm text-[#262626] outline-none sm:text-base"
                                />
                                <span className="text-[#a1a1aa]" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                        <path
                                            d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                                        <path
                                            d="M4 4l16 16"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </label>
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

                        <div className="my-6 flex items-center gap-3 text-sm text-[#8b8b93]">
                            <span className="h-px flex-1 bg-[#e5e6ec]" />
                            Or continue with
                            <span className="h-px flex-1 bg-[#e5e6ec]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex h-14 items-center justify-center rounded-[18px] border border-[#e5e6ec] bg-white shadow-[0_8px_20px_rgba(28,24,60,0.08)] cursor-pointer"
                                aria-label="Continue with Google"
                                type="button"
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6">
                                    <path
                                        d="M21.8 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c2-1.8 3-4.5 3-7.5z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.3-2.6c-.9.6-2.1 1-3.3 1-2.5 0-4.6-1.7-5.3-4H3.2v2.7A10 10 0 0 0 12 22z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M6.7 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.3H3.2A10 10 0 0 0 2 12c0 1.7.4 3.3 1.2 4.7L6.7 14z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.8c1.5 0 2.9.5 3.9 1.6l2.9-2.9A9.7 9.7 0 0 0 12 2 10 10 0 0 0 3.2 7.3l3.5 2.7c.7-2.3 2.8-4.2 5.3-4.2z"
                                        fill="#EA4335"
                                    />
                                </svg>
                            </button>

                            <button
                                className="flex h-14 items-center justify-center rounded-[18px] border border-[#e5e6ec] bg-white shadow-[0_8px_20px_rgba(28,24,60,0.08)] cursor-pointer"
                                aria-label="Continue with Facebook"
                                type="button"
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                                    <circle cx="12" cy="12" r="10" fill="#1877F2" />
                                    <path
                                        d="M13.1 7.6h2V5.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2.1H5.9v2.8h2.3v4.5h3.2v-4.5h2.4l.4-2.8h-2.8V9.9c0-1 .3-1.7 1.7-1.7z"
                                        fill="#ffffff"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
