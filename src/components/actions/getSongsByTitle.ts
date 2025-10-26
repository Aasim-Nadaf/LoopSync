import getSongs from "@/components/actions/getSongs";
import { createClient } from "../../lib/supabase/server";
import { Song } from "../../lib/types";
import { toast } from "sonner";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = await createClient();

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    toast.error(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
