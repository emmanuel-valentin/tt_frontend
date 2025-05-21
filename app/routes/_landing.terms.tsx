import { Link } from "@remix-run/react";

export default function TermsPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl tracking-tight leading-none my-4">
        Términos y condiciones
      </h1>

      <div className="space-y-8 text-balance">
        <div className="bg-card">
          <p className="leading-relaxed">
            Los siguientes Términos y Condiciones (en adelante,
            &quot;Términos&quot;) rigen el uso de la plataforma{" "}
            <strong className="text-primary">
              PROTOTIPO DE SOFTWARE COMO HERRAMIENTA PARA DAR SEGUIMIENTO A
              PACIENTES DE FISIOTERAPIA ENFOCADO A LAS EXTREMIDADES MEDIANTE
              RECONOCIMIENTO DE IMÁGENES
            </strong>{" "}
            (en adelante, &quot;la Plataforma&quot;) y todos los servicios
            proporcionados a través de la misma. Al acceder, registrarte o usar
            la Plataforma, aceptas estar sujeto a estos Términos, así como a
            nuestra Política de Privacidad, que forma parte integral de este
            acuerdo. Si no estás de acuerdo con estos Términos, no uses la
            Plataforma.
          </p>
        </div>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            1. Aceptación de los Términos
          </h2>
          <p className="leading-relaxed">
            Al acceder a la Plataforma y usar nuestros servicios, aceptas estar
            legalmente obligado por estos Términos. Si no estás de acuerdo con
            cualquiera de los términos, no accedas a la Plataforma ni utilices
            los servicios.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            2. Uso de la Plataforma
          </h2>
          <p className="leading-relaxed">
            Esta Plataforma está dirigida exclusivamente a pacientes con
            lesiones en brazos o piernas, en un rango de edad de 18 a 30 años.
            Además, está destinada a fisioterapeutas con cédula profesional
            registrada.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            3. Registro de Usuario
          </h2>
          <p className="leading-relaxed">
            Para acceder a ciertos servicios de la Plataforma, se te pedirá que
            crees una cuenta. Durante el proceso de registro, deberás
            proporcionar información veraz y completa, y actualizarla cuando sea
            necesario. Eres responsable de mantener la confidencialidad de tu
            cuenta y contraseña.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            4. Obligaciones de los Usuarios
          </h2>
          <p className="leading-relaxed mb-3">
            Como usuario de la Plataforma, te comprometes a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="leading-relaxed">
              No hacer uso indebido de la Plataforma, incluyendo actividades que
              puedan dañar la seguridad o privacidad de otros usuarios.
            </li>
            <li className="leading-relaxed">
              No transmitir virus, malware u otros códigos que puedan dañar o
              interferir con el funcionamiento de la Plataforma.
            </li>
            <li className="leading-relaxed">
              No compartir, distribuir ni reproducir contenido de la Plataforma
              sin la debida autorización.
            </li>
          </ul>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            5. Propiedad Intelectual
          </h2>
          <p className="leading-relaxed">
            Todos los contenidos, materiales, marcas registradas, logos y demás
            elementos de la Plataforma son propiedad de{" "}
            <strong className="text-primary">IPN ESCOM</strong> o sus
            licenciantes. Queda estrictamente prohibido el uso no autorizado de
            cualquier contenido sin el permiso expreso de los propietarios de
            los derechos de autor.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            6. Política de Privacidad
          </h2>
          <p className="leading-relaxed">
            Tu privacidad es muy importante para nosotros. Consulta nuestra{" "}
            <Link
              to="/privacy"
              className="text-primary hover:underline font-medium"
            >
              Política de Privacidad
            </Link>{" "}
            para conocer cómo recopilamos, usamos y protegemos tu información
            personal.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            7. Responsabilidad
          </h2>
          <p className="leading-relaxed">
            La Plataforma se proporciona &quot;tal cual&quot; y no garantizamos
            su disponibilidad, accesibilidad o funcionalidad en todo momento. No
            nos hacemos responsables de los daños o perjuicios derivados del uso
            o la imposibilidad de uso de la Plataforma, incluidos los errores,
            fallos técnicos o interrupciones.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            8. Modificaciones a los Términos
          </h2>
          <p className="leading-relaxed">
            Nos reservamos el derecho de modificar estos Términos en cualquier
            momento. Te notificaremos sobre cualquier cambio sustancial mediante
            una actualización en esta página. Es tu responsabilidad revisar
            periódicamente estos Términos. El uso continuado de la Plataforma
            después de dichos cambios constituye tu aceptación de los Términos
            modificados.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            9. Terminación
          </h2>
          <p className="leading-relaxed">
            Podemos suspender o terminar tu acceso a la Plataforma en cualquier
            momento, sin previo aviso, si violas estos Términos o por cualquier
            otra razón que consideremos necesaria.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            10. Ley Aplicable y Jurisdicción
          </h2>
          <p className="leading-relaxed">
            Estos Términos se regirán por las leyes del México, y cualquier
            disputa que surja en relación con los mismos será resuelta en los
            tribunales de la Ciudad de México, México.
          </p>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            11. Contacto
          </h2>
          <p className="leading-relaxed">
            Si tienes preguntas sobre estos Términos, puedes ponerte en contacto
            con nosotros a través de{" "}
            <a
              href="mailto:soporte@fisioayuda.com"
              className="text-primary hover:underline font-medium"
            >
              soporte@fisioayuda.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
