import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Step1Form } from "~/components/auth/register/step-1-form";

export default function RegisterBasicInfoPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crea una nueva cuenta</CardTitle>
        <CardDescription>
          En esta sección requerimos información básica de tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Step1Form />
      </CardContent>
    </Card>
  );
}
