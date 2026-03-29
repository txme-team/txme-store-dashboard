"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { userEmail, store, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        height: 64,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Store name */}
      <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
        {store?.store_name || ""}
      </span>

      {/* User menu */}
      <div ref={menuRef} style={{ position: "relative" }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "#6B7280",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span>{userEmail || ""}</span>
          <ChevronDown size={16} />
        </button>

        {showMenu && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 40,
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              minWidth: 160,
              zIndex: 100,
            }}
          >
            <button
              onClick={() => { setShowMenu(false); logout(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "10px 16px",
                fontSize: 14,
                color: "#EF4444",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <LogOut size={16} />
              <span>로그아웃</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
