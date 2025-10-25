import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MusicTab } from "@/components/Tabs/MusicTab";
import { PodcastsTab } from "@/components/Tabs/PodcastsTab";
import MusicPlayer from "@/components/MusicPlayer";
import AddMusicButton from "@/components/Tabs/AddMusicButton";
import Header from "@/components/Header/Header";

export default async function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Tabs defaultValue="music">
          <div className="flex p-4 items-center justify-between">
            <TabsList>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="live" disabled>
                Live
              </TabsTrigger>
            </TabsList>
            <AddMusicButton />
          </div>

          <TabsContent value="music">
            <MusicTab />
          </TabsContent>
          <TabsContent value="podcasts">
            <PodcastsTab />
          </TabsContent>
        </Tabs>
        <MusicPlayer />
      </SidebarInset>
    </SidebarProvider>
  );
}
