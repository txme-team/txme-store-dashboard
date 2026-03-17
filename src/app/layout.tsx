import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "TXME Store Dashboard",
  description: "TXME 오프라인 결제 매장 관리 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Sidebar />
        <div style={{ marginLeft: 240, minHeight: "100vh" }}>
          <Header />
          <main style={{ padding: 24 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}