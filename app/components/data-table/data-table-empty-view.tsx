import { CloudDrizzle } from "lucide-react";

interface Props {
  searchTerm: string;
}

export function DataTableEmptyView({ searchTerm }: Props) {
  return (
    <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
      <CloudDrizzle size={64} className="text-gray-400" />

      <div className="max-w-[30ch] text-center">
        <p className="text-gray-400 font-medium break-words overflow-hidden">
          No hay información disponible para &quot;{searchTerm}&quot;
        </p>
      </div>
    </div>
  );
}
