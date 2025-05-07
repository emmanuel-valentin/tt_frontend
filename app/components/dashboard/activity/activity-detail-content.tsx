import { Activity } from "~/types/activity/activity.type";
import { Role } from "~/types/user/user.type";
import { ActivityDescription } from "./activity-description";
import { VideoSection } from "./video-section";
import { CommentsSection } from "./comments-section";

interface ActivityDetailContentProps {
  activity: Activity;
  role: Role;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submittedVideo: {
    file: File | null;
    url: string | null;
  };
}

export function ActivityDetailContent({
  activity,
  role,
  activeTab,
  setActiveTab,
  submittedVideo,
}: ActivityDetailContentProps) {
  const activityFinished = activity.estado === "FINALIZADO";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ActivityDescription description={activity.descripcion} />

        <VideoSection
          activity={activity}
          role={role}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          submittedVideo={submittedVideo}
          activityFinished={activityFinished}
        />
      </div>

      <CommentsSection activity={activity} role={role} />
    </div>
  );
}
