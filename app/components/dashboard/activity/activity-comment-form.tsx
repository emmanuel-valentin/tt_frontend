import { useFetcher } from "@remix-run/react";
import { useRef, useEffect } from "react"; // Import useRef and useEffect

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input"; // Corrected import path if needed

import { Send } from "lucide-react";
import { Activity } from "~/types/activity/activity.type";

interface Props {
  activity: Activity;
}

export function ActivityCommentForm({ activity }: Props) {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data != null &&
      inputRef.current?.value
    ) {
      inputRef.current.value = "";
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="mt-6">
      <fetcher.Form className="flex gap-1" method="POST">
        <Input type="hidden" name="ejercicio_asignado_id" value={activity.id} />
        <div className="grid w-full gap-1.5">
          <Label className="sr-only" htmlFor="comment">
            Agregar un comentario
          </Label>
          <Input
            ref={inputRef}
            id="feedback"
            name="feedback"
            placeholder="Escribe un comentario..."
            disabled={isSubmitting}
          />
        </div>
        <Button
          name="intent"
          type="submit"
          value="comment"
          size="icon"
          className="w-20"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : <Send />}
        </Button>
      </fetcher.Form>
    </div>
  );
}
