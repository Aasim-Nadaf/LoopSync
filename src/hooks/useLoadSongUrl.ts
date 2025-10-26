import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Song } from "@/lib/types";

export const useLoadSong = (song: Song | undefined) => {
  const [url, setUrl] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    if (!song) {
      setUrl("");
      return;
    }

    const { data: songData } = supabase.storage
      .from("songs")
      .getPublicUrl(song.song_path);

    setUrl(songData.publicUrl);
  }, [song, supabase]);

  return url;
};

export default useLoadSong;
