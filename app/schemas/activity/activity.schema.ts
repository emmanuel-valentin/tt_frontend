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

export type NewActivityPayload = z.infer<typeof newActivitySchema>;

export type EditActivityPayload = z.infer<typeof editActivitySchema>;
