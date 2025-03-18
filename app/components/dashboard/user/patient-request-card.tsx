import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";

import { Check, X } from "lucide-react";
import { Link } from "@remix-run/react";

export function PatientRequestCard() {
  return (
    <Card>
      <CardHeader>
        <Button asChild className="justify-start p-0" variant="link">
          <Link to={`/dashboard/profile/${"1"}`}>
            <UserAvatar className="w-12 h-12" />
            <p className="text-gray-700 text-base line-clamp-1">
              {"Emmanuel"} {"Valentin"} {"Ramos"}
            </p>
          </Link>
        </Button>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button className="flex-1" variant="destructive">
          <X />
          Rechazar
        </Button>
        <Button className="flex-1">
          <Check />
          Aceptar
        </Button>
      </CardFooter>
    </Card>
  );
}
