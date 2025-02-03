"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {
  AreaChart as ReAreaChart,
  Area,
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
 * Definimos as props de modo semelhante ao DynamicPieChart.
 */
interface DynamicAreaChartProps {
  /**
   * Array de objetos para o gráfico.  
   * Exemplo:
   * [
   *   { month: "January", desktop: 186, mobile: 80 },
   *   { month: "February", desktop: 305, mobile: 200 },
   *   ...
   * ]
   */
  data: Record<string, any>[]

  /**
   * A chave responsável pela categoria exibida no eixo X.
   * Ex.: "month", "categoria", "produto", etc.
   */
  nameKey?: string

  /**
   * Quais chaves numéricas serão usadas como séries no gráfico.
   * Ex.: ["desktop", "mobile", "tablet"].
   */
  numericKeys?: string[]

  /**
   * Título exibido no Card (semelhante ao DynamicPieChart).
   */
  title?: string

  /**
   * Descrição exibida abaixo do título.
   */
  description?: string

  /**
   * Texto de tendência no footer (ex.: "Trending up by 5.2%...").
   */
  trendingLabel?: string

  /**
   * Texto adicional no footer (ex.: "January - June 2024").
   */
  footerLabel?: string

  /**
   * Classe adicional para customização do Card.
   */
  className?: string

  /**
   * Configuração de cor/label de cada série, seguindo o padrão do Shadcn.
   * (Opcional; caso não passe, cores padrão serão aplicadas).
   */
  config?: ChartConfig

  /**
   * Define a opacidade de preenchimento das áreas. Padrão = 0.4
   */
  fillOpacity?: number

  /**
   * Define se as áreas devem ser empilhadas (stacked). Padrão = true.
   */
  stacked?: boolean

  /**
   * Formata o texto que aparece no eixo X (caso queira cortar, formatar datas, etc.).
   */
  xAxisFormatter?: (value: any) => string
}

/**
 * Componente de gráfico de área (stacked ou não) dinâmico,
 * semelhante ao DynamicPieChart na organização das props.
 */
export function AreaChart({
  data,
  nameKey = "name",        // ex.: "month", "category", etc.
  numericKeys = ["value"],  // chaves numéricas (pode ter 1 ou várias)
  title = "Area Chart - Stacked",
  description = "Showing total visitors for the last 6 months",
  trendingLabel = "Trending up by 5.2% this month",
  footerLabel = "January - June 2024",
  className = "",
  config,
  fillOpacity = 0.4,
  stacked = true,
  xAxisFormatter,
}: DynamicAreaChartProps) {
  // Cores padrões caso nenhuma config seja passada.
  const defaultColors = React.useMemo(
    () => [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
    []
  )

  /**
   * Montamos um ChartConfig dinâmico, fazendo merge com
   * o config passado via props (se existir).
   */
  const dynamicChartConfig: ChartConfig = React.useMemo(() => {
    const result: ChartConfig = {}

    numericKeys.forEach((key, index) => {
      const color = config?.[key]?.color ?? defaultColors[index % defaultColors.length]
      result[key] = {
        label: config?.[key]?.label ?? key,
        color,
      }
    })

    return {
      ...config,
      ...result,
    }
  }, [numericKeys, config, defaultColors])

  /**
   * Renderiza uma <Area> para cada chave em `numericKeys`.
   */
  const renderAreas = () => {
    return numericKeys.map((key, index) => {
      const color = dynamicChartConfig[key]?.color ?? defaultColors[index % defaultColors.length]
      return (
        <Area
          key={key}
          dataKey={key}
          type="natural"
          stroke={color}
          fill={color}
          fillOpacity={fillOpacity}
          stackId={stacked ? "a" : undefined} // Se stacked=false, remove empilhamento
        />
      )
    })
  }

  /**
   * Formata o eixo X se uma função customizada foi passada.
   * Caso contrário, converte para string simples.
   */
  const formatXAxis = (value: any) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value)
    }
    return String(value)
  }

  return (
    <Card className={`flex flex-col w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
            config={dynamicChartConfig}
            className="aspect-auto h-[250px] w-full"
        >
          {/* Responsividade - se desejar, você pode envolver com <ResponsiveContainer> */}
          <ReAreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={nameKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatXAxis}
            />
            {/* Adicione <YAxis /> se quiser exibir um eixo Y visível */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  // Ex.: labelFormatter={(value) => `Mês: ${value}`}
                />
              }
            />
            {renderAreas()}
          </ReAreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendingLabel}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {footerLabel}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
