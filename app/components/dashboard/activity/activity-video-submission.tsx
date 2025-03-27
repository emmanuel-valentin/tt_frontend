import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Upload, Video, ChevronDown } from "lucide-react";

interface ActivityVideoSubmissionProps {
  onUploadVideo: () => void;
  onRecordVideo: () => void;
}

export function ActivityVideoSubmission({
  onUploadVideo,
  onRecordVideo,
}: ActivityVideoSubmissionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 w-full md:w-auto">
          Entregar video
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={onUploadVideo}
          className="gap-2 cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          <span>Subir video</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onRecordVideo}
          className="gap-2 cursor-pointer"
        >
          <Video className="h-4 w-4" />
          <span>Grabar video</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
