import { Link, useLoaderData } from "@remix-run/react";
import { ActivityCard } from "~/components/dashboard/activity/activity-card";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getActivities } from "~/services/activity/activity.service";
import { EmptyState } from "~/components/shared/views/empty-state";
import { Activity, Plus } from "lucide-react";
import { useAuthStore } from "~/store/auth.store";
import { Role } from "~/types/user/user.type";
import { Handle } from "~/types/remix/route-handle.type";
import { BreadcrumbLink } from "~/components/shared/breadcrumbs/breadcrumb-link";

export const handle: Handle = {
  breadcrumb: () => (
    <BreadcrumbLink to="/dashboard/activities" label="Mis actividades" />
  ),
};

export async function clientLoader() {
  const { serviceData, serviceError } = await getActivities();
  if (serviceError) {
    throw new Error(serviceError);
  }

  if (!serviceData) {
    throw new Error("Empty response");
  }

  return {
    activities: serviceData,
  };
}

export default function DashboardActivitiesPage() {
  const { activities } = useLoaderData<typeof clientLoader>();
  const role = useAuthStore((state) => state.userData?.rol);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle pageTitle>Actividades asignadas</CardTitle>
        {role === Role.PHYSIOTHERAPIST && (
          <Button asChild>
            <Link to="/dashboard/activities/new">
              <Plus className="h-4 w-4 mr-2" />
              Nueva actividad
            </Link>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <EmptyState
            icon={Activity}
            title="Sin actividades"
            description="No hay actividades asignadas en este momento."
            className="bg-card/50 rounded-lg border border-muted my-6"
          />
        )}
      </CardContent>
    </Card>
  );
}
