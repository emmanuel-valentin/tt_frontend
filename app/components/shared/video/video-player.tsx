/* eslint-disable jsx-a11y/media-has-caption */
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";
import { useVideoPlayer } from "~/hooks/use-video-player";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Rewind,
  FastForward,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    isPlaying,
    progress,
    isMuted,
    volume,
    duration,
    currentTime,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleTimeUpdate,
    handleVideoProgress,
    handleForward,
    handleRewind,
    formatTime,
    toggleFullscreen,
  } = useVideoPlayer(videoRef, containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-video bg-black rounded-md overflow-hidden group",
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Overlay for play/pause on click */}
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 hidden md:flex md:items-center md:justify-center md:cursor-pointer"
        onClick={togglePlay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            togglePlay();
          }
        }}
      >
        {!isPlaying && (
          <div className="bg-black/30 rounded-full p-4 transition-opacity opacity-0 group-hover:opacity-100">
            <Play className="h-4 w-4 md:h-10 md:w-10 text-white" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity opacity-0 group-hover:opacity-100">
        <div className="flex flex-col gap-2">
          {/* Progress bar */}
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleVideoProgress(value[0])}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              {/* Rewind */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRewind(10)}
                className="hidden sm:block text-white hover:bg-white/20 hover:text-white"
              >
                <Rewind className="h-5 w-5" />
              </Button>

              {/* Fast Forward */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleForward(10)}
                className="hidden sm:block text-white hover:bg-white/20 hover:text-white"
              >
                <FastForward className="h-5 w-5" />
              </Button>

              {/* Volume control - inline with slider always visible */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => handleVolumeChange(value[0])}
                  className="w-16 cursor-pointer"
                />
              </div>

              {/* Time - positioned after volume control */}
              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
