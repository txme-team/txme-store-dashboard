"use client";

import { useStore } from "@/hooks/useStore";

export default function WalletPage() {
  const { store, summary, loading } = useStore();

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF" }}>
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>지갑</h1>

      {/* Total Balance */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: 24,
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 14, color: "#5959FF", fontWeight: 500, marginBottom: 8 }}>
          총 정산 금액
        </p>
        <p style={{ fontSize: 32, fontWeight: 700, color: "#5959FF" }}>
          {summary.totalSettlement.toFixed(2)} USDC
        </p>
        <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
          {summary.salesCount}건 결제 완료
        </p>
      </div>

      {/* Wallet Info */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: 24,
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 16 }}>
          지갑 정보
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <span style={{ fontSize: 14, color: "#6B7280" }}>수령 지갑 주소</span>
            <span style={{ fontSize: 13, fontFamily: "monospace", color: "#374151" }}>
              {store?.wallet_address
                ? `${store.wallet_address.slice(0, 8)}...${store.wallet_address.slice(-6)}`
                : "-"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <span style={{ fontSize: 14, color: "#6B7280" }}>네트워크</span>
            <span style={{ fontSize: 14, color: "#374151" }}>
              {store?.network === "POL_AMOY" ? "Polygon Amoy (Testnet)" : store?.network || "-"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span style={{ fontSize: 14, color: "#6B7280" }}>매장 상태</span>
            <span
              style={{
                fontSize: 13,
                padding: "2px 10px",
                borderRadius: 20,
                backgroundColor: store?.is_active ? "#DCFCE7" : "#FEE2E2",
                color: store?.is_active ? "#15803D" : "#B91C1C",
              }}
            >
              {store?.is_active ? "활성" : "비활성"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
