import { useRef, useState, useEffect } from "react";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { isBrowser, PoseDetectionUtil } from "~/lib/mediapipe";

interface UsePoseDetectionOptions {
  enabled?: boolean;
  autoStart?: boolean;
  onLandmarksDetected?: (landmarks: NormalizedLandmark[]) => void;
  onNoPoseDetected?: () => void;
}

interface UsePoseDetectionReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDetecting: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  poseDetectionEnabled: boolean;
  noPoseDetected: boolean;
  setPoseDetectionEnabled: (
    enabled: boolean | ((prev: boolean) => boolean)
  ) => void;
  resetNoPoseDetected: () => void;
  updateLandmarksCallback: (
    callback: (landmarks: NormalizedLandmark[]) => void
  ) => void;
}

export function usePoseDetection({
  enabled = true,
  autoStart = true,
  onLandmarksDetected,
  onNoPoseDetected,
}: UsePoseDetectionOptions = {}): UsePoseDetectionReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseDetectionRef = useRef<PoseDetectionUtil | null>(null);
  const [poseDetectionEnabled, setPoseDetectionEnabled] = useState(enabled);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noPoseDetected, setNoPoseDetected] = useState(false);

  // Reset no pose detected state
  const resetNoPoseDetected = () => {
    setNoPoseDetected(false);
  };

  // Handle when no pose is detected
  const handleNoPoseDetected = () => {
    setNoPoseDetected(true);
    if (onNoPoseDetected) {
      onNoPoseDetected();
    }
  };

  // Reset no pose detected when landmarks are detected
  const handleLandmarksDetected = (landmarks: NormalizedLandmark[]) => {
    setNoPoseDetected(false);
    if (onLandmarksDetected) {
      onLandmarksDetected(landmarks);
    }
  };

  // Update landmarks callback dynamically
  const updateLandmarksCallback = (
    callback: (landmarks: NormalizedLandmark[]) => void
  ) => {
    const poseDetection = poseDetectionRef.current;
    if (poseDetection) {
      poseDetection.onLandmarks = (landmarks: NormalizedLandmark[]) => {
        setNoPoseDetected(false);
        callback(landmarks);
      };
    }
  };

  // Initialize pose detection
  useEffect(() => {
    // Skip initialization if already initialized
    if (!isBrowser || isInitialized) return;

    let poseDetection: PoseDetectionUtil | null = null;

    const initializePoseDetection = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      setIsLoading(true);
      poseDetection = new PoseDetectionUtil();

      try {
        const initialized = await poseDetection.initialize(
          videoRef.current,
          canvasRef.current,
          handleLandmarksDetected,
          handleNoPoseDetected
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
  }, [isInitialized]);

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
    noPoseDetected,
    setPoseDetectionEnabled,
    resetNoPoseDetected,
    updateLandmarksCallback,
  };
}
