import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex w-full sm:w-auto flex-1 items-center gap-2">
        <Input
          className="w-full"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
