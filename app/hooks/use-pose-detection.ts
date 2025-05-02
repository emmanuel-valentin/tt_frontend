import { useRef, useState, useEffect } from "react";
import { PoseDetectionUtil } from "~/lib/mediapipe";

interface UsePoseDetectionOptions {
  enabled?: boolean;
  autoStart?: boolean;
}

interface UsePoseDetectionReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDetecting: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  poseDetectionEnabled: boolean;
  setPoseDetectionEnabled: (
    enabled: boolean | ((prev: boolean) => boolean)
  ) => void;
}

export function usePoseDetection({
  enabled = true,
  autoStart = true,
}: UsePoseDetectionOptions = {}): UsePoseDetectionReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseDetectionRef = useRef<PoseDetectionUtil | null>(null);
  const [poseDetectionEnabled, setPoseDetectionEnabled] = useState(enabled);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize pose detection
  useEffect(() => {
    let poseDetection: PoseDetectionUtil | null = null;

    const initializePoseDetection = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      setIsLoading(true);
      poseDetection = new PoseDetectionUtil();

      try {
        const initialized = await poseDetection.initialize(
          videoRef.current,
          canvasRef.current
        );

        if (initialized) {
          poseDetectionRef.current = poseDetection;
          setIsInitialized(true);
          console.log("Pose detection initialized successfully");
        } else {
          console.error("Failed to initialize pose detection");
        }
      } catch (error) {
        console.error("Error initializing pose detection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize pose detection when component mounts
    initializePoseDetection();

    // Cleanup on unmount
    return () => {
      if (poseDetection) {
        poseDetection.cleanup();
      }
    };
  }, []);

  // Process video when pose detection is toggled
  useEffect(() => {
    const videoElement = videoRef.current;
    const poseDetection = poseDetectionRef.current;

    if (!videoElement || !poseDetection || !isInitialized) return;

    const handleVideoPlay = () => {
      if (poseDetectionEnabled && poseDetection) {
        console.log("Starting pose detection on video");
        setIsDetecting(true);
      }
    };

    const handleVideoPause = () => {
      if (poseDetection) {
        console.log("Video paused");
        setIsDetecting(false);
      }
    };

    // Start or stop video processing based on poseDetectionEnabled
    if (poseDetectionEnabled) {
      console.log("Enabling pose detection");
      setIsDetecting(true);
      poseDetection.processVideo();
    } else {
      console.log("Disabling pose detection");
      setIsDetecting(false);
      poseDetection.stopVideoProcessing();
    }

    // Add event listeners for play/pause state changes
    videoElement.addEventListener("play", handleVideoPlay);
    videoElement.addEventListener("pause", handleVideoPause);
    videoElement.addEventListener("ended", handleVideoPause);

    // Clean up event listeners
    return () => {
      videoElement.removeEventListener("play", handleVideoPlay);
      videoElement.removeEventListener("pause", handleVideoPause);
      videoElement.removeEventListener("ended", handleVideoPause);

      if (poseDetection) {
        poseDetection.stopVideoProcessing();
      }
    };
  }, [poseDetectionEnabled, isInitialized, autoStart]);

  return {
    videoRef,
    canvasRef,
    isDetecting,
    isInitialized,
    isLoading,
    poseDetectionEnabled,
    setPoseDetectionEnabled,
  };
}
