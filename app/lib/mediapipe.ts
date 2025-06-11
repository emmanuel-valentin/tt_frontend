import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";

export const isBrowser = typeof window !== "undefined";

const internalWasmUrl =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm";

/**
 * Create a pose landmarker instance
 * @returns PoseLandmarker instance
 */
export const createPoseLandmarker = async () => {
  if (!isBrowser) return null;

  const vision = await FilesetResolver.forVisionTasks(internalWasmUrl);

  return await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/mediapipe/models/pose_landmarker_heavy.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numPoses: 2,
  });
};

/**
 * Check if webcam access is supported
 * @returns boolean indicating if getUserMedia is supported
 */
export const hasGetUserMedia = () => {
  return isBrowser && !!navigator.mediaDevices?.getUserMedia;
};

/**
 * MediaPipe pose detection utility with webcam
 */
export class PoseDetectionUtil {
  poseLandmarker: PoseLandmarker | null = null;
  video: HTMLVideoElement | null = null;
  canvasElement: HTMLCanvasElement | null = null;
  canvasCtx: CanvasRenderingContext2D | null = null;
  drawingUtils: DrawingUtils | null = null;
  webcamRunning: boolean = false;
  videoRunning: boolean = false;
  lastVideoTime: number = -1;
  animationFrameId: number | null = null;
  onLandmarks: ((landmarks: NormalizedLandmark[]) => void) | null = null;
  onNoPoseDetected: (() => void) | null = null;

  // Tracking for pose detection status
  private lastPoseDetectedTime: number = Date.now();
  private noPoseDetectionThreshold: number = 3000; // 3 seconds
  private hasNotifiedNoPose: boolean = false;

  /**
   * Initialize the pose detection utility
   */
  async initialize(
    video: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    onLandmarks?: (landmarks: NormalizedLandmark[]) => void,
    onNoPoseDetected?: () => void
  ) {
    this.video = video;
    this.canvasElement = canvasElement;
    this.canvasCtx = canvasElement.getContext("2d");

    if (this.canvasCtx) {
      this.drawingUtils = new DrawingUtils(this.canvasCtx);
    }

    this.poseLandmarker = await createPoseLandmarker();
    this.onLandmarks = onLandmarks ?? null;
    this.onNoPoseDetected = onNoPoseDetected ?? null;
    return !!this.poseLandmarker;
  }

  /**
   * Enable webcam and start detection
   */
  enableCam() {
    if (!this.poseLandmarker || !this.video || !hasGetUserMedia()) {
      console.log("PoseLandmarker not loaded or webcam not supported");
      return false;
    }

    // Toggle webcam state
    this.webcamRunning = !this.webcamRunning;

    // Stop video processing if active
    this.stopVideoProcessing();

    if (this.webcamRunning) {
      // Request webcam access
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (this.video) {
            this.video.srcObject = stream;
            this.video.addEventListener("loadeddata", () =>
              this.predictWebcam()
            );
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
          this.webcamRunning = false;
        });
    } else {
      this.stopWebcam();
    }

