import { ClientActionFunctionArgs } from "@remix-run/react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { UpdateProfileForm } from "~/components/dashboard/profile/update-profile-form";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { useAuthStore, setUserData } from "~/store/auth.store";
import { updateUserProfile } from "~/services/user/user.service";
import { updateProfileSchema } from "~/schemas/user/update-profile.schema";
import { mapProfileFormToUpdatePayload } from "~/mappers/profile-update.mapper";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = updateProfileSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!parsedData.success) {
    return { validationErrors: parsedData.error.flatten().fieldErrors };
  }

  const payload = parsedData.data;
  const updateData = mapProfileFormToUpdatePayload(payload);

  const { serviceData, serviceError } = await updateUserProfile(updateData);

  if (serviceError) {
    return { error: serviceError };
  }

  setUserData(serviceData!);

  return null;
}

export default function DashboardMyProfilePage() {
  const userData = useAuthStore((state) => state.userData);
  const roleLabel =
    userData?.rol === "physiotherapist" ? "fisioterapeuta" : "paciente";

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Mi perfil</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row items-center md:items-start  gap-4 mb-6">
          <UserAvatar src={userData?.persona.foto_url} className="w-16 h-16" />
          <div className="text-center md:text-start">
            <p className="text-xl tracking-tight line-clamp-1">
              {userData?.usuario.first_name} {userData?.usuario.last_name}
            </p>
            <Badge capitalize>{roleLabel}</Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          Detalles personales
        </h3>

        <Separator className="mb-4" />

        <UpdateProfileForm userData={userData} />
      </CardContent>
    </Card>
  );
}
