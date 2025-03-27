import { User } from "./user.type";

export type Patient = {
  estatus: EnrollmentStatus;
} & User;

export type EnrollmentStatus = "pendiente" | "aceptado";
