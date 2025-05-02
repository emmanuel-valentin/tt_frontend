import { useState, useRef, useEffect } from "react";

interface SubmittedVideo {
  file: File | null;
  url: string | null;
}

export function useActivityVideo() {
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submittedVideo, setSubmittedVideo] = useState<SubmittedVideo>({
    file: null,
    url: null,
  });
  const [activeTab, setActiveTab] = useState<string>("demo");

  const handleUploadVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSubmittedVideo({ file, url });
      setActiveTab("submission");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRecordVideo = () => {
    setIsRecordDialogOpen(true);
  };

  const handleVideoSubmit = (videoBlob: Blob) => {
    // Convertir el Blob a File para facilitar su uso en formularios
    const file = new File([videoBlob], "recorded-video.webm", {
      type: videoBlob.type,
    });
    const url = URL.createObjectURL(videoBlob);
    setSubmittedVideo({ file, url });
    setActiveTab("submission");
    setIsRecordDialogOpen(false);
  };

  // Limpiar URLs de objetos cuando se desmonte el componente
  useEffect(() => {
    return () => {
      if (submittedVideo.url) {
        URL.revokeObjectURL(submittedVideo.url);
      }
    };
  }, [submittedVideo.url]);

  return {
    fileInputRef,
    submittedVideo,
    activeTab,
    isRecordDialogOpen,
    setActiveTab,
    setIsRecordDialogOpen,
    handleUploadVideo,
    handleFileSelected,
    handleRecordVideo,
    handleVideoSubmit,
  };
}
