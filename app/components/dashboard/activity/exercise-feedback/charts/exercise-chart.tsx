import { useMemo } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

import type { ExerciseType, ExerciseFeedback } from "~/lib/exercise-analyzer";

// Estructura para almacenar el historial de feedback con timestamp
export interface FeedbackHistoryEntry extends ExerciseFeedback {
  timestamp: number; // Tiempo en milisegundos desde el inicio del video
}

interface ExerciseChartProps {
  data: FeedbackHistoryEntry[];
  exerciseType: ExerciseType;
}

// Configuración del gráfico con información sobre cada línea
const chartConfig = {
  angle: {
    label: "Ángulo",
    color: "hsl(262, 80%, 70%)", // Púrpura
  },
  reps: {
    label: "Repeticiones",
    color: "hsl(145, 63%, 60%)", // Verde
  },
  correctReps: {
    label: "Rep. Correctas",
    color: "hsl(30, 100%, 50%)", // Naranja
  },
} satisfies ChartConfig;

/**
 * Componente de gráfico especializado para visualizar datos de ejercicios
 * Muestra el ángulo de extensión y el número de repeticiones a través del tiempo
 */
export function ExerciseChart({ data, exerciseType }: ExerciseChartProps) {
  // Preparar los datos para la visualización
  const chartData = useMemo(() => {
    return data.map((entry) => ({
      timestamp: (entry.timestamp / 1000).toFixed(1), // Convertir a segundos
      angle: entry.angle,
      reps: entry.reps,
      correctReps: entry.correctReps,
    }));
  }, [data]);

  // Calcular valores máximos para mostrar en el encabezado
  const maxValues = useMemo(() => {
    if (data.length === 0) return { angle: 0, reps: 0, correctReps: 0 };

    return {
      angle: Math.max(...data.map((entry) => entry.angle)),
      reps: data[data.length - 1]?.reps || 0,
      correctReps: data[data.length - 1]?.correctReps || 0,
    };
  }, [data]);

  // Título personalizado según el tipo de ejercicio
  const exerciseTitle = useMemo(() => {
    switch (exerciseType) {
      case "bicep-curl":
        return "Curl de Bíceps";
      case "squat":
        return "Sentadilla";
      default:
        return exerciseType;
    }
  }, [exerciseType]);

  // Filtrar solo las métricas de repeticiones para mostrar en el encabezado
  const headerMetrics = useMemo(() => {
    return (Object.keys(chartConfig) as Array<keyof typeof chartConfig>).filter(
      (key) => key !== "angle"
    );
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Ejercicio: {exerciseTitle}</CardTitle>
          <CardDescription>
            Historial de rendimiento durante el ejercicio
          </CardDescription>
        </div>
        <div className="flex">
          {headerMetrics.map((key) => (
            <button
              key={key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {maxValues[key]}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              label={{
                value: "Tiempo (segundos)",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              label={{
                value: "Ángulo (grados)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["auto", "auto"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Repeticiones",
                angle: -90,
                position: "insideRight",
              }}
              domain={[0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  labelFormatter={(timestamp) => `Tiempo: ${timestamp}s`}
                />
              }
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="angle"
              stroke={`var(--color-angle)`}
              activeDot={{ r: 8 }}
              name="Ángulo"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="correctReps"
              stroke={`var(--color-correctReps)`}
              activeDot={{ r: 8 }}
              name="Rep. Correctas"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
