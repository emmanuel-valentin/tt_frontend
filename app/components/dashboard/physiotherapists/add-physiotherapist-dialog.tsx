import { Form } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "~/components/ui/responsive-dialog";
import { cn } from "~/lib/utils";

export function AddPhysiotherapistDialog() {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button className="w-full">
          Añadir terapeuta
          <Plus />
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader className="text-left">
          <ResponsiveDialogTitle>
            Añadir un nuevo fisioterapeuta
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Podrás visualizar a tu fisioterapeuta una vez que tu solicitud haya
            sido aceptada.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <AddPhysiotherapistForm className="px-4 md:px-0" />

        <ResponsiveDialogFooter className="md:hidden">
          <ResponsiveDialogClose asChild>
            <Button className="w-full" variant="ghost">
              Cancelar
            </Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

function AddPhysiotherapistForm({ className }: React.ComponentProps<"form">) {
  return (
    <Form className={cn("grid items-start gap-4", className)} method="POST">
      <div className="grid gap-2">
        <Label htmlFor="codigoVinculacion">Código de vinculación</Label>
        <Input name="codigoVinculacion" type="text" required />
      </div>

      <ResponsiveDialogClose asChild>
        <Button type="submit">Enviar solicitud</Button>
      </ResponsiveDialogClose>
    </Form>
  );
}
