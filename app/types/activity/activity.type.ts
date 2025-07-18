import { ExerciseType } from "~/lib/exercise-analyzer";
import { ApiResponse } from "../shared/api-response.type";

export type Exercise = {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  url_video: string;
};

export type HumanFeedback = {
  id: string;
  feedback: string;
  feedback_audio?: string;
  feedback_imagen?: string;
};

export type ExercisesResponse = ApiResponse<Exercise[]>;

export interface Activity {
  id: string;
  nombre: string;
  descripcion: string;
  fechaAsignada: Date;
  fechaLimite: Date;
  estado: string;
  urlVideo: string;
  paciente: Paciente;
  feedback: HumanFeedback[];
  fisioterapeuta: Fisioterapeuta;
  ejercicioId: string;
  tipo: ExerciseType;
}

export interface Fisioterapeuta {
  id: string;
  persona_id: string;
  fotoUrl: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
}

export interface Paciente {
  id: string;
  persona_id: string;
  fotoUrl: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  urlVideoPaciente: string | null;
}

export type ActivitiesResponse = ApiResponse<Activity[]>;
export type ActivityResponse = ApiResponse<Activity>;
