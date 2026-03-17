export interface Store {
  id: string;
  owner_member_uid: string; // 기존 member_info의 member_uid
  store_name: string;
  store_category: string | null; // 카페, 식당, 중고거래 등
  wallet_address: string; // 매장 수익 받을 지갑 주소
  network: "POL_AMOY"; // 일단 Polygon Amoy만
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "PENDING" // QR 생성됨, 결제 대기
  | "PAID" // 결제 완료 (온체인 확인)
  | "REFUND_REQUESTED" // 환불 요청
  | "REFUNDED" // 환불 완료
  | "CANCELLED"; // 취소

export interface Order {
  id: string;
  store_id: string;
  order_number: string; // O-456-7898 같은 표시용 번호
  customer_wallet: string | null; // 결제한 고객 지갑 주소
  product_name: string | null; // 상품명
  amount: number; // 결제 금액 (USDT/USDC)
  token_type: "USDT" | "USDC";
  fee_amount: number; // 수수료 금액
  net_amount: number; // 매장 수령 금액 (amount - fee)
  status: OrderStatus;
  tx_hash: string | null; // 블록체인 트랜잭션 해시
  paid_at: string | null;
  created_at: string;
}

export interface DashboardSummary {
  totalSales: number; // 총 매출
  totalRefunds: number; // 총 환불
  totalFees: number; // 총 수수료
  totalSettlement: number; // 총 정산 (매출 - 환불 - 수수료)
  salesCount: number; // 결제 건수
  refundCount: number; // 환불 건수
  settlementCount: number; // 정산 건수
}