import type { Metadata } from "next";
import Sidebar from "@/components/seller/Layout/Sidebar";
import Header from "@/components/seller/Layout/Header";
import { ReduxProvider } from "@/components/seller/Providers/ReduxProvider";

export const metadata: Metadata = {
    title: "Shopod Seller Partner",
    description: "Blinkit + Swiggy Style Hyperlocal Delivery Dashboard",
};

import RoleGuard from "@/components/common/Auth/RoleGuard";

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <RoleGuard allowedRoles={["seller"]}>
                <ReduxProvider>
                    <div className="flex">
                        <Sidebar />
                        <div className="flex-1 ml-64 min-h-screen">
                            <Header />
                            <main className="p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                </ReduxProvider>
            </RoleGuard>
        </div>
    );
}
