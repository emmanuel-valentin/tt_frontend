import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido_pat: z.string().min(1, "El apellido paterno es requerido"),
  apellido_mat: z.string().min(1, "El apellido materno es requerido"),
  fecha_nacimiento: z.string().date("La fecha de nacimiento es requerida"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos numéricos"),
  cedula: z.string().optional(),
  // foto_url: z.string().nullable(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
