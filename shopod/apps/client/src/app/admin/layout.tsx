import Sidebar from "@/components/admin/Layout/Sidebar";
import Header from "@/components/admin/Layout/Header";
import { ReduxProvider } from "@/components/seller/Providers/ReduxProvider"; // Reusing the provider component if generic

import RoleGuard from "@/components/common/Auth/RoleGuard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 min-h-screen antialiased">
      <RoleGuard allowedRoles={["admin"]}>
        <ReduxProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64 min-h-screen">
              <Header />
              <main className="p-8 pt-24">
                {children}
              </main>
            </div>
          </div>
        </ReduxProvider>
      </RoleGuard>
    </div>
  );
}
