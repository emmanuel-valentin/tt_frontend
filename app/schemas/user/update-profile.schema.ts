import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido_pat: z.string().min(1, "El apellido paterno es requerido"),
  apellido_mat: z.string().min(1, "El apellido materno es requerido"),
  fecha: z
    .string({ required_error: "La fecha de nacimiento es requerida" })
    .date("La fecha de nacimiento debe ser una fecha válida"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos numéricos"),
  cedula: z.string().optional(),
});

export const updateUserPictureSchema = z.object({
  foto: z
    .instanceof(File, { message: "Se requiere un archivo de imagen" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "El tamaño del archivo no puede exceder 5MB",
    })
    .refine(
      (file) => {
        return file.type.startsWith("image/");
      },
      {
        message: "Formato de archivo no soportado. Por favor sube una imagen.",
      }
    ),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export type UpdateUserPicturePayload = z.infer<typeof updateUserPictureSchema>;
