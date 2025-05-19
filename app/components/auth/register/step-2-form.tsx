import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";

import {
  clientAction,
  clientLoader,
} from "~/routes/auth.register_.select-role";

import { Button } from "~/components/ui/button";
import { ErrorAlert } from "~/components/shared/alert/error-alert";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { Stethoscope, User2 } from "lucide-react";
import { Role } from "~/types/user/user.type";

export function Step2Form() {
  const actionData = useActionData<typeof clientAction>();
  const loaderData = useLoaderData<typeof clientLoader>();
  const errors = actionData?.errors;

  return (
    <Form className="flex flex-col gap-6" method="post">
      {errors?.role && <ErrorAlert message={errors.role[0]} title="Error" />}

      <RadioGroup
        className="flex flex-col gap-4"
        defaultValue={loaderData?.role}
        name="role"
        // required
      >
        <div>
          <RadioGroupItem
            value={Role.PATIENT}
            id="patient"
            className="peer sr-only"
            aria-label="Paciente"
          />
          <Label
            htmlFor="patient"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent text-foreground/80 p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
          >
            <User2 className="w-20 h-20" />
            <p className="text-xl peer-data-[state=checked]:text-primary mb-6">
              Soy un paciente
            </p>
            <p className="text-sm max-w-prose text-foreground/80">
              Como fisioterapeuta podrás vincularte con pacientes, asignar,
              revisar y proporcionar retroalimentación a los ejercicios
              realizados con tu pacientes.
            </p>
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value={Role.PHYSIOTHERAPIST}
            id="physiotherapist"
            className="peer sr-only"
            aria-label="Fisioterapeuta"
          />
          <Label
            htmlFor="physiotherapist"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent text-foreground/80 p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
          >
            <Stethoscope className="w-20 h-20" />
            <p className="text-xl peer-data-[state=checked]:text-primary mb-6">
              Soy un fisioterapeuta
            </p>
            <p className="text-sm max-w-prose text-foreground/80">
              Como paciente, tendrás que vincularte a un fisioterapeuta para que
              sea posible asignarte y realizar ejercicios.
            </p>
          </Label>
        </div>
      </RadioGroup>

      <div className="flex flex-col-reverse md:flex-row gap-2">
        <Button className="flex-1" variant="secondary" asChild>
          <Link to="/auth/register" replace>
            Atrás
          </Link>
        </Button>

        <Button className="flex-1" type="submit">
          Continuar
        </Button>
      </div>
    </Form>
  );
}
