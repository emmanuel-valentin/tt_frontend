import { Link } from "@remix-run/react";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { Button } from "~/components/ui/button";

export function ActivityComment() {
  return (
    <div className="flex items-start gap-2 max-w-screen-sm">
      <UserAvatar />
      <div className="px-4 rounded-xl bg-blue-50">
        <div>
          <Button className="p-0 m-0" variant="link" asChild>
            <Link to={`/dashboard/profile/${1}`}>{"Emmanuel Valentin"}</Link>
          </Button>
        </div>
        <div className="pb-2">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum,
            error ab! Officiis eaque vitae consectetur enim! Aut aliquid esse,
            voluptatum quisquam nam excepturi! Quia iusto saepe modi voluptates
            quo doloribus! Deserunt dolorum commodi reprehenderit quaerat libero
            dolores aperiam quos eos, dignissimos iste velit a provident magni
            incidunt amet molestiae quasi quod obcaecati ea, soluta quam
            dolorem! Incidunt debitis ea animi!
          </p>
        </div>
      </div>
    </div>
  );
}
