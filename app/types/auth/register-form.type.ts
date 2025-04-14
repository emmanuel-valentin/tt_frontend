import { z } from "zod";
import {
  registerFormSchema,
  registerSchema,
  step1FormSchema,
  step2FormSchema,
  step3FormSchema,
} from "~/schemas/auth/register.schema";

export type RegisterForm = z.infer<typeof registerFormSchema>;
export type RegisterFormStep1 = z.infer<typeof step1FormSchema>;
export type RegisterFormStep2 = z.infer<typeof step2FormSchema>;
export type RegisterFormStep3 = z.infer<typeof step3FormSchema>;

export type RegisterData = z.infer<typeof registerSchema>;
