"use client";

import { useStore } from "@/hooks/useStore";

export default function DashboardPage() {
  const { summary, orders, loading } = useStore();

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF" }}>
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        대시보드
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h2
          style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 16 }}
        >
          매출 요약
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 매출</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              {summary.totalSales.toFixed(2)} USDC
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
              {summary.salesCount}건
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 수수료</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4, color: "#EF4444" }}>
              -{summary.totalFees.toFixed(2)} USDC
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 정산</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4, color: "#10B981" }}>
              {summary.totalSettlement.toFixed(2)} USDC
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
              {summary.salesCount}건
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: 24,
        }}
      >
        <h2
          style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 16 }}
        >
          최근 거래
        </h2>
        {orders.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#9CA3AF",
              fontSize: 14,
            }}
          >
            아직 거래 내역이 없습니다
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontFamily: "monospace", color: "#374151" }}>
                    {order.order_id}
                  </p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                    {new Date(order.paid_at || order.created_at).toLocaleString("ko-KR")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
                    {Number(order.amount).toFixed(2)} USDC
                  </p>
                  <p style={{ fontSize: 12, color: "#10B981" }}>
                    수령 {Number(order.net_amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
