import { z } from "zod";

export const registerFormSchema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido" }),
  apellidoPaterno: z.string({
    required_error: "El apellido paterno es requerido",
  }),
  apellidoMaterno: z.string({
    required_error: "El apellido materno es requerido",
  }),
  fechaNacimiento: z
    .string({ required_error: "La fecha de nacimiento es requerida" })
    .date(),
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .email({ message: "El correo no es válido" }),
  password: z.string({ required_error: "La contraseña es requerida" }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  passwordConfirm: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  role: z.enum(["patient", "physiotherapist"], {
    required_error: "Debes seleccionar un rol antes de continuar",
  }),
  fotoUrl: z.string().base64().optional(),
  telefono: z
    .string({ required_error: "El teléfono es requerido" })
    .min(8, { message: "El teléfono debe tener al menos 10 dígitos" })
    .max(10, { message: "El teléfono no puede tener más de 10 dígitos" }),
  cedula: z
    .string()
    .min(7, {
      message: "La cédula debe contener al menos 6 carácteres",
    })
    .optional(),
});

export const registerSchema = registerFormSchema.pick({
  nombre: true,
  apellidoPaterno: true,
  apellidoMaterno: true,
  fechaNacimiento: true,
  email: true,
  password: true,
  fotoUrl: true,
  telefono: true,
  cedula: true,
});

export const step1FormSchema = registerFormSchema
  .pick({
    nombre: true,
    apellidoPaterno: true,
    apellidoMaterno: true,
    fechaNacimiento: true,
    email: true,
    password: true,
    passwordConfirm: true,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

export const step2FormSchema = registerFormSchema.pick({
  role: true,
});

export const step3FormSchema = registerFormSchema.pick({
  fotoUrl: true,
  telefono: true,
  cedula: true,
});
