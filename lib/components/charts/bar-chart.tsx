"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {
  BarChart as ReBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

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
 * Props para o nosso gráfico de barras dinâmico,
 * seguindo o mesmo padrão das versões "DynamicPieChart" e "DynamicAreaChart".
 */
interface DynamicBarChartProps {
  /**
   * Array de objetos contendo os dados a serem exibidos no gráfico.
   * Ex.: [{ month: "January", desktop: 186, mobile: 80 }, ...]
   */
  data: Record<string, any>[]

  /**
   * A chave que representa o campo categórico (eixo X).
   * Padrão: "name".
   */
  nameKey?: string

  /**
   * Lista de chaves numéricas que serão plotadas como barras.
   * Ex.: ["desktop", "mobile"], ["value1", "value2"], ...
   */
  numericKeys?: string[]

  /**
   * Objeto de configuração para cores/labels no estilo do shadcn ChartConfig.
   * Ex.:
   * {
   *   desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
   *   mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
   * }
   */
  config?: ChartConfig

  /**
   * Título exibido no Card.
   */
  title?: string

  /**
   * Descrição exibida abaixo do título.
   */
  description?: string

  /**
   * Texto sobre tendência no footer (ex.: "Trending up by 5.2%...").
   */
  trendingLabel?: string

  /**
   * Texto adicional exibido no footer (ex.: "January - June 2024").
   */
  footerLabel?: string

  /**
   * Classe adicional para customizar o estilo do Card, se desejado.
   */
  className?: string

  /**
   * Raio das barras, para bordas arredondadas. Padrão = 4.
   */
  barRadius?: number

  /**
   * Função para formatar o texto do eixo X.
   * Ex.: (value) => value.slice(0, 3).
   */
  xAxisFormatter?: (value: any) => string
}

/**
 * Componente de gráfico de barras dinâmico (múltiplas chaves),
 * com estrutura de Card, título, descrição e footer,
 * no mesmo estilo do DynamicPieChart / DynamicAreaChart.
 */
export function BarChart({
  data,
  nameKey = "name",
  numericKeys = ["value"],
  config,
  title = "Bar Chart - Multiple",
  description = "January - June 2024",
  trendingLabel = "Trending up by 5.2% this month",
  footerLabel = "Showing total visitors for the last 6 months",
  className = "",
  barRadius = 4,
  xAxisFormatter,
}: DynamicBarChartProps) {
  // Cores padrão, caso não seja fornecido um config ou cores nele.
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
   * Montamos um ChartConfig dinâmico unindo o config passado (se houver)
   * com cores de fallback caso o usuário não defina.
   */
  const dynamicChartConfig: ChartConfig = React.useMemo(() => {
    const result: ChartConfig = {}

    numericKeys.forEach((key, index) => {
      const color =
        config?.[key]?.color ?? defaultColors[index % defaultColors.length]
      result[key] = {
        label: config?.[key]?.label ?? key,
        color,
      }
    })

    // Sobrescreve tudo que tinha em config para ter
    // certeza que as cores ficam consistentes.
    return {
      ...config,
      ...result,
    }
  }, [numericKeys, config, defaultColors])

  /**
   * Renderiza <Bar> para cada chave numérica.
   */
  const renderBars = () => {
    return numericKeys.map((key, index) => {
      const color = dynamicChartConfig[key]?.color ?? defaultColors[index]
      return (
        <Bar
          key={key}
          dataKey={key}
          fill={color}
          radius={barRadius}
        />
      )
    })
  }

  /**
   * Formata o valor do eixo X (categorias),
   * caso seja passada uma função customizada.
   */
  const formatXAxis = (value: any) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value)
    }
    // Fallback: converte em string
    return String(value)
  }

  return (
    <Card className={`flex flex-col w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicChartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={nameKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={formatXAxis}
              />
              {/* Caso queira exibir os valores do eixo Y, descomente o YAxis. */}
              {/* <YAxis /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {renderBars()}
            </ReBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
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
