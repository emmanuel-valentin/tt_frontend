import { Link } from "../types/user/user.type";
import { PhysiotherapistColumns } from "../types/user/physiotherapist.type";

/**
 * Maps a Link object to PhysiotherapistColums format
 *
 * @param link - The Link object to map
 * @returns PhysiotherapistColums object
 */
export function mapLinkToPhysiotherapistColumns(
  link: Link
): PhysiotherapistColumns {
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
    cedula: link.cedula || "",
    fotoUrl: link.persona.foto_url,
    vinculacion_estado: link.vinculacion_estado,
    vinculacion_id: link.vinculacion_id,
  };
}

/**
 * Maps an array of Link objects to PhysiotherapistColums format
 *
 * @param links - Array of Link objects to map
 * @returns Array of PhysiotherapistColums objects
 */
export function mapLinksToPhysiotherapistColumns(
  links: Link[]
): PhysiotherapistColumns[] {
  return links.map(mapLinkToPhysiotherapistColumns);
}
