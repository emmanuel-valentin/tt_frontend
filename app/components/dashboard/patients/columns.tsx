import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '~/components/ui/badge';
import { DataTableColumnHeader } from '~/components/data-table/data-table-column-header';
import { UserAvatar } from '~/components/shared/avatar/user-avatar';

import { Patient } from '~/interfaces/user/patient.interface';
import { PatientsDataTableActions } from './patients-data-table-actions';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="max-w-[80px]">{row.original.id}</div>,
  },
  {
    id: 'fotoUrl',
    cell: ({ row }) => (
      <div className="max-w-6">
        <UserAvatar src={row.original.fotoUrl} className="w-6 h-6" />
      </div>
    ),
  },
  {
    accessorKey: 'nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'apellidoPaterno',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido paterno" />
    ),
  },
  {
    accessorKey: 'apellidoMaterno',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido materno" />
    ),
  },
  {
    accessorKey: 'estatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estatus" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.estatus === 'aceptado' ? 'default' : 'secondary'}
        capitalize
      >
        {row.original.estatus}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, estatus } = row.original;
      return <PatientsDataTableActions userId={id} estatus={estatus} />;
    },
  },
];
