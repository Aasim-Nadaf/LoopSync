import { createClient } from "@/lib/supabase/server";
import { Song } from "@/lib/types";
import { toast } from "sonner";

const getSongs = async (): Promise<Song[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    toast.error(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
