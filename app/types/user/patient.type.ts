import { UserData } from "./user.type";

export type Patient = {
  estatus: EnrollmentStatus;
} & UserData;

export type EnrollmentStatus = "pendiente" | "aceptado";
