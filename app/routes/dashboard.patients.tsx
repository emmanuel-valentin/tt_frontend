import { toast } from "sonner";
import { useLoaderData } from "@remix-run/react";
import { Handle } from "~/types/remix/route-handle.type";

import { columns } from "~/components/dashboard/patients/columns";
import { DataTable } from "~/components/data-table/data-table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Copy } from "lucide-react";
import { getAllPatientLinks } from "~/services/user/physiotherapist/physiotherapist.service";
import { mapLinksToPatientColumns } from "~/mappers/patient-columns.mapper";
import { useAuthStore } from "~/store/auth.store";
import { copyToClipboard } from "~/lib/clipboard";
import { BreadcrumbLink } from "~/components/shared/breadcrumbs/breadcrumb-link";

export const handle: Handle = {
  breadcrumb: () => (
    <BreadcrumbLink to="/dashboard/patients" label="Mis pacientes" />
  ),
};

export async function clientLoader() {
  const { serviceData, serviceError } = await getAllPatientLinks();

  if (serviceError) {
    throw new Error(serviceError);
  }
  if (!serviceData) {
    throw new Error("No data found");
  }

  const patients = mapLinksToPatientColumns(serviceData);

  return {
    patients,
  };
}

export default function DashboardPatientsPage() {
  const { patients } = useLoaderData<typeof clientLoader>();
  const codigoVinculacion = useAuthStore(
    (state) => state.userData?.codigo_token
  );

  const onCopy = async (value: string) => {
    const success = await copyToClipboard(value);

    if (success) {
      toast.success("Código de vinculación copiado al portapapeles");
    } else {
      toast.error("No se pudo copiar el código de vinculación al portapapeles");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Mis pacientes</CardTitle>
        <div className="flex items-center gap-2">
          <p className="text-foreground/80">
            Código de vinculación:{" "}
            <span className="text-accent-foreground">{codigoVinculacion}</span>
          </p>

          <Button
            variant="secondary"
            onClick={() => onCopy(codigoVinculacion!)}
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={patients} />
      </CardContent>
    </Card>
  );
}
