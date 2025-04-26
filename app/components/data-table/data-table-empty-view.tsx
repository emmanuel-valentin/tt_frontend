import { EmptyState } from "~/components/shared/views/empty-state";
import { Search, FileX } from "lucide-react";

interface Props {
  searchTerm: string;
}

export function DataTableEmptyView({ searchTerm }: Props) {
  const searchTermTrimmed = searchTerm.trim();

  return searchTermTrimmed ? (
    <EmptyState
      icon={Search}
      title="Sin resultados"
      description={`No hay información disponible para "${searchTermTrimmed}"`}
      className="py-8"
    />
  ) : (
    <EmptyState
      icon={FileX}
      title="Sin registros"
      description="No hay registros disponibles"
      className="py-8"
    />
  );
}
