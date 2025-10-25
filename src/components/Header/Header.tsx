"use client";

import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { createClient } from "@/lib/supabase/client";
import { User, Settings, Eye, Keyboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import type { User as SupabaseUser } from "@supabase/supabase-js";
import { ModeToggle } from "../theme-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Log out SuccessFully");
    router.push("/auth/login");
  };

  // Get user initials for avatar fallback
  const getInitials = (email: string | undefined) => {
    if (!email) return <User size={20} />;
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6">
      <SidebarTrigger className="-ml-1" />

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg hover:bg-accent p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <Avatar className="h-9 w-9 border-2 border-primary/10">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/5 text-sm font-semibold">
                  {loading ? "..." : getInitials(user?.email)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            {user ? (
              <>
                <div className="flex items-start gap-3 p-3">
                  <Avatar className="h-9 w-9 border-2 border-primary/10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/5">
                      {getInitials(user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-none truncate mt-0.5">
                      {user.user_metadata?.full_name ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Account preferences</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/features"
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Feature previews</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/shortcuts"
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                  >
                    <Keyboard className="h-4 w-4" />
                    <span>Command menu</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Theme
                </DropdownMenuLabel>

                <ModeToggle />

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex items-center gap-3 cursor-pointer py-2.5"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuLabel className="py-3">Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/sign-up"
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                    prefetch
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
                      <path d="M15 9h.01" />
                    </svg>
                    Sign Up
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                    prefetch
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                      <path d="M3 12h13l-3 -3" />
                      <path d="M13 15l3 -3" />
                    </svg>
                    Login
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <ModeToggle />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
