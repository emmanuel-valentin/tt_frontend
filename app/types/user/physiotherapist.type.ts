import { UserData } from "./user.type";

export type Physiotherapist = {
  cedula: string;
} & UserData;

export type PhysiotherapistColumns = {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cedula: string;
  fotoUrl: string;
  vinculacion_id: string;
  vinculacion_estado: string;
};
