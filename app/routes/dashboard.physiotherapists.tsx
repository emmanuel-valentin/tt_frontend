import {
  ClientActionFunctionArgs,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { AddPhysiotherapistDialog } from "~/components/dashboard/physiotherapists/add-physiotherapist-dialog";
import { columns } from "~/components/dashboard/physiotherapists/columns";
import { DataTable } from "~/components/data-table/data-table";
import { ErrorAlert } from "~/components/shared/alert/error-alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { mapLinksToPhysiotherapistColumns } from "~/mappers/physiotherapist-colums.mapper";
import { linkPhysiotherapistSchema } from "~/schemas/user/link-physiotherapist.schema";
import {
  getPhysiotherapists,
  sendLinkToPhysiotherapist,
} from "~/services/user/patient/patient.service";

export async function clientLoader() {
  const { serviceData, serviceError } = await getPhysiotherapists();

  if (serviceError) {
    throw new Error(serviceError);
  }
  if (!serviceData) {
    throw new Error("No data found");
  }

  const physiotherapists = mapLinksToPhysiotherapistColumns(serviceData);

  return {
    physiotherapists,
  };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = linkPhysiotherapistSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parsedData.success) {
    return {
      validationErrors: parsedData.error.flatten().fieldErrors,
    };
  }
  const { serviceError } = await sendLinkToPhysiotherapist(
    parsedData.data.codigoVinculacion
  );

  if (serviceError) {
    return {
      serviceError,
    };
  }

  return {
    sucess: true,
  };
}

export default function DashboardPhysiotherapistsPage() {
  const { physiotherapists } = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();
  const serviceError = actionData?.serviceError;

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
        <CardTitle pageTitle>Mis fisioterapeutas</CardTitle>
        <CardDescription>
          <AddPhysiotherapistDialog />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {serviceError && (
          <ErrorAlert
            title="Error de vinculación"
            message="No es posible vincularte. Asegúrate de que el código sea correcto y que no exista un solicitud de vinculación previa"
          />
        )}
        <DataTable columns={columns} data={physiotherapists} />
      </CardContent>
    </Card>
  );
}
