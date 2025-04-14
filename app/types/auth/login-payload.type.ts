import { z } from "zod";
import { loginSchema } from "~/schemas/auth/login.schema";

export type LoginCredentials = z.infer<typeof loginSchema>;
