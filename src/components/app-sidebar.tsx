"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Album,
  Grid,
  ListMusic,
  Music,
  PenLine,
  PlayCircle,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Discover",
      url: "#",
      items: [
        {
          title: "Listen Now",
          url: "/",
          icon: PlayCircle,
        },
        {
          title: "Search",
          url: "/search",
          icon: Search,
        },
      ],
    },
    {
      title: "Library",
      url: "#",
      items: [
        {
          title: "Playlists",
          url: "#",
          icon: ListMusic,
        },
        {
          title: "Songs",
          url: "#",
          icon: Music,
        },
        {
          title: "Made for You",
          url: "#",
          icon: User,
        },
        {
          title: "Artists",
          url: "#",
          icon: PenLine,
        },
        {
          title: "Albums",
          url: "#",
          icon: Album,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={"/logo-black.svg"}
                    alt="logo-black"
                    className="dark:invert"
                    height={30}
                    width={30}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-2xl">
                    LoopSync
                  </span>
                  {/* <span className="truncate text-[12.5px]">Feel the Pulse</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-lg text-balance font-semibold text-primary my-2">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === subItem.url}
                      tooltip={subItem.title}
                    >
                      <Link href={subItem.url}>
                        <subItem.icon />
                        {subItem.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