    return this.webcamRunning;
  }

  /**
   * Stop webcam stream
   */
  stopWebcam() {
    this.webcamRunning = false;
    if (this.video && this.video.srcObject) {
      const stream = this.video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      this.video.srcObject = null;
    }

    // Cancel any pending animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Start processing the uploaded video
   */
  processVideo() {
    if (!this.poseLandmarker || !this.video || !this.canvasElement) {
      console.log("PoseLandmarker not loaded or video not available");
      return false;
    }

    // Stop webcam if running
    if (this.webcamRunning) {
      this.stopWebcam();
    }

    // Reset video time tracking and pose tracking
    this.lastVideoTime = -1;
    this.videoRunning = true;
    this.resetPoseTracking();

    // Start detection loop for the video
    this.predictVideo();

    return true;
  }

  /**
   * Stop video processing
   */
  stopVideoProcessing() {
    this.videoRunning = false;

    // Cancel any pending animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Update canvas dimensions to match displayed video size
   */
  updateCanvasDimensions() {
    if (!this.video || !this.canvasElement) return;

    // Get the actual displayed dimensions of the video element
    const videoRect = this.video.getBoundingClientRect();

    // Set canvas size to match displayed video size
    this.canvasElement.width = videoRect.width;
    this.canvasElement.height = videoRect.height;
  }

  /**
   * Adjust landmark coordinates to match the displayed video size
   */
  adjustLandmarksToDisplaySize(landmarks: NormalizedLandmark[]) {
    if (!this.video || !this.canvasElement) return landmarks;

    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;
    const canvasWidth = this.canvasElement.width;
    const canvasHeight = this.canvasElement.height;

    // Calculate the scale and offset for aspect ratio preservation
    const scaleX = canvasWidth / videoWidth;
    const scaleY = canvasHeight / videoHeight;
    const scale = Math.min(scaleX, scaleY);

    const offsetX = (canvasWidth - videoWidth * scale) / 2;
    const offsetY = (canvasHeight - videoHeight * scale) / 2;

    // Create a copy of landmarks with adjusted coordinates
    return landmarks.map((landmark) => {
      return {
        ...landmark,
        x:
          (landmark.x * scale * videoWidth) / canvasWidth +
          offsetX / canvasWidth,
        y:
          (landmark.y * scale * videoHeight) / canvasHeight +
          offsetY / canvasHeight,
        // z remains the same relative depth
      };
    });
  }

  /**
   * Check if poses haven't been detected for a while and notify if needed
   */
  private checkNoPoseDetection() {
    const currentTime = Date.now();
    const timeSinceLastPose = currentTime - this.lastPoseDetectedTime;

    if (
      timeSinceLastPose > this.noPoseDetectionThreshold &&
      !this.hasNotifiedNoPose
    ) {
      this.hasNotifiedNoPose = true;
      if (this.onNoPoseDetected) {
        this.onNoPoseDetected();
      }
    }
  }

  /**
   * Reset pose detection tracking
   */
  private resetPoseTracking() {
    this.lastPoseDetectedTime = Date.now();
    this.hasNotifiedNoPose = false;
  }

  /**
   * Mark that a pose was detected
   */
  private markPoseDetected() {
    this.lastPoseDetectedTime = Date.now();
    this.hasNotifiedNoPose = false;
  }

  /**
   * Predict poses from uploaded video
   */
  async predictVideo() {
    if (
      !this.poseLandmarker ||
      !this.video ||
      !this.canvasElement ||
      !this.canvasCtx ||
      !this.drawingUtils ||
      !this.videoRunning
    ) {
      return;
    }

    this.updateCanvasDimensions();

    const shouldProcessFrame =
      this.video.paused ||
      this.video.ended ||
      this.lastVideoTime !== this.video.currentTime;

    if (shouldProcessFrame) {
      if (!this.video.paused && !this.video.ended) {
        this.lastVideoTime = this.video.currentTime;
      }

      const startTimeMs = performance.now();

      try {
        const results = await this.poseLandmarker.detectForVideo(
          this.video,
          startTimeMs
        );

        this.canvasCtx.clearRect(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );

        if (results.landmarks && results.landmarks.length > 0) {
          this.markPoseDetected();
          if (this.onLandmarks) this.onLandmarks(results.landmarks[0]);

          for (let i = 0; i < results.landmarks.length; i++) {
            const adjustedLandmarks = this.adjustLandmarksToDisplaySize(
              results.landmarks[i]
            );

            this.drawingUtils.drawLandmarks(adjustedLandmarks, {
              radius: (data) =>
                DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
            });
            this.drawingUtils.drawConnectors(
              adjustedLandmarks,
              PoseLandmarker.POSE_CONNECTIONS
            );
          }
        } else {
          // No pose detected in this frame
          this.checkNoPoseDetection();
        }
      } catch (error) {
        console.error("Error during video pose detection:", error);
      }
    }

    if (this.videoRunning) {
      this.animationFrameId = window.requestAnimationFrame(() =>
        this.predictVideo()
      );
    }
  }

  /**
   * Predict poses from webcam video
   */
  async predictWebcam() {
    if (
      !this.poseLandmarker ||
      !this.video ||
      !this.canvasElement ||
      !this.canvasCtx ||
      !this.drawingUtils ||
      !this.webcamRunning
    ) {
      return;
    }

    this.updateCanvasDimensions();

    if (this.lastVideoTime !== this.video.currentTime) {
      this.lastVideoTime = this.video.currentTime;
      const startTimeMs = performance.now();

      try {
        const results = await this.poseLandmarker.detectForVideo(
          this.video,
          startTimeMs
        );

        this.canvasCtx.clearRect(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );

        if (results.landmarks && results.landmarks.length > 0) {
          this.markPoseDetected();

          for (let i = 0; i < results.landmarks.length; i++) {
            const adjustedLandmarks = this.adjustLandmarksToDisplaySize(
              results.landmarks[i]
            );

            this.drawingUtils.drawLandmarks(adjustedLandmarks, {
              radius: (data) =>
                DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
            });
            this.drawingUtils.drawConnectors(
              adjustedLandmarks,
              PoseLandmarker.POSE_CONNECTIONS
            );
          }
        } else {
          // No pose detected in this frame
          this.checkNoPoseDetection();
        }
      } catch (error) {
        console.error("Error during webcam pose detection:", error);
      }
    }

    if (this.webcamRunning) {
      this.animationFrameId = window.requestAnimationFrame(() =>
        this.predictWebcam()
      );
    }
  }

  /**
   * Process a single frame of the video without playing it
   */
  async processSingleFrame() {
    if (
      !this.poseLandmarker ||
      !this.video ||
      !this.canvasElement ||
      !this.canvasCtx ||
      !this.drawingUtils
    ) {
      console.error("Required components not initialized");
      return false;
    }

    // Update canvas dimensions to match displayed video size
    this.updateCanvasDimensions();

    try {
      // Get current timestamp for the detection
      const startTimeMs = performance.now();

      // Run the detection on the current frame
      const results = await this.poseLandmarker.detectForVideo(
        this.video,
        startTimeMs
      );

      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      if (results.landmarks && results.landmarks.length > 0) {
        for (let i = 0; i < results.landmarks.length; i++) {
          const adjustedLandmarks = this.adjustLandmarksToDisplaySize(
            results.landmarks[i]
          );

          this.drawingUtils.drawLandmarks(adjustedLandmarks, {
            radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          });
          this.drawingUtils.drawConnectors(
            adjustedLandmarks,
            PoseLandmarker.POSE_CONNECTIONS
          );
        }
      }

      return true;
    } catch (error) {
      console.error("Error during single frame pose detection:", error);
      return false;
    }
  }

  /**
   * Clean up resources
   */
  cleanup() {
    this.webcamRunning = false;
    this.videoRunning = false;

    // Stop webcam if active
    if (this.video && this.video.srcObject) {
      const stream = this.video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    // Cancel any pending animation frame
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Reset pose tracking
    this.resetPoseTracking();
  }
}
