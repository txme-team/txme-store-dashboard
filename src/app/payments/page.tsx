export default function PaymentsPage() {
  const orders = [
    { id: "O-456-7898", customer: "kiwi_lover", email: "ki*****@gmail.com", product: "흰색 캐주얼 스니커즈", productId: "P-123-4575", amount: "60.00 USDT", status: "입금중", statusBg: "#FEF9C3", statusText: "#A16207", date: "25-09-23 14:30" },
    { id: "O-456-7897", customer: "honeydew_hustler", email: "ho*****@live.com", product: "검은색 가죽 장갑", productId: "P-123-4574", amount: "40.00 USDT", status: "입금중", statusBg: "#FEF9C3", statusText: "#A16207", date: "25-08-22 12:15" },
    { id: "O-456-7896", customer: "grape_guru", email: "gr*****@hotmail.com", product: "주황색 여름 모자", productId: "P-123-4573", amount: "22.10 USDT", status: "환불요청", statusBg: "#FEE2E2", statusText: "#B91C1C", date: "25-07-21 10:00" },
    { id: "O-456-7895", customer: "fig_fanatic", email: "fi*****@yahoo.com", product: "보라색 운동복 세트", productId: "P-123-4572", amount: "55.25 USDT", status: "입금완료", statusBg: "#DCFCE7", statusText: "#15803D", date: "25-06-20 17:45" },
    { id: "O-456-7894", customer: "elderberry_expert", email: "el*****@gmail.com", product: "초록색 하이커 자켓", productId: "P-123-4571", amount: "70.99 USDT", status: "입금완료", statusBg: "#DCFCE7", statusText: "#15803D", date: "25-05-19 15:30" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>실시간 결제 내역</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ fontSize: 14, border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 16px", background: "#fff", cursor: "pointer" }}>검색</button>
          <button style={{ backgroundColor: "#5959FF", color: "#fff", fontSize: 14, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer" }}>csv 다운로드</button>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              {["주문 ID", "고객", "상품", "금액", "상태", "일시"].map((h) => (
                <th key={h} style={{ textAlign: "left", fontSize: 14, fontWeight: 500, color: "#6B7280", padding: "16px 24px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td style={{ padding: "16px 24px", fontSize: 14 }}>{order.id}</td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{order.customer}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{order.email}</div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ fontSize: 14 }}>{order.product}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{order.productId}</div>
                </td>
                <td style={{ padding: "16px 24px", fontSize: 14 }}>{order.amount}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, fontWeight: 500, backgroundColor: order.statusBg, color: order.statusText }}>{order.status}</span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: 14, color: "#6B7280" }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}