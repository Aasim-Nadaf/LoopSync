"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import usePlayer from "@/hooks/userPlayer";
import useGetSongById from "@/lib/useGetSongById";
import useLoadSong from "@/hooks/useLoadSongUrl";
import { createClient } from "@/lib/supabase/client";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef(null);

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSong(song!);

  // ✅ Load the song image
  useEffect(() => {
    if (!song) {
      setImageUrl("");
      return;
    }

    const loadImage = async () => {
      const supabase = createClient();
      const { data: imageData } = supabase.storage
        .from("images")
        .getPublicUrl(song.image_path);
      setImageUrl(imageData.publicUrl);
    };

    loadImage();
  }, [song]);

  // ✅ Auto-play when song URL is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !songUrl) return;

    // Reset state when new song loads
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    audio.src = songUrl;
    audio.load(); // Important: Load the audio to get metadata

    // Wait for metadata to load before playing
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      audio.play().catch((error) => {
        console.log("Auto-play prevented:", error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [songUrl]);

  // ✅ Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Play prevented:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // ✅ Now the early return comes AFTER all hooks
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat]);

  // ✅ Early return after ALL hooks have been called
  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: any[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: any[]) => {
    const newVolume = value[0];
    const audio = audioRef.current;
    if (!audio) return;
    setVolume(newVolume);
    audio.volume = newVolume / 100;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume / 100;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 px-2 sm:px-4 py-2 sm:py-3">
      <audio ref={audioRef} />

      <div className="max-w-screen-2xl mx-auto">
        {/* Mobile Layout (< 768px) */}
        <div className="md:hidden">
          {/* Top Row: Track Info */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={imageUrl || "/music-1.jpg"}
              alt={song.title}
              className="w-12 h-12 rounded-md object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-foreground truncate">
                {song.title}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {song.author}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-green-500 text-green-500" : ""
                }`}
              />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              ref={progressBarRef}
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-1 cursor-pointer"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isShuffle ? "text-green-500" : "text-muted-foreground"
              } hover:text-foreground`}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={skipBackward}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="default"
                size="icon"
                className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={skipForward}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isRepeat ? "text-green-500" : "text-muted-foreground"
              } hover:text-foreground`}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tablet & Desktop Layout (>= 768px) */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 lg:gap-4 w-1/4 min-w-0">
            <img
              src={imageUrl || "/music-1.jpg"}
              alt={song.title}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-md object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-foreground truncate">
                {song.title}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {song.author}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-green-500 text-green-500" : ""
                }`}
              />
            </Button>
          </div>

          {/* Center: Player Controls */}
          <div className="flex flex-col items-center gap-2 w-2/4 max-w-2xl">
            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  isShuffle ? "text-green-500" : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={skipBackward}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="default"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={skipForward}
              >
                <SkipForward className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  isRepeat ? "text-green-500" : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <Repeat className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                ref={progressBarRef}
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleProgressChange}
                className="flex-1 cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Volume Controls */}
          <div className="flex items-center justify-end gap-2 w-1/4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={toggleMute}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20 lg:w-24 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
