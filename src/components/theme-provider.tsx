"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem
        value="dark"
        className="flex items-center gap-3 py-2.5"
      >
        <Moon className="h-4 w-4" />
        <span>Dark</span>
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        value="light"
        className="flex items-center gap-3 py-2.5"
      >
        <Sun className="h-4 w-4" />
        <span>Light</span>
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        value="system"
        className="flex items-center gap-3 py-2.5"
      >
        <Monitor className="h-4 w-4" />
        <span>System</span>
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
