import { ClientActionFunctionArgs, useActionData } from "@remix-run/react";
import { Handle } from "~/types/remix/route-handle.type";
import { useEffect } from "react";
import { toast } from "sonner";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { UpdateProfileForm } from "~/components/dashboard/profile/update-profile-form";
import { UpdateProfilePicture } from "~/components/dashboard/profile/update-profile-picture";
import { useAuthStore, setUserData } from "~/store/auth.store";
import {
  updateUserProfile,
  updateUserPicture,
} from "~/services/user/user.service";
import {
  updateProfileSchema,
  updateUserPictureSchema,
} from "~/schemas/user/update-profile.schema";
import { mapProfileFormToUpdatePayload } from "~/mappers/profile-update.mapper";
import { Role } from "~/types/user/user.type";
import { BreadcrumbLink } from "~/components/shared/breadcrumbs/breadcrumb-link";

export const handle: Handle = {
  breadcrumb: () => (
    <BreadcrumbLink to="/dashboard/profile" label="Mi perfil" />
  ),
};

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "update-profile") {
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

    return { success: "Perfil actualizado correctamente" };
  }

  if (intent === "update-avatar") {
    const parsedData = updateUserPictureSchema.safeParse({
      foto: formData.get("foto") as File,
    });

    if (!parsedData.success) {
      return {
        error:
          parsedData.error.flatten().fieldErrors.foto?.[0] ||
          "Error de validación",
      };
    }

    const { serviceData, serviceError } = await updateUserPicture(
      parsedData.data
    );

    if (serviceError) {
      return { error: serviceError };
    }

    // Update user data in store with new photo URL
    const currentUserData = useAuthStore.getState().userData;
    if (currentUserData && serviceData) {
      setUserData({
        ...currentUserData,
        persona: {
          ...currentUserData.persona,
          foto_url: serviceData.foto_url,
        },
      });
    }

    return { success: "Foto de perfil actualizada correctamente" };
  }

  return { error: "Acción no válida" };
}

export default function DashboardMyProfilePage() {
  const userData = useAuthStore((state) => state.userData);
  const actionData = useActionData<typeof clientAction>();

  const roleLabel =
    userData?.rol === Role.PHYSIOTHERAPIST ? "fisioterapeuta" : "paciente";

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success);
    }
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Mi perfil</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
          <UpdateProfilePicture userData={userData} />
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
