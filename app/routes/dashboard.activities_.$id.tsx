import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { VideoPlayer } from "~/components/shared/video/video-player";

import { ActivityComment } from "~/components/dashboard/activity/activity-comment";
import { ActivityCommentForm } from "~/components/dashboard/activity/activity-comment-form";
import { ActivityVideoSubmission } from "~/components/dashboard/activity/activity-video-submission";

import { CalendarDays } from "lucide-react";

export default function DashboardActivityDetailPage() {
  const handleUploadVideo = async () => {
    // TODO: Select a video from user storage and upload it to submit the assignment
    console.log("Upload video clicked");
  };

  const handleRecordVideo = async () => {
    // TODO: Open a modal to record a video and then upload it to submit the assignment
    console.log("Record video clicked");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>{"Activity title"}</CardTitle>
        <CardDescription className="flex flex-col md:flex-row gap-2 items-start md:items-center text-primary">
          <div className="inline-flex gap-1">
            <CalendarDays className="h-4 w-4" />{" "}
            <span>Vence el {"10/02/2023"}</span>
          </div>
          <Badge variant="secondary">{"ENTREGADA"}</Badge>
          <div className="flex-1 flex justify-end">
            <ActivityVideoSubmission
              onUploadVideo={handleUploadVideo}
              onRecordVideo={handleRecordVideo}
            />
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl tracking-tight">Descripción</h3>
          <Separator className="mb-4" />
          <p className="text-balance text-gray-700">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae accusantium, dolorem distinctio similique deleniti quas debitis dolor eaque! Quidem blanditiis totam libero minima reiciendis tempore eos sunt vel quibusdam ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae accusantium, dolorem distinctio similique deleniti quas debitis dolor eaque! Quidem blanditiis totam libero minima reiciendis tempore eos sunt vel quibusdam ipsam"
            }
          </p>
        </div>

        <div>
          <h3 className="text-xl tracking-tight">Video demostrativo</h3>
          <Separator className="mb-4" />
          <VideoPlayer
            className="max-w-screen-md mx-auto"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </div>

        <div>
          <h3 className="text-xl tracking-tight">Comentarios</h3>
          <Separator className="mb-4" />
          <ActivityComment />
          <ActivityCommentForm />
        </div>
      </CardContent>
    </Card>
  );
}
