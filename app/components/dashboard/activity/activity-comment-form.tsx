import { useFetcher } from "@remix-run/react";
import { useRef, useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { AttachmentPreview } from "~/components/shared/attachment-preview/attachment-preview";
import { useAttachments } from "~/hooks/use-attachments";

import { Send, Mic, Camera, Square } from "lucide-react";
import { Activity } from "~/types/activity/activity.type";

interface Props {
  activity: Activity;
}

export function ActivityCommentForm({ activity }: Props) {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useAttachments();

  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data != null &&
      inputRef.current?.value
    ) {
      inputRef.current.value = "";
      resetAttachments();
    }
  }, [fetcher.state, fetcher.data, resetAttachments]);

  return (
    <div className="mt-6">
      <fetcher.Form
        className="space-y-3"
        method="POST"
        encType="multipart/form-data"
      >
        <Input type="hidden" name="ejercicio_asignado_id" value={activity.id} />

        {/* Hidden file inputs */}
        <input
          ref={audioInputRef}
          type="file"
          name="audio"
          accept="audio/*"
          onChange={handleAudioSelect}
          className="hidden"
        />
        <input
          ref={imageInputRef}
          type="file"
          name="video"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
            <span className="text-destructive font-medium">
              Recording... {formatTime(recordingTime)}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={stopRecording}
              className="ml-auto"
            >
              <Square className="w-4 h-4 mr-1" />
              Stop
            </Button>
          </div>
        )}

        {/* Selected files preview using reusable component */}
        {(selectedAudio || selectedImage) && !isRecording && (
          <div className="space-y-3">
            {selectedAudio && (
              <AttachmentPreview
                file={selectedAudio}
                fileUrl={audioUrl}
                type="audio"
                onRemove={removeAudio}
                onPlayToggle={toggleAudioPlayback}
                isPlaying={isPlaying}
                audioRef={audioPreviewRef}
              />
            )}

            {selectedImage && (
              <AttachmentPreview
                file={selectedImage}
                fileUrl={imageUrl}
                type="image"
                onRemove={removeImage}
              />
            )}
          </div>
        )}

        {/* Audio element for playback */}
        {audioUrl && (
          <audio
            ref={audioPreviewRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            className="hidden"
          >
            <track kind="captions" srcLang="en" label="English captions" />
          </audio>
        )}

        {/* Main input row */}
        <div className="flex gap-1">
          <div className="grid w-full gap-1.5">
            <Label className="sr-only" htmlFor="comment">
              Agregar un comentario
            </Label>
            <div className="flex gap-1">
              {/* Attachment buttons */}
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isSubmitting}
                className="shrink-0"
              >
                {isRecording ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => imageInputRef.current?.click()}
                disabled={isSubmitting || isRecording}
                className="shrink-0"
              >
                <Camera className="w-4 h-4" />
              </Button>

              {/* Text input */}
              <Input
                ref={inputRef}
                id="feedback"
                name="feedback"
                placeholder="Escribe un comentario..."
                disabled={isSubmitting || isRecording}
                className="flex-1"
              />
            </div>
          </div>

          {/* Send button */}
          <Button
            name="intent"
            type="submit"
            value="comment"
            size="icon"
            className="w-20 shrink-0"
            disabled={isSubmitting || isRecording}
          >
            {isSubmitting ? "..." : <Send />}
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
