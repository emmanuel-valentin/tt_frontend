import { z } from "zod";

export const sendFeednackSchema = z.object({
  ejercicio_asignado_id: z.string({
    required_error: "El id del ejercicio es requerido",
  }),
  feedback: z.string({ required_error: "El feedback es requerido" }),
  audio: z
    .instanceof(File)
    .or(z.null())
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 1024 * 1024 * 5;
      },
      {
        message: "El archivo debe ser menor a 5MB",
      }
    ),
  video: z
    .instanceof(File)
    .or(z.null())
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 1024 * 1024 * 5;
      },
      {
        message: "El archivo debe ser menor a 5MB",
      }
    ),
});

export type SendFeedbackPayload = z.infer<typeof sendFeednackSchema>;
