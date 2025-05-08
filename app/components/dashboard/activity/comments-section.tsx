import { MessageSquare } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { EmptyState } from "~/components/shared/views/empty-state";
import { ActivityComment } from "./activity-comment";
import { ActivityCommentForm } from "./activity-comment-form";
import { Activity } from "~/types/activity/activity.type";
import { Role } from "~/types/user/user.type";

interface CommentsSectionProps {
  activity: Activity;
  role: Role;
}

export function CommentsSection({ activity, role }: CommentsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl tracking-tight">Comentarios</h3>
        <Separator className="mb-4" />
      </div>
      <div className="flex flex-col gap-4">
        {activity?.feedback && activity.feedback.length > 0 ? (
          activity.feedback.map((comment) => (
            <ActivityComment
              key={comment.id}
              feedback={comment}
              fisioterapeuta={activity.fisioterapeuta}
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
      {role === Role.PHYSIOTHERAPIST && (
        <ActivityCommentForm activity={activity} />
      )}
    </div>
  );
}
