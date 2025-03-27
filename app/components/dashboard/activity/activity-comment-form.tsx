import { Form } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

import { Send } from "lucide-react";
import { Input } from "~/components/ui/input";

export function ActivityCommentForm() {
  return (
    <div className="mt-6">
      <Form className="flex gap-1">
        <div className="grid w-full gap-1.5">
          <Label className="sr-only" htmlFor="comment">
            Agregar un comentario
          </Label>
          <Input
            id="comment"
            name="comment"
            placeholder="Escribe un comentario..."
          />
        </div>
        <Button
          name="intent"
          type="submit"
          value="comment"
          size="icon"
          className="w-20"
        >
          <Send />
        </Button>
      </Form>
    </div>
  );
}
