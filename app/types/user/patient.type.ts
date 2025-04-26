import { UserData } from "./user.type";

export type Patient = UserData;

export type PatientColumns = {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fotoUrl: string;
  vinculacion_id: string;
  vinculacion_estado: string;
};
