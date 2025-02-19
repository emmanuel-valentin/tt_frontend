import type { MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fisiogo' },
    { name: 'description', content: 'Tu app de rehabilitación' },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <p>Hello World!</p>

      <div className="flex gap-2">
        <Button>Go to Dashboard</Button>
        <Button>Go to Auth</Button>
      </div>
    </div>
  );
}
