export type UserType = "PERSONAL" | "MERCHANT";

export interface Store {
  id: string;
  owner_member_uid: string;
  store_name: string;
  store_category: string | null;
  wallet_address: string;
  network: "POL_AMOY";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED";

export interface QrPaymentOrder {
  id: string;
  order_id: string;
  store_id: string;
  payer_address: string;
  merchant_address: string;
  amount: number;
  fee_amount: number;
  net_amount: number;
  token_type: "USDC";
  network: string;
  status: OrderStatus;
  tx_hash: string | null;
  contract_address: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardSummary {
  totalSales: number;
  totalFees: number;
  totalSettlement: number;
  salesCount: number;
}
