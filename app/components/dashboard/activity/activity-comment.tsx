import { useState, useRef } from "react";

import { Link } from "@remix-run/react";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Fisioterapeuta, HumanFeedback } from "~/types/activity/activity.type";
import { Play, Pause, Volume2 } from "lucide-react";
import { getAPIResource } from "~/lib/utils";

const COMMENT_LENGTH_THRESHOLD = 100;

interface Props {
  feedback: HumanFeedback;
  fisioterapeuta: Fisioterapeuta;
}

export function ActivityComment({ feedback, fisioterapeuta }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mightBeTruncated = feedback.feedback.length > COMMENT_LENGTH_THRESHOLD;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleAudioPlayback = () => {
    if (!audioRef.current || !feedback.feedback_audio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-start gap-2 max-w-screen-sm">
      <UserAvatar className="size-8" />
      <div className="px-4 rounded-xl bg-primary/10">
        <div>
          <Button className="p-0 m-0" variant="link">
            <Link to={`/dashboard/profile/${fisioterapeuta.persona_id}`}>
              {fisioterapeuta.nombre} {fisioterapeuta.apellidoPat}{" "}
              {fisioterapeuta.apellidoMat}
            </Link>
          </Button>
        </div>
        <div className="pb-2">
          <p
            className={`text-foreground/80 break-all hyphens-auto ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {feedback.feedback}
          </p>
          {mightBeTruncated && (
            <Button
              className="p-0 cursor-pointer"
              onClick={toggleExpand}
              variant="link"
              asChild
            >
              <span>{expanded ? "Show Less" : "Show More"}</span>
            </Button>
          )}

          {/* Attachments */}
          <div className="mt-3 space-y-2">
            {/* Audio attachment */}
            {feedback.feedback_audio && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleAudioPlayback}
                  className="h-7 px-2 gap-1"
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  <Volume2 className="w-3 h-3" />
                  <span className="text-xs">Audio</span>
                </Button>
              </div>
            )}

            {/* Image preview */}
            {feedback.feedback_imagen && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="block max-w-full border border-border/50 hover:border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-0"
                >
                  <img
                    src={getAPIResource(feedback.feedback_imagen)}
                    alt="Imagen adjunta"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: "200px" }}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Hidden audio element for playback */}
          {feedback.feedback_audio && (
            <audio
              ref={audioRef}
              src={getAPIResource(feedback.feedback_audio)}
              onEnded={handleAudioEnded}
              className="hidden"
            >
              <track kind="captions" srcLang="en" label="English captions" />
            </audio>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {feedback.feedback_imagen && (
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent
            fullscreen
            className="flex items-center justify-center p-0"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={getAPIResource(feedback.feedback_imagen)}
                alt="Imagen adjunta"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
