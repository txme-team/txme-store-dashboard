import { supabase } from "./supabase";
import type { Store, Order, DashboardSummary } from "@/types/database";

// 스토어 조회 (나중에 인증된 사용자의 스토어만 가져오게 변경)
export async function getStore(): Promise<Store | null> {
  const { data, error } = await supabase
    .from("store")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Failed to fetch store:", error.message);
    return null;
  }
  return data;
}

// 주문 목록 조회
export async function getOrders(storeId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch orders:", error.message);
    return [];
  }
  return data || [];
}

// 대시보드 요약 계산
export function calculateSummary(orders: Order[]): DashboardSummary {
  const paidOrders = orders.filter((o) => o.status === "PAID");
  const refundedOrders = orders.filter((o) => o.status === "REFUNDED");

  const totalSales = paidOrders.reduce((sum, o) => sum + Number(o.amount), 0);
  const totalRefunds = refundedOrders.reduce((sum, o) => sum + Number(o.amount), 0);
  const totalFees = paidOrders.reduce((sum, o) => sum + Number(o.fee_amount), 0);
  const totalSettlement = paidOrders.reduce((sum, o) => sum + Number(o.net_amount), 0);

  return {
    totalSales,
    totalRefunds,
    totalFees,
    totalSettlement,
    salesCount: paidOrders.length,
    refundCount: refundedOrders.length,
    settlementCount: paidOrders.length,
  };
}