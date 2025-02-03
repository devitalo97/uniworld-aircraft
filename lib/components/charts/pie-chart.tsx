"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart as RePieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart"

/**
 * Definimos a interface das props para facilitar a personalização
 * e reuso do componente.
 */
interface DynamicPieChartProps {
  /**
   * Array de objetos para o gráfico.
   * Exemplo de item: { name: "Chrome", value: 275 } ou { browser: "Chrome", visitors: 275 }
   */
  data: Record<string, any>[]

  /**
   * Nome do campo que representa o valor numérico dos dados do gráfico.
   * Ex: "visitors", "value", "quantidade", etc.
   */
  dataKey?: string

  /**
   * Nome do campo que representa a categoria/legenda dos dados.
   * Ex: "browser", "name", "produto", etc.
   */
  nameKey?: string

  /**
   * Título exibido no Card.
   */
  title?: string

  /**
   * Descrição exibida abaixo do título no Card.
   */
  description?: string

  /**
   * Texto de tendência (ex.: "Trending up by 5.2%...").
   */
  trendingLabel?: string

  /**
   * Texto exibido no footer (descrição adicional).
   */
  footerLabel?: string

  /**
   * Classe adicional se quiser customizar o style do Card.
   */
  className?: string
}

/**
 * Componente de Gráfico de Pizza (Donut) dinâmico.
 */
export function PieChart({
  data,
  dataKey = "value",
  nameKey = "name",
  title = "Pie Chart - Donut",
  description = "January - June 2024",
  trendingLabel = "Trending up by 5.2% this month",
  footerLabel = "Showing total visitors for the last 6 months",
  className = "",
}: DynamicPieChartProps) {
  /**
   * Cores padrão para o gráfico. Você pode adicionar mais cores
   * ou alterá-las conforme sua necessidade.
   */
  const defaultColors = React.useMemo(
    () => [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--chart-6))",
    ],
    []
  )

  /**
   * Geramos dinamicamente um ChartConfig com base nos itens do array.
   * Isso permite que cada categoria receba uma cor e um label apropriado.
   */
  const dynamicChartConfig = React.useMemo(() => {
    return data.reduce((acc, item, index) => {
      const categoryKey = item[nameKey]

      if (categoryKey && typeof categoryKey === "string") {
        acc[categoryKey] = {
          label: categoryKey,
          color: defaultColors[index % defaultColors.length],
        }
      }

      return acc
    }, {
      [dataKey]: { label: dataKey },
    } as ChartConfig)
  }, [data, dataKey, nameKey, defaultColors])

  /**
   * Mapeamos o array para garantir que cada item tenha a propriedade `fill`.
   * Assim o Recharts consegue pintar cada fatia com a cor adequada.
   */
  const chartDataWithFill = React.useMemo(
    () =>
      data.map((item, index) => {
        const fillColor = defaultColors[index % defaultColors.length]
        return {
          ...item,
          fill: item.fill ?? fillColor,
        }
      }),
    [data, defaultColors]
  )

  return (
    <Card className={`flex flex-col w-full ${className}`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={dynamicChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RePieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataWithFill}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
            />
          </RePieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trendingLabel}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {footerLabel}
        </div>
      </CardFooter>
    </Card>
  )
}
