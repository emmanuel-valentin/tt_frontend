import { ActivityCard } from '~/components/dashboard/activity/activity-card';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function DashboardActivitiesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Actividades asignadas</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <ActivityCard key={i} />
        ))}
      </CardContent>
    </Card>
  );
}
