import { ApiResponse } from "../shared/api-response.type";

export enum Role {
  PATIENT = "patient",
  PHYSIOTHERAPIST = "physiotherapist",
}

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
  fecha: string;
  telefono: string;
  foto_url: string | null;
}

export interface Usuario {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdateUserPayload {
  id: string;
  cedula?: string;
  codigo_token?: string;
  persona: Omit<Persona, "id">;
  usuario: Omit<Usuario, "id">;
}

export type UserPicture = {
  foto_url: string;
};

export type UserResponse = ApiResponse<UserData>;

export type Link = {
  estatus: EnrollmentStatus;
  vinculacion_id: string;
  vinculacion_estado: EnrollmentStatus;
} & UserData;

export type EnrollmentStatus = "PENDIENTE" | "VINCULADO";

export type LinkResponse = ApiResponse<Link[]>;

export type UserPictureResponse = ApiResponse<UserPicture>;
