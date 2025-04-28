import { useLoaderData } from "@remix-run/react";
import { ActivityCard } from "~/components/dashboard/activity/activity-card";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getActivities } from "~/services/activity/activity.service";
import { EmptyState } from "~/components/shared/views/empty-state";
import { Activity } from "lucide-react";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Actividades asignadas</CardTitle>
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
