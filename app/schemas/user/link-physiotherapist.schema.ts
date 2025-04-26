import { z } from "zod";

export const linkPhysiotherapistSchema = z.object({
  codigoVinculacion: z.string({
    required_error: "El código de vinculación es requerido",
  }),
});
