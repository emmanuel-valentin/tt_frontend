import { envSchema } from "~/schemas/env/env.schema";

const { success, data, error } = envSchema.safeParse(import.meta.env);

if (!success) {
  throw new Error(
    `Environment validation failed: Missing or invalid environment variables: ${error.message}`
  );
}

export const { VITE_API_URL: apiUrl, VITE_COOKIE_SECRET: cookieSecret } = data;
