"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  ShoppingBag,
  Heart,
  Megaphone,
  Store,
  Shield,
  Bell,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "대시보드", href: "/", icon: LayoutDashboard, enabled: true },
  { label: "결제/정산", href: "/payments", icon: Receipt, enabled: true },
  { label: "지갑", href: "/wallet", icon: Wallet, enabled: true },
  { divider: true },
  { label: "상품 관리", href: "/products", icon: ShoppingBag, enabled: false },
  { label: "고객 관리", href: "/customers", icon: Heart, enabled: false },
  { label: "마케팅", href: "/marketing", icon: Megaphone, enabled: false },
  { divider: true },
  { label: "마켓", href: "/market", icon: Store, enabled: false },
  { label: "관리자", href: "/admin", icon: Shield, enabled: false },
  { label: "알림", href: "/notifications", icon: Bell, enabled: false },
  { label: "개발자 도구", href: "/developer", icon: Settings, enabled: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: 240,
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#5959FF",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
            T
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "8px 12px", overflowY: "auto" }}>
        {menuItems.map((item, index) => {
          if ("divider" in item && item.divider) {
            return (
              <div
                key={`divider-${index}`}
                style={{
                  margin: "8px 0",
                  borderTop: "1px solid #E5E7EB",
                }}
              />
            );
          }

          const menuItem = item as {
            label: string;
            href: string;
            icon: React.ComponentType<{ size?: number }>;
            enabled: boolean;
          };

          const isActive = pathname === menuItem.href;
          const Icon = menuItem.icon;

          if (!menuItem.enabled) {
            return (
              <div
                key={menuItem.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  color: "#9CA3AF",
                  cursor: "not-allowed",
                  opacity: 0.5,
                  fontSize: 14,
                }}
              >
                <Icon size={20} />
                <span>{menuItem.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={menuItem.href}
              href={menuItem.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                backgroundColor: isActive ? "#5959FF" : "transparent",
                color: isActive ? "#FFFFFF" : "#6B7280",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <Icon size={20} />
              <span>{menuItem.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}