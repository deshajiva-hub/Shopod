"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles?: ("admin" | "seller" | "client")[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    // Use Redux state instead of localStorage for better reactivity
    const { token, role, isAuthenticated } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        // Fallback check for localStorage if Redux hasn't rehydrated yet (simple version)
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("userRole");

        const activeToken = token || storedToken;
        const activeRole = role || storedRole;

        if (!activeToken) {
            // Redirect to login if no token
            // Store the intended destination for post-login redirect
            const loginUrl = activeRole === "admin" ? "/admin/login" : "/login";
            router.push(loginUrl);
            return;
        }

        if (allowedRoles && activeRole && !allowedRoles.includes(activeRole as any)) {
            // Role mismatch redirect
            if (activeRole === "admin") router.push("/admin");
            else if (activeRole === "seller") router.push("/seller");
            else router.push("/");
            return;
        }

        setAuthorized(true);
    }, [router, pathname, allowedRoles, token, role, isAuthenticated]);

    if (!authorized) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-[#1877F2]" size={48} />
            </div>
        );
    }

    return <>{children}</>;
}
