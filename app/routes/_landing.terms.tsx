import { Link } from "@remix-run/react";
import {
  FileText,
  Users,
  UserPlus,
  Shield,
  Copyright,
  Lock,
  AlertTriangle,
  Edit,
  Ban,
  Scale,
  Mail,
  ExternalLink,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
            Términos y Condiciones de Uso
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="bg-card rounded-xl shadow-sm border p-8 mb-8">
          <p className="text-foreground leading-relaxed text-lg">
            Los presentes Términos y Condiciones de Uso (en adelante,
            &ldquo;Términos&rdquo;) regulan el acceso y utilización de la
            plataforma digital{" "}
            <span className="font-semibold">
              PROTOTIPO DE SOFTWARE COMO HERRAMIENTA PARA DAR SEGUIMIENTO A
              PACIENTES DE FISIOTERAPIA ENFOCADO A LAS EXTREMIDADES MEDIANTE
              RECONOCIMIENTO DE IMÁGENES
            </span>{" "}
            (en adelante, &ldquo;la Plataforma&rdquo;) y los servicios asociados
            a la misma. El acceso, registro o uso de la Plataforma implica la
            aceptación plena e incondicional de estos Términos, así como de
            nuestra Política de Privacidad, que constituyen un acuerdo
            jurídicamente vinculante. En caso de no estar conforme con estos
            Términos, se recomienda abstenerse del uso de la Plataforma.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="1"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                1. Aceptación y Vigencia de los Términos
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        El acceso y uso de la Plataforma constituye la
                        aceptación expresa e incondicional de estos Términos por
                        parte del usuario. La utilización continuada de los
                        servicios implica el conocimiento y conformidad con las
                        disposiciones aquí establecidas. En caso de desacuerdo
                        con cualquier disposición, el usuario deberá cesar
                        inmediatamente el uso de la Plataforma.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="2"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                2. Ámbito de Aplicación y Usuarios Elegibles
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed mb-4">
                        La Plataforma está diseñada exclusivamente para brindar
                        servicios a:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <p className="text-foreground">
                            <span className="font-medium">Pacientes</span> con
                            lesiones en extremidades superiores o inferiores, en
                            el rango etario de 18 a 30 años de edad.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <p className="text-foreground">
                            <span className="font-medium">
                              Profesionales de fisioterapia
                            </span>{" "}
                            debidamente acreditados con cédula profesional
                            vigente y registrada ante las autoridades
                            competentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <p className="text-foreground font-medium">
                      El uso por parte de personas que no cumplan con estos
                      criterios queda expresamente prohibido.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="3"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                3. Registro y Gestión de Cuentas de Usuario
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div className="w-full">
                      <p className="text-foreground leading-relaxed mb-4">
                        Para acceder a los servicios de la Plataforma, es
                        necesario completar el proceso de registro
                        proporcionando información veraz, exacta, actualizada y
                        completa. El usuario se compromete a:
                      </p>
                      <div className="space-y-2">
                        {[
                          "Mantener actualizada la información de su perfil",
                          "Preservar la confidencialidad de sus credenciales de acceso",
                          "Notificar inmediatamente cualquier uso no autorizado de su cuenta",
                          "Asumir la responsabilidad por todas las actividades realizadas bajo su cuenta",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                            <p className="text-foreground text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="4"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                4. Obligaciones y Responsabilidades del Usuario
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="w-full">
                      <p className="text-foreground leading-relaxed mb-4">
                        El usuario se compromete expresamente a hacer un uso
                        apropiado de la Plataforma, absteniéndose de realizar
                        las siguientes conductas:
                      </p>
                      <div className="space-y-3">
                        {[
                          "Utilizar la Plataforma de manera que pueda comprometer la seguridad, privacidad o integridad de otros usuarios o del sistema.",
                          "Introducir, transmitir o distribuir virus informáticos, malware o cualquier código malicioso que pueda dañar o interferir con el funcionamiento de la Plataforma.",
                          "Reproducir, distribuir, modificar o comercializar contenidos de la Plataforma sin la previa autorización expresa y por escrito de los titulares de los derechos correspondientes.",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-destructive rounded-full mt-2"></div>
                            <p className="text-foreground text-sm leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="5"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                5. Derechos de Propiedad Intelectual
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Copyright className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        Todos los elementos que integran la Plataforma,
                        incluyendo pero no limitándose a contenidos, diseños,
                        textos, gráficos, imágenes, código fuente, marcas
                        registradas, logotipos y demás elementos distintivos,
                        son propiedad exclusiva del{" "}
                        <span className="font-semibold">
                          Instituto Politécnico Nacional - Escuela Superior de
                          Cómputo (IPN ESCOM)
                        </span>{" "}
                        o de sus respectivos licenciantes. Queda terminantemente
                        prohibida cualquier forma de uso, reproducción,
                        distribución, transformación o comercialización sin la
                        autorización previa, expresa y por escrito de los
                        titulares de los derechos de propiedad intelectual.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="6"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                6. Tratamiento de Datos Personales
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        La protección de su privacidad constituye una prioridad
                        fundamental para nosotros. Le invitamos a consultar
                        nuestra{" "}
                        <Link
                          to="/privacy"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium underline decoration-2 underline-offset-2 transition-colors"
                        >
                          Política de Privacidad
                          <ExternalLink className="w-4 h-4" />
                        </Link>{" "}
                        para obtener información detallada sobre los
                        procedimientos de recopilación, tratamiento,
                        almacenamiento y protección de su información personal,
                        así como sobre el ejercicio de sus derechos como titular
                        de datos personales.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="7"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                7. Limitación de Responsabilidad
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        La Plataforma se proporciona &ldquo;tal como está&rdquo;
                        y &ldquo;según disponibilidad&rdquo;. No garantizamos la
                        disponibilidad ininterrumpida, accesibilidad o
                        funcionalidad óptima del servicio en todo momento. En
                        consecuencia, no asumimos responsabilidad alguna por
                        daños directos, indirectos, incidentales, especiales o
                        consecuenciales que puedan derivarse del uso o la
                        imposibilidad de uso de la Plataforma, incluyendo
                        errores, fallas técnicas, interrupciones del servicio o
                        pérdida de datos.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="8"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                8. Modificaciones de los Términos y Condiciones
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Edit className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        Nos reservamos el derecho de modificar, actualizar o
                        revisar estos Términos en cualquier momento y sin previo
                        aviso. Las modificaciones sustanciales serán comunicadas
                        a los usuarios mediante notificación en la Plataforma o
                        por otros medios apropiados. Es responsabilidad del
                        usuario revisar periódicamente estos Términos para
                        mantenerse informado sobre cualquier cambio. La
                        continuación en el uso de la Plataforma posterior a la
                        publicación de modificaciones constituye la aceptación
                        tácita de los Términos actualizados.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="9"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                9. Suspensión y Terminación del Servicio
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <Ban className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        Nos reservamos el derecho de suspender, restringir o
                        terminar definitivamente el acceso de cualquier usuario
                        a la Plataforma, de forma temporal o permanente, con o
                        sin previo aviso, en los siguientes casos:
                        incumplimiento de estos Términos, uso indebido de los
                        servicios, actividades que comprometan la seguridad del
                        sistema, o cuando sea necesario para salvaguardar la
                        integridad de la Plataforma y la seguridad de nuestra
                        comunidad de usuarios.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="10"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                10. Legislación Aplicable y Resolución de Controversias
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        Estos Términos se regirán e interpretarán de conformidad
                        con las leyes de los{" "}
                        <span className="font-semibold">
                          Estados Unidos Mexicanos
                        </span>
                        . Para la resolución de cualquier controversia,
                        conflicto o reclamación que surja de la interpretación,
                        cumplimiento o incumplimiento de estos Términos, las
                        partes se someten expresamente a la jurisdicción y
                        competencia de los tribunales competentes de la{" "}
                        <span className="font-semibold">
                          Ciudad de México, México
                        </span>
                        , renunciando a cualquier otro fuero que pudiera
                        corresponderles.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="11"
              className="bg-card rounded-xl shadow-sm border overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground text-lg">
                11. Contacto y Comunicaciones
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                <div className="p-4 bg-primary/10 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-foreground leading-relaxed">
                        Para consultas, comentarios o solicitudes relacionadas
                        con estos Términos y Condiciones, así como para el
                        ejercicio de derechos o la resolución de dudas sobre el
                        uso de la Plataforma, puede comunicarse con nuestro
                        equipo de atención al usuario a través de{" "}
                        <a
                          href="mailto:soporte@fisioayuda.com"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium underline decoration-2 underline-offset-2 transition-colors"
                        >
                          soporte@fisioayuda.com
                          <Mail className="w-4 h-4" />
                        </a>
                        . Nos comprometemos a brindar respuesta oportuna a sus
                        consultas.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
