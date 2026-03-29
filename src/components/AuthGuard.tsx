"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, store } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // 로그인 페이지에서는 가드 안 함
    if (pathname === "/login") return;

    // 미인증 또는 가맹점 아닌 경우 로그인 페이지로
    if (!isAuthenticated || !store) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, store, pathname, router]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 14, color: "#9CA3AF" }}>로딩 중...</p>
      </div>
    );
  }

  // 로그인 페이지는 그냥 통과
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // 인증 안 된 경우 아무것도 렌더하지 않음 (리다이렉트 대기)
  if (!isAuthenticated || !store) {
    return null;
  }

  return <>{children}</>;
}
