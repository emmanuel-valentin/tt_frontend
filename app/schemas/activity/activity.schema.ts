import { z } from "zod";

export const newActivitySchema = z.object({
  pacienteID: z.string({ required_error: "El paciente es requerido" }),
  ejercicioID: z.string({ required_error: "El ejercicio es requerido" }),
  fechaLimite: z
    .string({ required_error: "La fecha límite es requerida" })
    .date(),
});

export const editActivitySchema = z.object({
  ejercicioAsignadoID: z.string({ required_error: "El id es requerido" }),
  pacienteID: z.string({ required_error: "El paciente es requerido" }),
  // This is the execise id
  ejercicioID: z.string({ required_error: "El ejercicio es requerido" }),
  fechaLimite: z
    .string({ required_error: "La fecha límite es requerida" })
    .date(),
});

export const submitActivitySchema = z.object({
  ejercicioAsignadoID: z.string({ required_error: "El id es requerido" }),
  video: z
    .instanceof(File, { message: "Se requiere un archivo de video" })
    .refine((file) => file.size <= 100 * 1024 * 1024, {
      message: "El tamaño del archivo no puede exceder 100MB",
    })
    .refine(
      (file) => {
        return file.type.startsWith("video/");
      },
      {
        message:
          "Formato de archivo no soportado. Por favor sube un video MP4, WebM o QuickTime.",
      }
    ),
});

export type NewActivityPayload = z.infer<typeof newActivitySchema>;

export type EditActivityPayload = z.infer<typeof editActivitySchema>;

export type SubmitActivityPayload = z.infer<typeof submitActivitySchema>;
