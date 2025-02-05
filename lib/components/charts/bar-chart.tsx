"use client"

import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  XAxis,
  Cell,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart"


// Configuração do gráfico (usada para tooltip, por exemplo)
const chartConfig = {
  count: {
    label: "Flights",
    // Esta cor pode ser usada como fallback se necessário,
    // mas vamos definir cores individuais para cada barra.
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Paleta de cores para as barras (pode ser personalizada conforme sua necessidade)
const barColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function BarChart(props: {chartData: {registration: string, count: number}[]}) {
  const { chartData } = props
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Flights by Aircraft</CardTitle>
        <CardDescription>Distribution of flights by aircraft</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ReBarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="registration"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // Exemplo de formatação para exibir apenas as 3 primeiras letras:
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </ReBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
