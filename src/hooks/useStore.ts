"use client";

import { useState, useEffect } from "react";
import { getOrders, calculateSummary } from "@/lib/services";
import { createAuthenticatedClient } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import type { QrPaymentOrder, DashboardSummary } from "@/types/database";

export function useStore() {
  const { store, supabaseToken } = useAuth();
  const [orders, setOrders] = useState<QrPaymentOrder[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalSales: 0,
    totalFees: 0,
    totalSettlement: 0,
    salesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!store || !supabaseToken) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const authClient = createAuthenticatedClient(supabaseToken);
      const { data, error } = await authClient
        .from("qr_payment_order")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch orders:", error.message);
        setOrders([]);
      } else {
        const ordersData = data || [];
        setOrders(ordersData);
        setSummary(calculateSummary(ordersData));
      }

      setLoading(false);
    }

    fetchData();
  }, [store, supabaseToken]);

  return { store, orders, summary, loading };
}
