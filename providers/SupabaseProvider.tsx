"use client";

import React, { createContext, useContext, useState } from "react";
import { Database } from "../types_db";
import { createBrowserClient } from "@supabase/ssr";

type SupabaseContextType = ReturnType<typeof createBrowserClient<Database>>;

const SupabaseContext = createContext<SupabaseContextType | null>(null);

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {
  // createBrowserClient automatically handles auth persistence
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
    )
  );

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context)
    throw new Error("useSupabase must be used within SupabaseProvider");
  return context;
};

export default SupabaseProvider;
