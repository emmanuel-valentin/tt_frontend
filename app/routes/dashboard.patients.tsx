import { toast } from "sonner";

import { columns } from "~/components/dashboard/patients/columns";
import { DataTable } from "~/components/data-table/data-table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Copy } from "lucide-react";
import { getAllPatientLinks } from "~/services/user/physiotherapist/physiotherapist.service";
import { mapLinksToPatientColumns } from "~/mappers/patient-columns.mapper";
import { useLoaderData } from "@remix-run/react";
import { useAuthStore } from "~/store/auth.store";

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
    if (!navigator.clipboard) {
      return toast.error(
        "Tu navegador no soporta la funcionalidad de copiar al portapapeles"
      );
    }

    await navigator.clipboard.writeText(value);
    toast.success("Código de vinculación copiado al portapapeles");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Mis pacientes</CardTitle>
        <div className="flex items-center gap-2">
          <p className="text-gray-700">
            Código de vinculación:{" "}
            <span className="text-primary">{codigoVinculacion}</span>
          </p>

          <Button variant="outline" onClick={() => onCopy(codigoVinculacion!)}>
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
