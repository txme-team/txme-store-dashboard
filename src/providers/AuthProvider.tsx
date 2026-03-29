"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { usePrivy, User as PrivyUser } from "@privy-io/react-auth";
import { supabase, createAuthenticatedClient } from "@/lib/supabase";
import type { Store } from "@/types/database";

interface AuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  privyUser: PrivyUser | null;
  userEmail: string | null;
  memberUid: string | null;
  store: Store | null;
  supabaseToken: string | null;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getPrivyEmail(privyUser: PrivyUser | null): string | null {
  if (!privyUser) return null;

  const emailAccount = privyUser.linked_accounts?.find(
    (account) => account.type === "email"
  ) as any;
  if (emailAccount?.address) return emailAccount.address;

  const googleAccount = privyUser.linked_accounts?.find(
    (account) => account.type === "google_oauth"
  ) as any;
  if (googleAccount?.email) return googleAccount.email;

  const appleAccount = privyUser.linked_accounts?.find(
    (account) => account.type === "apple_oauth"
  ) as any;
  if (appleAccount?.email) return appleAccount.email;

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: privyUser, ready: privyReady, login, logout: privyLogout, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(true);
  const [memberUid, setMemberUid] = useState<string | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [supabaseToken, setSupabaseToken] = useState<string | null>(null);

  const userEmail = useMemo(() => getPrivyEmail(privyUser ?? null), [privyUser]);

  // Privy 로그인 후 Supabase 토큰 교환 + member/store 조회
  useEffect(() => {
    const initAuth = async () => {
      if (!privyReady) return;

      if (!privyUser) {
        setMemberUid(null);
        setStore(null);
        setSupabaseToken(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // 1. Privy access token 가져오기
        const accessToken = await getAccessToken();
        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        // 2. Edge Function으로 Supabase JWT 교환
        const { data, error: fnError } = await supabase.functions.invoke("verify-privy", {
          body: { privyToken: accessToken },
        });

        if (fnError || !data?.supabaseToken) {
          console.error("Failed to exchange token:", fnError);
          setIsLoading(false);
          return;
        }

        setSupabaseToken(data.supabaseToken);

        // 3. 인증된 클라이언트로 member_info 조회
        const authClient = createAuthenticatedClient(data.supabaseToken);
        const email = getPrivyEmail(privyUser);

        if (!email) {
          setIsLoading(false);
          return;
        }

        const { data: memberData } = await authClient
          .from("member_info")
          .select("member_uid, user_type")
          .eq("email", email)
          .single();

        if (!memberData) {
          console.error("Member not found for email:", email);
          setIsLoading(false);
          return;
        }

        // 4. MERCHANT 유저인지 확인
        if (memberData.user_type !== "MERCHANT") {
          console.warn("User is not a merchant:", memberData.user_type);
          setMemberUid(memberData.member_uid);
          setIsLoading(false);
          return;
        }

        setMemberUid(memberData.member_uid);

        // 5. store 조회
        const { data: storeData } = await authClient
          .from("store")
          .select("*")
          .eq("owner_member_uid", memberData.member_uid)
          .eq("is_active", true)
          .limit(1)
          .single();

        setStore(storeData);
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [privyUser, privyReady, getAccessToken]);

  const logout = useCallback(async () => {
    await privyLogout();
    setMemberUid(null);
    setStore(null);
    setSupabaseToken(null);
  }, [privyLogout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated: !!privyUser && !!memberUid,
      privyUser: privyUser ?? null,
      userEmail,
      memberUid,
      store,
      supabaseToken,
      login,
      logout,
    }),
    [isLoading, privyUser, userEmail, memberUid, store, supabaseToken, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
