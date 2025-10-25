import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MusicCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  onClick: () => void;
}

const ListenNow = ({ title, artist, coverUrl }: MusicCardProps) => {
  return (
    <div className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform duration-300">
      {/* Background Image */}
      <Image
        width={180}
        height={230}
        src={coverUrl}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          {/* Title and Artist */}
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-semibold text-white truncate text-base mb-1">
              {title}
            </h3>
            <p className="text-sm text-zinc-300 truncate">{artist}</p>
          </div>

          {/* Play Button */}
          <div
            className={`shrink-0 transition-all duration-300 translate-y-2 opacity-100 sm:opacity-0 group-hover:opacity-100 group-hover:translate-y-0`}
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-500 hover:scale-105 shadow-xl transition-all"
            >
              <Play className="h-5 w-5 text-muted fill-muted ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component showing the cards in a grid
const MusicCards = () => {
  const tracks = [
    {
      id: 1,
      title: "React Rendezvous",
      artist: "Ethan Byte",
      coverUrl: "/music-1.jpg",
    },
    {
      id: 2,
      title: "Async Awakenings",
      artist: "Nina Netcode",
      coverUrl: "/music-2.jpg",
    },
    {
      id: 3,
      title: "The Art of Reusability",
      artist: "Lena Logic",
      coverUrl: "/music-3.jpg",
    },
    {
      id: 4,
      title: "Stateful Symphony",
      artist: "Beth Binary",
      coverUrl: "/music-1.jpg",
    },
  ];

  return (
    <>
      {tracks.map((track) => (
        <ListenNow
          key={track.id}
          title={track.title}
          artist={track.artist}
          coverUrl={track.coverUrl}
          onClick={() => console.log(`Playing ${track.title}`)}
        />
      ))}
    </>
  );
};

export default MusicCards;
