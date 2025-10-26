"use client";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Song } from "@/lib/types";
import LoadImage from "@/hooks/use-load-image";
import { useEffect, useState } from "react";
import useOnPlay from "./actions/useOnPlay";

interface MusicCardProps {
  data: Song;
  onClick: (id: string) => void;
}

const ListenNow = ({ data, onClick }: MusicCardProps) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await LoadImage(data);
      setImage(imageUrl);
    };
    fetchImage();
  }, [data]);

  return (
    <div
      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform duration-300"
      onClick={() => onClick(data.id)}
    >
      {/* Background Image */}
      <Image
        width={180}
        height={230}
        src={image || "/music-1.jpg"}
        alt={data.title}
        loading="eager"
        className="w-52 h-60 object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          {/* Title and Artist */}
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-semibold text-white truncate text-base mb-1">
              {data.title}
            </h3>
            <p className="text-sm text-zinc-300 truncate">{data.author}</p>
          </div>

          {/* Play Button */}
          <div
            className={`shrink-0 transition-all duration-300 translate-y-2 opacity-100 sm:opacity-0 group-hover:opacity-100 group-hover:translate-y-0`}
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-500 cursor-pointer hover:scale-105 shadow-xl transition-all"
            >
              <Play className="h-5 w-5 text-muted fill-muted ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  song: Song[];
}

const MusicCardsSmall = ({ song }: CardProps) => {
  const onPlay = useOnPlay(song);

  if (song.length === 0) {
    return <p>NO Songs available</p>;
  }

  // const handlePlay = (id: string) => {
  //   console.log(`Playing song with ID: ${id}`);
  //   // Add your play logic here
  // };

  return (
    <>
      {song.map((track) => (
        <ListenNow
          key={track.id}
          onClick={(id: string) => onPlay(id)}
          data={track}
        />
      ))}
    </>
  );
};

export default MusicCardsSmall;
