import { Table } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          className="max-w-[80ch]"
          defaultValue=""
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
