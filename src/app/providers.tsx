"use client";

import { PrivyProvider } from "@/providers/PrivyProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 로그인 페이지는 사이드바/헤더 없이 렌더
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: 240, minHeight: "100vh" }}>
        <Header />
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <AuthProvider>
        <AuthGuard>
          <DashboardLayout>{children}</DashboardLayout>
        </AuthGuard>
      </AuthProvider>
    </PrivyProvider>
  );
}
