import { Link } from "../types/user/user.type";
import { PatientColumns } from "../types/user/patient.type";

/**
 * Maps a Link object to PatientColumns format
 *
 * @param link - The Link object to map
 * @returns PatientColumns object
 */
export function mapLinkToPatientColumns(link: Link): PatientColumns {
  // Use the complete first name without splitting
  const nombre = link.usuario.first_name;

  // Split the last name into parts - in Spanish naming conventions typically the
  // first part is paternal surname and second part is maternal surname
  const lastNameParts = link.usuario.last_name.split(" ");
  const apellidoPaterno = lastNameParts[0] || "";
  const apellidoMaterno = lastNameParts[1] || "";

  return {
    id: link.persona.id,
    nombre: nombre,
    apellidoPaterno: apellidoPaterno,
    apellidoMaterno: apellidoMaterno,
    fotoUrl: link.persona.foto_url,
    vinculacion_estado: link.vinculacion_estado,
    vinculacion_id: link.vinculacion_id,
  };
}

/**
 * Maps an array of Link objects to PatientColumns format
 *
 * @param links - Array of Link objects to map
 * @returns Array of PatientColumns objects
 */
export function mapLinksToPatientColumns(links: Link[]): PatientColumns[] {
  return links.map(mapLinkToPatientColumns);
}
