import { Form } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import { Send } from "lucide-react";

export function ActivityCommentForm() {
  return (
    <div className="mt-6">
      <Form className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">Agregar un comentario</Label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Escribe tu comentario aquí..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="w-full sm:w-auto"
            name="intent"
            type="submit"
            value="comment"
          >
            Publicar comentario
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Form>
    </div>
  );
}
