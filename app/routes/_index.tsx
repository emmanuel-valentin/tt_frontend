import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fisiogo' },
    { name: 'description', content: 'Tu app de rehabilitación' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      Hello World!
    </div>
  );
}
