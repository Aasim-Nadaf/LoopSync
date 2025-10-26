"use client";
import { createClient } from "@/lib/supabase/client";
import { Song } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const supabase = createClient();
  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSongs();
  }, [id, supabase]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
