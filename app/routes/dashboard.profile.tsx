import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

import { UpdateProfileForm } from '~/components/dashboard/profile/update-profile-form';
import { UserAvatar } from '~/components/shared/avatar/user-avatar';

export default function DashboardMyProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Mi perfil</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start  gap-4 mb-6">
          <UserAvatar className="w-16 h-16" />
          <div className="text-center md:text-start">
            <p className="text-xl tracking-tight line-clamp-1">
              {'Emmanuel Guadalupe Valentin Valentin'}
            </p>
            <Badge capitalize>{'paciente'}</Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          Detalles personales
        </h3>

        <Separator className="mb-4" />

        <UpdateProfileForm />
      </CardContent>
    </Card>
  );
}
