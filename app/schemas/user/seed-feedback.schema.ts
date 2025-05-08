import { z } from "zod";

export const sendFeednackSchema = z.object({
  ejercicio_asignado_id: z.string({
    required_error: "El id del ejercicio es requerido",
  }),
  feedback: z.string({ required_error: "El feedback es requerido" }),
});

export type SendFeedbackPayload = z.infer<typeof sendFeednackSchema>;
