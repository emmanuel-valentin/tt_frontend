import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '~/components/ui/card';

import { Step2Form } from '~/components/auth/register/step-2-form';

export default function RegisterSelectRolePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Hola, {'Emmanuel'}!</CardTitle>
        <CardDescription>
          Ahora, selecciona un rol para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Step2Form />
      </CardContent>
    </Card>
  );
}
