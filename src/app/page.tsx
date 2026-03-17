export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        대시보드
      </h1>

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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 매출</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              $45,678.90
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
              156건
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 환불</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              $149.95
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>5건</p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 수수료</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              $1,234.56
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>총 정산</p>
            <p style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              $44,294.39
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
              151건
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#6B7280" }}>
            기간 별 상세 내역
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <select
              style={{
                fontSize: 14,
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                padding: "8px 12px",
              }}
            >
              <option>일별</option>
              <option>주별</option>
              <option>월별</option>
            </select>
            <button
              style={{
                backgroundColor: "#5959FF",
                color: "#fff",
                fontSize: 14,
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              csv 다운로드
            </button>
          </div>
        </div>
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9CA3AF",
          }}
        >
          차트 영역
        </div>
      </div>
    </div>
  );
}