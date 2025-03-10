export interface Patient {
  id: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  estatus: EnrollmentStatus;
  fotoUrl: string;
  nombre: string;
}

export type EnrollmentStatus = 'pendiente' | 'aceptado';
