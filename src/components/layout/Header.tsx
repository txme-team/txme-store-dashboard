"use client";

import { ChevronDown } from "lucide-react";

export default function Header() {
  const userEmail = "hello@txme.me";

  return (
    <header
      style={{
        height: 64,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 24px",
      }}
    >
      <button
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
        <span>{userEmail}</span>
        <ChevronDown size={16} />
      </button>
    </header>
  );
}