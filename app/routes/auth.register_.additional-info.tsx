import { useLoaderData } from "@remix-run/react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "~/components/ui/card";

import { Step3Form } from "~/components/auth/register/step-3-form";

type Role = "patient" | "physiotherapist";

export function loader() {
  return {
    role: "patient" as Role,
  };
}

export default function RegisterSelectRolePage() {
  const { role } = useLoaderData<typeof loader>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Por último...</CardTitle>
        <CardDescription>Solo necesitamos unas cosas más</CardDescription>
      </CardHeader>
      <CardContent>
        <Step3Form role={role} />
      </CardContent>
    </Card>
  );
}
