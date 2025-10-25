import { SectionHeader } from "@/components/Header/SectionHeader";

export const PodcastsTab = () => {
  return (
    <div className="flex flex-1 flex-col">
      <SectionHeader
        title="Podcasts"
        description="Your favorite podcasts and episodes"
        showSeparator
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-4">
          {/* Add your podcast cards here */}
          <p className="text-muted-foreground">Podcasts coming soon...</p>
        </div>
      </div>
    </div>
  );
};
