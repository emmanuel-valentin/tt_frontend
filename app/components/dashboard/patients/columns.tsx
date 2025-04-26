import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";

import { PatientsDataTableActions } from "./patients-data-table-actions";
import { PatientColumns } from "~/types/user/patient.type";
import { EnrollmentStatus } from "~/types/user/user.type";

export const columns: ColumnDef<PatientColumns>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="max-w-[80px]">{row.original.id}</div>,
  },
  {
    id: "fotoUrl",
    cell: ({ row }) => (
      <div className="max-w-6">
        <UserAvatar src={row.original.fotoUrl} className="w-6 h-6" />
      </div>
    ),
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "apellidoPaterno",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido paterno" />
    ),
  },
  {
    accessorKey: "apellidoMaterno",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido materno" />
    ),
  },
  {
    accessorKey: "estatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estatus" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.vinculacion_estado === "VINCULADO"
            ? "default"
            : "secondary"
        }
        capitalize
      >
        {row.original.vinculacion_estado.toLowerCase()}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, vinculacion_estado, vinculacion_id } = row.original;
      return (
        <PatientsDataTableActions
          userId={id}
          estatus={vinculacion_estado as EnrollmentStatus}
          vinculacionId={vinculacion_id}
        />
      );
    },
  },
];
