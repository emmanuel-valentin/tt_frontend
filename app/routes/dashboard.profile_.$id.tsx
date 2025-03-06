import { UserDetails } from '~/components/dashboard/profile/user-details';
import { UserAvatar } from '~/components/shared/avatar/user-avatar';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

export default function DashboardProfileDetailsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <UserAvatar className="w-16 h-16" />
          <div className="text-center md:text-start">
            <p className="text-xl tracking-tight line-clamp-1">
              {'Emmanuel Guadalupe Valentin Valentin'}
            </p>
            <Badge capitalize>{'paciente'}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold tracking-tight">
          Detalles personales
        </h3>

        <Separator className="mb-4" />

        <UserDetails />
      </CardContent>
    </Card>
  );
}
