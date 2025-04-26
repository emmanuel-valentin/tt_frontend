import { useNavigate } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { MoreVertical, Eye } from "lucide-react";

interface Props {
  userId: string;
}

export function PhysiotherapistDataTableActions({ userId }: Props) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate(`/dashboard/profile/${userId}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver perfil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
