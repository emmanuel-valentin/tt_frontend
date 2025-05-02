import { useState, useEffect, RefObject } from "react";

export function useVideoPlayer(
  videoRef: RefObject<HTMLVideoElement>,
  containerRef?: RefObject<HTMLDivElement>
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => {
      // Only update if duration is a valid, finite number
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      } else {
        // Reset or set to 0 if duration is not valid yet
        // This prevents displaying Infinity or NaN
        setDuration(0);
      }
    };

    // Initialize video properties when metadata is loaded
    video.addEventListener("loadedmetadata", updateDuration);
    // Update duration if it changes (e.g., for streams or blobs)
    video.addEventListener("durationchange", updateDuration);

    // Initial check in case the events fired before listeners were attached
    updateDuration();

    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
    };
    // Re-run effect if the video element itself changes (though less common with refs)
    // Or if the src changes implicitly causing metadata reload
  }, [videoRef]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsMuted(!isMuted);
    video.muted = !isMuted;
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(value);
    video.volume = value;
    setIsMuted(value === 0);
    video.muted = value === 0;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
    setCurrentTime(video.currentTime);
  };

  const handleVideoProgress = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (video.duration / 100) * value;
    video.currentTime = newTime;
    setProgress(value);
  };

  const handleForward = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = video.currentTime + seconds;
  };

  const handleRewind = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = video.currentTime - seconds;
  };

  const formatTime = (time: number) => {
    // Prevent NaN display if time is not a valid number
    if (isNaN(time) || !isFinite(time)) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef?.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return {
    isPlaying,
    progress,
    isMuted,
    volume,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleTimeUpdate,
    handleVideoProgress,
    handleForward,
    handleRewind,
    formatTime,
    toggleFullscreen,
  };
}
