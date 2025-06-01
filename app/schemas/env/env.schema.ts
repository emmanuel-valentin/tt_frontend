import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_COOKIE_SECRET: z.string().min(32),
});
