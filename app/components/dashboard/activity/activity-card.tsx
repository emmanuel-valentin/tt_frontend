import { Link } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/components/ui/card';
import { UserAvatar } from '~/components/shared/avatar/user-avatar';

import { ChevronRight } from 'lucide-react';

export function ActivityCard() {
  return (
    <Card>
      <CardHeader className="items-start">
        <Button asChild className="px-0" variant="link">
          <Link
            className="flex gap-1 items-center"
            to={`/dashboard/profile/${'1'}`}
          >
            <UserAvatar className="w-6 h-6" /* src={paciente.fotoUrl} */ />
            <span className="text-gray-500">
              {'Emmanuel'} {'Valentin'} {'Ramos'}
            </span>
          </Link>
        </Button>
      </CardHeader>

      {/* Title and description */}
      <CardContent>
        <div className="flex flex-col max-w-prose">
          <h3 className="font-medium">{'Título'}</h3>
          <p className="text-sm text-balance line-clamp-1 text-gray-600">
            {
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio velit recusandae veritatis quia similique explicabo quis quisquam optio a aliquid ipsam doloremque numquam, eaque dolores voluptatibus accusantium earum! Quos.'
            }
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button asChild>
          <Link
            className="flex-1 md:flex-none"
            to={`/dashboard/activities/${'1'}`}
          >
            Ver detalles
            <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
