import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Play, Pause, Eye, X, Mic, Image as ImageIcon } from "lucide-react";

interface AttachmentPreviewProps {
  file: File;
  fileUrl?: string | null;
  type: "audio" | "image";
  onRemove: () => void;
  onPlayToggle?: () => void;
  isPlaying?: boolean;
  showRemoveButton?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement>;
}

export function AttachmentPreview({
  file,
  fileUrl,
  type,
  onRemove,
  onPlayToggle,
  isPlaying = false,
  showRemoveButton = true,
  audioRef,
}: AttachmentPreviewProps) {
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Reset audio to beginning when it finishes playing
  useEffect(() => {
    if (type === "audio" && audioRef?.current) {
      const audioElement = audioRef.current;

      const handleAudioEnded = () => {
        audioElement.currentTime = 0;
      };

      audioElement.addEventListener("ended", handleAudioEnded);

      return () => {
        audioElement.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [type, audioRef]);

  const getIcon = () => {
    if (type === "audio") {
      return <Mic className="w-5 h-5 text-primary" />;
    }
    return <ImageIcon className="w-5 h-5 text-primary" />;
  };

  const getTypeLabel = () => {
    if (type === "audio") {
      return "Audio file";
    }
    return "Image file";
  };

  const renderThumbnail = () => {
    if (type === "image" && fileUrl) {
      return (
        <div className="w-10 h-10 bg-primary/10 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={fileUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        {getIcon()}
      </div>
    );
  };

  const renderPreviewControls = () => {
    const controls = [];

    if (type === "audio" && fileUrl && onPlayToggle) {
      controls.push(
        <Button
          key="play"
          type="button"
          variant="outline"
          size="sm"
          onClick={onPlayToggle}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      );
    }

    if (type === "image" && fileUrl) {
      controls.push(
        <Button
          key="view"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowImagePreview(true)}
          className="h-8 w-8 p-0"
        >
          <Eye className="w-4 h-4" />
        </Button>
      );
    }

    if (showRemoveButton) {
      controls.push(
        <Button
          key="remove"
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      );
    }

    return controls;
  };

  return (
    <>
      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center gap-3">
          {renderThumbnail()}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">{getTypeLabel()}</p>
          </div>

          {/* Preview controls */}
          <div className="flex items-center gap-1">
            {renderPreviewControls()}
          </div>
        </div>
      </div>

      {/* Hidden audio element for audio previews */}
      {type === "audio" && fileUrl && audioRef && (
        <audio ref={audioRef} src={fileUrl} className="hidden">
          <track kind="captions" srcLang="en" label="English captions" />
        </audio>
      )}

      {/* Fullscreen image preview dialog */}
      {type === "image" && fileUrl && (
        <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
          <DialogContent
            fullscreen
            className="flex items-center justify-center p-0"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={fileUrl}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
