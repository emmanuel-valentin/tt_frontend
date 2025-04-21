import { ApiResponse } from "../shared/api-response.type";

export interface UserData {
  id: number;
  cedula?: string;
  codigo_token?: string;
  rol: Role;
  persona: Persona;
  usuario: Usuario;
}

export interface Persona {
  id: number;
  fecha_nacimiento: string;
  telefono: string;
  foto_url: string;
}

export interface Usuario {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type Role = "patient" | "physiotherapist";

export type UserResponse = ApiResponse<UserData>;
