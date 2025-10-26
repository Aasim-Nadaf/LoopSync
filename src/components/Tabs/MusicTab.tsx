import { SectionHeader } from "@/components/Header/SectionHeader";
import MusicCards from "@/components/MusicCards";
import getSongs from "../actions/getSongs";
import MusicCardsSmall from "../MusicCardsSmall";

export const revalidate = 0;

export const MusicTab = async () => {
  const songs = await getSongs();
  return (
    <div className="flex flex-1 flex-col">
      <SectionHeader
        title="Listen Now"
        description="Top picks for you. Updated daily"
        showSeparator
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-4">
          <MusicCards song={songs} />
        </div>
      </div>

      <SectionHeader
        title="Listen Now"
        description="Top picks for you. Updated daily"
        showSeparator
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-4">
          <MusicCardsSmall song={songs} />
        </div>
      </div>
    </div>
  );
};
