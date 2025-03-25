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

    const setVideoDuration = () => {
      setDuration(video.duration);
    };

    // Initialize video properties when metadata is loaded
    video.addEventListener("loadedmetadata", setVideoDuration);

    return () => {
      video.removeEventListener("loadedmetadata", setVideoDuration);
    };
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

  // Added formatTime function
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Added toggleFullscreen function
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
