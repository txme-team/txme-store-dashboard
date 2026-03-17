export default function WalletPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>지갑</h1>

      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 24, marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "#5959FF", fontWeight: 500, textDecoration: "underline", marginBottom: 8 }}>총 잔액</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 32, fontWeight: 700, color: "#5959FF" }}>$45,678.90</p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>17,400,000원</p>
          </div>
          <button style={{ backgroundColor: "#5959FF", color: "#fff", fontSize: 14, padding: "12px 24px", borderRadius: 8, border: "none", cursor: "pointer" }}>거래소로 출금</button>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 16 }}>자산 별 잔액</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 14, color: "#6B7280" }}>Tether USD (Tether)</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <p style={{ fontSize: 24, fontWeight: 700 }}>4,567 USDT</p>
              <span style={{ fontSize: 12, border: "1px solid #E5E7EB", borderRadius: 4, padding: "2px 8px", color: "#6B7280" }}>출금</span>
            </div>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>7,400,000원</p>
          </div>
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 14, color: "#6B7280" }}>USD Coin (Circle)</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <p style={{ fontSize: 24, fontWeight: 700 }}>8,808 USDC</p>
              <span style={{ fontSize: 12, border: "1px solid #E5E7EB", borderRadius: 4, padding: "2px 8px", color: "#6B7280" }}>출금</span>
            </div>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>10,000,000원</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 16 }}>지갑 정보</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 14, color: "#6B7280" }}>이더리움/폴리곤/베이스 주소</span>
            <span style={{ fontSize: 14, fontFamily: "monospace" }}>0×17EF35....A8fa9</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 14, color: "#6B7280" }}>자동 백업</span>
            <span style={{ fontSize: 14 }}>완료 (Google Drive, 26-03-14)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 14, color: "#6B7280" }}>수동 백업</span>
            <span style={{ fontSize: 14 }}>완료 (26-03-16)</span>
          </div>
        </div>
      </div>
    </div>
  );
}