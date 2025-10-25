"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createContext, useContext, useEffect, useState } from "react";
import { Subscription, UserDetails } from "@/lib/types";
import type { User, Session } from "@supabase/supabase-js";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

// Create a browser Supabase client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
);

export const MyUserContextProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current session and user
  useEffect(() => {
    const getSessionAndUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    getSessionAndUser();
  }, []);

  // Fetch user details and subscription when user changes
  useEffect(() => {
    const getUserDetails = async () => {
      if (user) {
        setIsLoading(true);
        const [{ data: userData }, { data: subData }] = await Promise.all([
          supabase.from("users").select("*").single(),
          supabase
            .from("subscriptions")
            .select("*, prices(*, products(*))")
            .in("status", ["trailing", "active"])
            .single(),
        ]);

        setUserDetails(userData as UserDetails);
        setSubscription(subData as Subscription);
        setIsLoading(false);
      } else {
        setUserDetails(null);
        setSubscription(null);
      }
    };
    getUserDetails();
  }, [user]);

  const value: UserContextType = {
    accessToken: session?.access_token ?? null,
    user,
    userDetails,
    isLoading,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUser must be used within a MyUserContextProvider");
  return context;
};
