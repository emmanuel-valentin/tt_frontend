import { useState } from "react";

import { Link } from "@remix-run/react";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { Button } from "~/components/ui/button";
import { Fisioterapeuta, HumanFeedback } from "~/types/activity/activity.type";

const COMMENT_LENGTH_THRESHOLD = 100;

interface Props {
  feedback: HumanFeedback;
  fisioterapeuta: Fisioterapeuta;
}

export function ActivityComment({ feedback, fisioterapeuta }: Props) {
  const [expanded, setExpanded] = useState(false);

  const mightBeTruncated = feedback.feedback.length > COMMENT_LENGTH_THRESHOLD;

  const toggleExpand = () => {
    setExpanded(!expanded);
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
            className={`text-foreground/80 ${!expanded ? "line-clamp-3" : ""}`}
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
        </div>
      </div>
    </div>
  );
}
