import { SectionHeader } from "@/components/Header/SectionHeader";
import MusicCards from "@/components/MusicCards";

export const MusicTab = () => {
  return (
    <div className="flex flex-1 flex-col">
      <SectionHeader
        title="Listen Now"
        description="Top picks for you. Updated daily"
        showSeparator
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-4">
          <MusicCards />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
      </div>

      <SectionHeader
        title="Made for You"
        description="Your personal playlist. Updated daily"
      />
    </div>
  );
};
