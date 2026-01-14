import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import { ReduxProvider } from "@/components/Providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Shopod Seller Partner",
    description: "Blinkit + Swiggy Style Hyperlocal Delivery Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50`}>
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
            </body>
        </html>
    );
}
