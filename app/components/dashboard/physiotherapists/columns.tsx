import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { PhysiotherapistColumns } from "~/types/user/physiotherapist.type";
import { PhysiotherapistDataTableActions } from "./physiotherapist-data-table";

export const columns: ColumnDef<PhysiotherapistColumns>[] = [
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
    accessorKey: "cedula",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cédula" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <PhysiotherapistDataTableActions userId={row.original.id} />;
    },
  },
];
