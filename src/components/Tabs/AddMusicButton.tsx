"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { File, Image, Music2Icon, PlusCircle, User } from "lucide-react";
import { Label } from "../ui/label";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMusicButton() {
  const { user } = useUser();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      image: null,
      song: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      // Upload song file
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`${values.title}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        toast.error("Failed to upload song.");
        return;
      }

      // Upload image file
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${Date.now()}-${values.title}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        toast.error("Failed to upload image.");
        return;
      }

      // Insert song record
      const { error } = await supabase.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.artist,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Song created!");
      reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add Music
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Music</DialogTitle>
            <DialogDescription>
              Add your favorite songs to your library.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <InputGroup className="mb-2">
                <InputGroupInput
                  placeholder="Title of Song"
                  id="title"
                  disabled={isLoading}
                  {...register("title", { required: true })}
                />
                <InputGroupAddon>
                  <Music2Icon />
                </InputGroupAddon>
              </InputGroup>

              <Label htmlFor="artist">Artist</Label>
              <InputGroup className="mb-2">
                <InputGroupInput
                  placeholder="Artist of Song"
                  id="artist"
                  disabled={isLoading}
                  {...register("artist", { required: true })}
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>

              <Label htmlFor="image">Upload your Image</Label>
              <InputGroup className="mb-2">
                <InputGroupInput
                  type="file"
                  id="image"
                  accept="image/*"
                  disabled={isLoading}
                  {...register("image", { required: true })}
                />
                <InputGroupAddon>
                  <Image />
                </InputGroupAddon>
              </InputGroup>

              <Label htmlFor="song">Upload your File (.mp3)</Label>
              <InputGroup className="mb-2">
                <InputGroupInput
                  type="file"
                  accept=".mp3"
                  id="song"
                  disabled={isLoading}
                  {...register("song", { required: true })}
                />
                <InputGroupAddon>
                  <File />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isLoading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Add Music"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
