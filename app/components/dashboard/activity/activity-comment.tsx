import { Link } from "@remix-run/react";
import { useState } from "react";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { Button } from "~/components/ui/button";

const COMMENT_LENGTH_THRESHOLD = 100;

export function ActivityComment() {
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
          <Button className="p-0 m-0" variant="link" asChild>
            <Link to={`/dashboard/profile/${1}`}>{"Emmanuel Valentin"}</Link>
          </Button>
        </div>
        <div className="pb-2">
          <p className={`text-gray-700 ${!expanded ? "line-clamp-3" : ""}`}>
            {commentText}
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
