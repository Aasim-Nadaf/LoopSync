import getSongsByTitle from "@/components/actions/getSongsByTitle";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header/Header";
import { SectionHeader } from "@/components/Header/SectionHeader";
import MusicCards from "@/components/MusicCards";
import MusicPlayer from "@/components/MusicPlayer";
import SearchInput from "@/components/SearchInput";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ArrowRightCircle } from "lucide-react";

interface SearchProps {
  searchParams: Promise<{
    title: string;
  }>;
}

export default async function Browse({ searchParams }: SearchProps) {
  const { title } = await searchParams;
  const songs = await getSongsByTitle(title);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="mt-4">
          <SectionHeader
            title="Search"
            description="Search millions of songs, explore emerging artists, and find the perfect vibe for every moment."
            showSeparator
          />
          <SearchInput />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-3 text-accent-foreground text-2xl font-semibold">
            Latest Songs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-4">
            <MusicCards song={songs} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
