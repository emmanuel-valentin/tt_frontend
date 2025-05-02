import { envSchema } from "~/schemas/env/env.schema";

const { success, data } = envSchema.safeParse(import.meta.env);

if (!success) {
  throw new Error(
    "Environment validation failed: Missing or invalid environment variables"
  );
}

export const { VITE_API_URL: apiUrl } = data;
