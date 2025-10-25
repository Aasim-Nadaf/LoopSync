import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  Radio,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "https://github.com/evilrabbit.png",
};

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Discover",
      url: "#",
      items: [
        {
          title: "Listen Now",
          url: "#",
          icon: PlayCircle,
          isActive: true,
        },
        {
          title: "Browse",
          url: "#",
          icon: Grid,
        },
        {
          title: "Radio",
          url: "#",
          icon: Radio,
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
    // {
    //   title: "Playlists",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Recently Added",
    //       url: "#",
    //       icon: ListMusic,
    //     },
    //     {
    //       title: "Recently Played",
    //       url: "#",
    //       icon: ListMusic,
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={"logo-black.svg"}
                    alt="logo-black"
                    className="dark:invert"
                    height={30}
                    width={30}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ">
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
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <a href={item.url}>
                        <item.icon className="" />
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>{/* <UserButton showUserInfo /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
