import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 기본 Supabase 클라이언트 (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 인증된 Supabase 클라이언트 생성 (JWT 토큰 포함)
export function createAuthenticatedClient(supabaseToken: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseToken}`,
      },
    },
  });
}
