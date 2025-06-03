import { useRef, useEffect, useState } from "react";

export function useAttachments() {
  // Refs
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPreviewRef = useRef<HTMLAudioElement>(null);

  // State
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Cleanup URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [audioUrl, imageUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const audioFile = new File([audioBlob], `recording-${timestamp}.wav`, {
          type: "audio/wav",
        });

        setSelectedAudio(audioFile);

        // Create URL for audio preview
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Create a data transfer to set the file input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(audioFile);
        if (audioInputRef.current) {
          audioInputRef.current.files = dataTransfer.files;
        }

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please make sure you have granted microphone permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleAudioPlayback = () => {
    if (!audioPreviewRef.current || !audioUrl) return;

    if (isPlaying) {
      audioPreviewRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPreviewRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedAudio(file || null);

    // Create URL for uploaded audio file preview
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    } else {
      setAudioUrl(null);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);

    // Create URL for image preview
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const removeAudio = () => {
    setSelectedAudio(null);
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const resetAttachments = () => {
    setSelectedAudio(null);
    setSelectedImage(null);
    setAudioUrl(null);
    setImageUrl(null);
    setIsPlaying(false);
    if (audioInputRef.current) audioInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    // Refs
    audioInputRef,
    imageInputRef,
    audioPreviewRef,

    // State
    selectedAudio,
    selectedImage,
    isRecording,
    recordingTime,
    audioUrl,
    imageUrl,
    isPlaying,

    // Functions
    startRecording,
    stopRecording,
    toggleAudioPlayback,
    handleAudioEnded,
    handleAudioSelect,
    handleImageSelect,
    removeAudio,
    removeImage,
    resetAttachments,
    formatTime,
  };
}
