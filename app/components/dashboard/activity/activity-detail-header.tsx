import { Badge } from "~/components/ui/badge";
import { CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form } from "@remix-run/react";
import { CalendarDays, SendHorizonal } from "lucide-react";
import { formatDate } from "~/lib/utils";
import { ActivityAssignedUserBadge } from "./activity-assigned-user-badge";
import { ActivityActions } from "./activity-actions";
import { ActivityVideoSubmission } from "./activity-video-submission";
import { Role } from "~/types/user/user.type";
import { Activity } from "~/types/activity/activity.type";

interface ActivityDetailHeaderProps {
  activity: Activity;
  role: Role;
  fileInputRef: React.RefObject<HTMLInputElement>;
  submittedVideo: {
    file: File | null;
    url: string | null;
  };
  handleRecordVideo: () => void;
  handleUploadVideo: () => void;
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ActivityDetailHeader({
  activity,
  role,
  fileInputRef,
  submittedVideo,
  handleRecordVideo,
  handleUploadVideo,
  handleFileSelected,
}: ActivityDetailHeaderProps) {
  const activityFinished = activity.estado === "FINALIZADO";

  return (
    <CardDescription className="flex flex-col md:flex-row gap-2 items-start md:items-center text-primary">
      <div className="inline-flex gap-1">
        <CalendarDays className="h-4 w-4" />{" "}
        <span>Vence el {formatDate(activity.fechaLimite)}</span>
      </div>
      <Badge variant="outline" capitalize>
        {activity.estado.toLocaleLowerCase()}
      </Badge>

      <ActivityAssignedUserBadge activity={activity} />

      <div className="flex-1 flex justify-end w-full">
        {role === Role.PATIENT ? (
          <PatientActions
            activity={activity}
            activityFinished={activityFinished}
            fileInputRef={fileInputRef}
            submittedVideo={submittedVideo}
            handleRecordVideo={handleRecordVideo}
            handleUploadVideo={handleUploadVideo}
            handleFileSelected={handleFileSelected}
          />
        ) : (
          <ActivityActions activity={activity} />
        )}
      </div>
    </CardDescription>
  );
}

interface PatientActionsProps {
  activity: Activity;
  activityFinished: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  submittedVideo: {
    file: File | null;
    url: string | null;
  };
  handleRecordVideo: () => void;
  handleUploadVideo: () => void;
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PatientActions({
  activity,
  activityFinished,
  fileInputRef,
  submittedVideo,
  handleRecordVideo,
  handleUploadVideo,
  handleFileSelected,
}: PatientActionsProps) {
  if (activityFinished) {
    return (
      <Button disabled className="gap-2 w-full md:w-auto">
        Actividad entregada
        <SendHorizonal className="h-4 w-4" />
      </Button>
    );
  }

  if (submittedVideo.url) {
    return (
      <Form encType="multipart/form-data" method="POST">
        <Input name="ejercicioAsignadoID" type="hidden" value={activity.id} />
        {submittedVideo.file && (
          <Input
            type="file"
            name="video"
            style={{ display: "none" }}
            ref={(input) => {
              if (input && submittedVideo.file) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(submittedVideo.file);
                input.files = dataTransfer.files;
              }
            }}
          />
        )}

        <Button
          className="gap-2 w-full md:w-auto"
          name="intent"
          value="submit-video"
        >
          Entregar actividad
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </Form>
    );
  }

  return (
    <>
      <Input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={handleFileSelected}
      />
      <ActivityVideoSubmission
        onRecordVideo={handleRecordVideo}
        onUploadVideo={handleUploadVideo}
      />
    </>
  );
}
