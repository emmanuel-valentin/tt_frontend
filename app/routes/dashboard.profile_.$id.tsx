import {
  ClientLoaderFunctionArgs,
  data,
  useLoaderData,
} from "@remix-run/react";
import { UserDetails } from "~/components/dashboard/profile/user-details";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { ErrorBoundary as CustomErrorBoundary } from "~/components/shared/error-boundary/error-boundary";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { getUserProfileById } from "~/services/user/user.service";
import { Role } from "~/types/user/user.type";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const id = params.id as string;
  const { serviceData, serviceError } = await getUserProfileById(id);

  if (serviceError) {
    throw data(serviceError, {
      status: 404,
    });
  }

  return {
    data: serviceData,
  };
}

export const ErrorBoundary = CustomErrorBoundary;

export default function DashboardProfileDetailsPage() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const { data: userData } = loaderData;
  const roleLabel =
    userData?.rol === Role.PHYSIOTHERAPIST ? "fisioterapeuta" : "paciente";

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <UserAvatar src={userData?.persona.foto_url} className="w-16 h-16" />
          <div className="text-center md:text-start">
            <p className="text-xl tracking-tight line-clamp-1">
              {userData?.usuario.first_name} {userData?.usuario.last_name}
            </p>
            <Badge capitalize>{roleLabel}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold tracking-tight">
          Detalles personales
        </h3>

        <Separator className="mb-4" />

        <UserDetails userData={userData!} />
      </CardContent>
    </Card>
  );
}
