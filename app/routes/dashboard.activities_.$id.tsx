import {
  ClientLoaderFunctionArgs,
  data,
  useLoaderData,
} from "@remix-run/react";
import { getActivityById } from "~/services/activity/activity.service";
import { useAuthStore } from "~/store/auth.store";
import { VideoRecorderDialog } from "~/components/dashboard/activity/video-recorder-dialog";
import { sendFeednackSchema } from "~/schemas/user/seed-feedback.schema";
import { sendActivityFeedback } from "~/services/user/physiotherapist/physiotherapist.service";
import { submitActivity } from "~/services/user/patient/patient.service";
import { submitActivitySchema } from "~/schemas/activity/activity.schema";
import { Handle } from "~/types/remix/route-handle.type";
import { Activity } from "~/types/activity/activity.type";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { ActivityDetailHeader } from "~/components/dashboard/activity/activity-detail-header";
import { ActivityDetailContent } from "~/components/dashboard/activity/activity-detail-content";
import { useActivityVideo } from "~/hooks/use-activity-video";
import { BreadcrumbLink } from "~/components/shared/breadcrumbs/breadcrumb-link";

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

export async function clientAction({ request }: ClientLoaderFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "comment") {
    const parsed = sendFeednackSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return {
        validationErrors: parsed.error.flatten(),
      };
    }
    const { serviceError } = await sendActivityFeedback(parsed.data);
    if (serviceError) {
      return {
        serviceError,
      };
    }
  }

  if (intent === "submit-video" || !intent) {
    const parsed = submitActivitySchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return {
        serviceError: parsed.error.flatten().fieldErrors,
      };
    }

    const { serviceData, serviceError } = await submitActivity(parsed.data);
    if (serviceError) {
      return {
        serviceError,
      };
    }

    return {
      serviceData,
    };
  }

  return {
    serviceError: "Acción no permitida",
  };
}

export default function DashboardActivityDetailPage() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const role = useAuthStore((state) => state.userData?.rol);

  const {
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
  } = useActivityVideo();

  const { data: activityData } = loaderData;

  if (!activityData) {
    return <div>No se pudo cargar la actividad</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>{activityData.nombre}</CardTitle>
        <ActivityDetailHeader
          activity={activityData}
          role={role!}
          fileInputRef={fileInputRef}
          submittedVideo={submittedVideo}
          handleRecordVideo={handleRecordVideo}
          handleUploadVideo={handleUploadVideo}
          handleFileSelected={handleFileSelected}
        />
      </CardHeader>

      <CardContent>
        <ActivityDetailContent
          activity={activityData}
          role={role!}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          submittedVideo={submittedVideo}
        />
      </CardContent>

      <VideoRecorderDialog
        open={isRecordDialogOpen}
        onOpenChange={setIsRecordDialogOpen}
        onVideoSubmit={handleVideoSubmit}
      />
    </Card>
  );
}

export const handle: Handle = {
  breadcrumb: (match) => {
    const activity = (match.data as { data: Activity })?.data;
    return (
      <BreadcrumbLink
        to={`/dashboard/activities/${activity?.id}`}
        label={`Actividad ${activity?.id}: ${activity?.nombre}`}
      />
    );
  },
};
