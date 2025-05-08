import { VideoPlayer } from "~/components/shared/video/video-player";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SubmissionVideoContent } from "./video-with-pose-detection";
import { Activity } from "~/types/activity/activity.type";
import { Role } from "~/types/user/user.type";

interface VideoSectionProps {
  activity: Activity;
  role: Role;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submittedVideo: {
    url: string | null;
    file: File | null;
  };
  activityFinished: boolean;
}

export function VideoSection({
  activity,
  role,
  activeTab,
  setActiveTab,
  submittedVideo,
  activityFinished,
}: VideoSectionProps) {
  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="grid grid-cols-2 max-w-lg mx-auto">
        <TabsTrigger value="demo">Video Demostrativo</TabsTrigger>
        <TabsTrigger value="submission">
          {role === Role.PHYSIOTHERAPIST ? "Vídeo del paciente" : "Tu vídeo"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="demo">
        <h3 className="text-xl tracking-tight sr-only">Video demostrativo</h3>
        <Separator className="mb-4 sr-only" />
        <div className="w-full flex flex-col items-center">
          <VideoPlayer
            className="md:w-[80%] mt-4"
            src={
              activity?.urlVideo ||
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
          />
        </div>
      </TabsContent>

      <TabsContent value="submission">
        <h3 className="text-xl tracking-tight sr-only">Tu Video</h3>
        <Separator className="mb-4 sr-only" />
        <div className="mt-4">
          <SubmissionVideoContent
            activityFinished={activityFinished}
            submittedVideo={submittedVideo}
            patientVideoUrl={activity.paciente.urlVideoPaciente!}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
