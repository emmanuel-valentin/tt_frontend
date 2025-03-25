import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Physiotherapist } from "~/types/user/physiotherapist.type";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";

export const columns: ColumnDef<Physiotherapist>[] = [
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <PhysiotherapistsDataTableActions physiotherapist={row.original} />
  //     );
  //   },
  // },
];
