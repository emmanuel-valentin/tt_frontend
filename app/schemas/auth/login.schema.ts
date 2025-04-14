import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Este campo es obligatorio" })
    .email({ message: "El correo electrónico no es válido" }),
  password: z.string({ message: "Este campo es obligatorio" }),
});
