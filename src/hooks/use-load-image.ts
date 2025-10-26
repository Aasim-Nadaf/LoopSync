import { createClient } from "@/lib/supabase/client";
import { Song } from "@/lib/types";

const LoadImage = async (song: Song) => {
  const supabase = createClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default LoadImage;
