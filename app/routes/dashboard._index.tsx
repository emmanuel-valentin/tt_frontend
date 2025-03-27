import { ActivityCard } from "~/components/dashboard/activity/activity-card";
import { PatientRequestCard } from "~/components/dashboard/user/patient-request-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DashboardHomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Inicio</CardTitle>
        <CardDescription>
          Aquí encontrarás un resumen de la actividad reciente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="grid grid-cols-12 gap-6">
          <article className="col-span-12 lg:col-span-7 space-y-6">
            <h3 className="text-lg">Resumen de actividades</h3>
            {Array.from({ length: 3 }).map((_, index) => (
              <ActivityCard key={index} />
            ))}
          </article>

          <article className="col-span-12 lg:col-span-5 space-y-6">
            <h3 className="text-lg">Solicitudes de vinculación</h3>
            {Array.from({ length: 3 }).map((_, index) => (
              <PatientRequestCard key={index} />
            ))}
          </article>
        </section>
      </CardContent>
    </Card>
  );
}
