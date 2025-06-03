import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function VideoRecordingInstructions() {
  return (
    <Alert variant="info">
      <Info className="size-6" />
      <AlertTitle className="text-lg">Importante</AlertTitle>
      <AlertDescription>
        Debes considerar lo siguiente al grabar o subir tu vídeo:
        <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
          <li className="pl-1">
            Procura que el vídeo grabado o subido a la plataforma sea en un
            ambiente con la suficiente iluminación donde se pueda identificar tu
            rostro adecuadamente.
          </li>

          <li className="pl-1">
            Procura que las extremidades y/o partes del cuerpo involucradas en
            en la ejecución del ejercicio sean visibles
          </li>

          <li className="pl-1">
            Idealmente, la cámara deberá estar en una posición recta, procura
            evitar cualquier inclinación o movimiento brusco durante su
            grabación.
          </li>

          <li className="pl-1">
            Según la recomendación de tu fisioterapeuta, puedes grabar el vídeo
            utilizando pesas/barras o no.
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
