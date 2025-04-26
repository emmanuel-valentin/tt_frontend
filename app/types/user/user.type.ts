import { ApiResponse } from "../shared/api-response.type";

export interface UserData {
  id: string;
  cedula?: string;
  codigo_token?: string;
  rol: Role;
  persona: Persona;
  usuario: Usuario;
}

export interface Persona {
  id: string;
  fecha_nacimiento: string;
  telefono: string;
  foto_url: string;
}

export interface Usuario {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type Role = "patient" | "physiotherapist";

export type UserResponse = ApiResponse<UserData>;

export type Link = {
  estatus: EnrollmentStatus;
  vinculacion_id: string;
  vinculacion_estado: EnrollmentStatus;
} & UserData;

export type EnrollmentStatus = "PENDIENTE" | "VINCULADO";

export type LinkResponse = ApiResponse<Link[]>;
