"use client";

import { useState, useEffect } from "react";
import { getStore, getOrders, calculateSummary } from "@/lib/services";
import type { Store, Order, DashboardSummary } from "@/types/database";

export function useStore() {
  const [store, setStore] = useState<Store | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalSales: 0,
    totalRefunds: 0,
    totalFees: 0,
    totalSettlement: 0,
    salesCount: 0,
    refundCount: 0,
    settlementCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const storeData = await getStore();
      setStore(storeData);

      if (storeData) {
        const ordersData = await getOrders(storeData.id);
        setOrders(ordersData);
        setSummary(calculateSummary(ordersData));
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return { store, orders, summary, loading };
}