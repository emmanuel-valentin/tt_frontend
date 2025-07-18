import { useLoaderData } from "@remix-run/react";
import { ActivityCard } from "~/components/dashboard/activity/activity-card";
import { PatientRequestCard } from "~/components/dashboard/user/patient-request-card";
import { EmptyState } from "~/components/shared/views/empty-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Activity, Users } from "lucide-react";
import { getPendingPatientLinks } from "~/services/user/physiotherapist/physiotherapist.service";
import { getActivities } from "~/services/activity/activity.service";
import { useAuthStore } from "~/store/auth.store";
import { cn } from "~/lib/utils";
import { Role } from "~/types/user/user.type";

export async function clientLoader() {
  const responses = await Promise.all([
    getPendingPatientLinks(),
    getActivities(),
  ]);

  const [pendingPatientLinks, activities] = responses;

  if (pendingPatientLinks.serviceError) {
    throw new Error(pendingPatientLinks.serviceError);
  }

  if (activities.serviceError) {
    throw new Error(activities.serviceError);
  }

  return {
    activities: activities.serviceData,
    pendingPatientLinks: pendingPatientLinks.serviceData,
  };
}

export default function DashboardHomePage() {
  const { activities, pendingPatientLinks } =
    useLoaderData<typeof clientLoader>();
  const role = useAuthStore((state) => state.userData?.rol);

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
          <article
            className={cn("col-span-12 lg:col-span-12 space-y-6", {
              "lg:col-span-7": role === Role.PHYSIOTHERAPIST,
            })}
          >
            <h3 className="text-lg">Resumen de actividades</h3>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState
                icon={Activity}
                title="Sin actividades"
                description="No hay actividades para mostrar en este momento."
                className="bg-card/50 rounded-lg border border-muted my-6"
              />
            )}
          </article>

          {role === Role.PHYSIOTHERAPIST && (
            <article className="col-span-12 lg:col-span-5 space-y-6">
              <h3 className="text-lg">Solicitudes de vinculación</h3>
              {pendingPatientLinks && pendingPatientLinks.length > 0 ? (
                pendingPatientLinks.map((link) => (
                  <PatientRequestCard key={link.vinculacion_id} link={link} />
                ))
              ) : (
                <EmptyState
                  icon={Users}
                  title="Sin solicitudes"
                  description="No hay solicitudes de vinculación pendientes."
                  className="bg-card/50 rounded-lg border border-muted my-6"
                />
              )}
            </article>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
