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
import { ActivityAssignedUserBadge } from "~/components/dashboard/activity/activity-assigned-user-badge";
import { EmptyState } from "~/components/shared/views/empty-state";

import { CalendarDays, MessageSquare } from "lucide-react";
import {
  ClientLoaderFunctionArgs,
  Link,
  data,
  useLoaderData,
} from "@remix-run/react";
import { getActivityById } from "~/services/activity/activity.service";
import { formatDate } from "~/lib/utils";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const activityId = params.id as string;
  const { serviceData, serviceError } = await getActivityById(activityId);

  if (serviceError) {
    throw data(serviceError, {
      status: 404,
    });
  }

  return {
    data: serviceData,
  };
}

export default function DashboardActivityDetailPage() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const { data: activityData } = loaderData;

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
        <CardTitle pageTitle>{activityData?.nombre}</CardTitle>
        <CardDescription className="flex flex-col md:flex-row gap-2 items-start md:items-center text-primary">
          <div className="inline-flex gap-1">
            <CalendarDays className="h-4 w-4" />{" "}
            <span>Vence el {formatDate(activityData!.fechaLimite)}</span>
          </div>
          <Badge variant="outline" capitalize>
            {activityData?.estado.toLocaleLowerCase()}
          </Badge>
          {activityData && (
            <ActivityAssignedUserBadge activity={activityData} />
          )}
          <div className="flex-1 flex justify-end w-full">
            <ActivityVideoSubmission
              onUploadVideo={handleUploadVideo}
              onRecordVideo={handleRecordVideo}
            />
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-4 lg:w-2/3">
            <div>
              <h3 className="text-xl tracking-tight">Descripción</h3>
              <Separator className="mb-4" />
              <p className="text-balance text-gray-700">
                {activityData?.descripcion ||
                  "No hay descripción disponible para esta actividad."}
              </p>
            </div>

            <div>
              <h3 className="text-xl tracking-tight">Video demostrativo</h3>
              <Separator className="mb-4" />
              <VideoPlayer
                className="md:w-[80%]"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:w-1/3">
            <div>
              <h3 className="text-xl tracking-tight">Comentarios</h3>
              <Separator className="mb-4" />
              <div className="flex flex-col gap-4">
                {activityData?.feedback && activityData.feedback.length > 0 ? (
                  activityData.feedback.map((comment) => (
                    <ActivityComment
                      key={comment.id}
                      feedback={comment}
                      fisioterapeuta={activityData.fisioterapeuta}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={MessageSquare}
                    title="Aún no hay comentarios"
                    description="Esta actividad aún no tiene retroalimentación por parte de tu terapeuta."
                    className="bg-card/50 rounded-lg border border-muted py-6"
                  />
                )}
              </div>
              <ActivityCommentForm />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
