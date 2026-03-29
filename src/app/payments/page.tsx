"use client";

import { useStore } from "@/hooks/useStore";

const statusMap: Record<string, { label: string; bg: string; text: string }> = {
  PENDING: { label: "대기중", bg: "#FEF9C3", text: "#A16207" },
  COMPLETED: { label: "완료", bg: "#DCFCE7", text: "#15803D" },
  FAILED: { label: "실패", bg: "#FEE2E2", text: "#B91C1C" },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${h}:${min}`;
}

function shortenWallet(addr: string | null): string {
  if (!addr) return "-";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function PaymentsPage() {
  const { orders, loading } = useStore();

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF" }}>
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>실시간 결제 내역</h1>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              {["주문 ID", "고객 지갑", "금액", "수수료", "수령액", "상태", "일시"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#6B7280",
                    padding: "16px 24px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px 24px",
                    textAlign: "center",
                    fontSize: 14,
                    color: "#9CA3AF",
                  }}
                >
                  아직 결제 내역이 없습니다
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const status = statusMap[order.status] || statusMap.PENDING;
                return (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "1px solid #E5E7EB" }}
                  >
                    <td style={{ padding: "16px 24px", fontSize: 13, fontFamily: "monospace" }}>
                      {order.order_id}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ fontSize: 13, fontFamily: "monospace" }}>
                        {shortenWallet(order.payer_address)}
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: 14 }}>
                      {Number(order.amount).toFixed(2)} {order.token_type}
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: 14, color: "#EF4444" }}>
                      -{Number(order.fee_amount).toFixed(2)}
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500 }}>
                      {Number(order.net_amount).toFixed(2)} {order.token_type}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontWeight: 500,
                          backgroundColor: status.bg,
                          color: status.text,
                        }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontSize: 14,
                        color: "#6B7280",
                      }}
                    >
                      {formatDate(order.paid_at || order.created_at)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
