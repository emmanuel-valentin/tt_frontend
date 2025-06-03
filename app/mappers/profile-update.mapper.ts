import { UpdateUserPayload } from "~/types/user/user.type";
import { UpdateProfileFormData } from "~/schemas/user/update-profile.schema";

/**
 * Maps form data to the format expected by the updateUserProfile service
 *
 * @param formData - The validated form data from updateProfileSchema
 * @returns UpdateUserPayload object formatted for the API
 */
export function mapProfileFormToUpdatePayload(
  formData: UpdateProfileFormData
): UpdateUserPayload {
  return {
    id: formData.id,
    cedula: formData.cedula,
    persona: {
      fecha: formData.fecha,
      telefono: formData.telefono,
      foto_url: null,
    },
    usuario: {
      username: formData.email,
      email: formData.email,
      first_name: formData.nombre,
      last_name: `${formData.apellido_pat} ${formData.apellido_mat}`.trim(),
    },
  };
}
