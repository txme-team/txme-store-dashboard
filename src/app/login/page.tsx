"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isLoading, login, store } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && store) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, store, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 48,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#5959FF",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>T</span>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
          TXME Store Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>
          가맹점 계정으로 로그인해주세요
        </p>

        {isLoading ? (
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>로딩 중...</p>
        ) : isAuthenticated && !store ? (
          <div>
            <p style={{ fontSize: 14, color: "#EF4444", marginBottom: 16 }}>
              가맹점으로 등록되지 않은 계정입니다.
            </p>
            <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 24 }}>
              앱에서 가맹점 등록을 먼저 진행해주세요.
            </p>
            <button
              onClick={login}
              style={{
                width: "100%",
                padding: "12px 24px",
                backgroundColor: "#F3F4F6",
                color: "#374151",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              다른 계정으로 로그인
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "14px 24px",
              backgroundColor: "#5959FF",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
