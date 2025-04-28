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

  const commentText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, error ab! Officiis eaque vitae consectetur enim! Aut aliquid esse, voluptatum quisquam nam excepturi! Quia iusto saepe modi voluptates quo doloribus! Deserunt dolorum commodi reprehenderit quaerat libero dolores aperiam quos eos, dignissimos iste velit a provident magni incidunt amet molestiae quasi quod obcaecati ea, soluta quam dolorem! Incidunt debitis ea animi!";

  const mightBeTruncated = commentText.length > COMMENT_LENGTH_THRESHOLD;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex items-start gap-2 max-w-screen-sm">
      <UserAvatar className="h-8 w-8 md:h-12 md:w-12" />
      <div className="px-4 rounded-xl bg-blue-50">
        <div>
          <Button className="p-0 m-0" variant="link">
            <Link to={`/dashboard/profile/${fisioterapeuta.persona_id}`}>
              {fisioterapeuta.nombre} {fisioterapeuta.apellidoPat}{" "}
              {fisioterapeuta.apellidoMat}
            </Link>
          </Button>
        </div>
        <div className="pb-2">
          <p className={`text-gray-700 ${!expanded ? "line-clamp-3" : ""}`}>
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
