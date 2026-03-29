import { supabase } from "./supabase";
import type { Store, QrPaymentOrder, DashboardSummary } from "@/types/database";

// 스토어 조회 (인증된 사용자의 스토어)
export async function getStore(ownerMemberUid: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from("store")
    .select("*")
    .eq("owner_member_uid", ownerMemberUid)
    .limit(1)
    .single();

  if (error) {
    console.error("Failed to fetch store:", error.message);
    return null;
  }
  return data;
}

// QR 결제 주문 목록 조회
export async function getOrders(storeId: string): Promise<QrPaymentOrder[]> {
  const { data, error } = await supabase
    .from("qr_payment_order")
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
export function calculateSummary(orders: QrPaymentOrder[]): DashboardSummary {
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");

  const totalSales = completedOrders.reduce((sum, o) => sum + Number(o.amount), 0);
  const totalFees = completedOrders.reduce((sum, o) => sum + Number(o.fee_amount), 0);
  const totalSettlement = completedOrders.reduce((sum, o) => sum + Number(o.net_amount), 0);

  return {
    totalSales,
    totalFees,
    totalSettlement,
    salesCount: completedOrders.length,
  };
}
