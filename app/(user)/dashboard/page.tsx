import { AreaChart, chartData, areaChartkeys, BarChart, PieChart } from "@/lib/components/charts";
import { FlightSearchForm } from "@/lib/components/forms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { DollarSign } from "lucide-react";

export default function Dashboard(){
    return <>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Dashboard
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <FlightSearchForm />
            </div>
            </div>
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="text-sm">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-gr"/>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">$45,231.89</CardTitle>
                        <CardDescription className="text-sm text-gray-400">+20.1% from last month</CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="text-sm">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-gr"/>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">$45,231.89</CardTitle>
                        <CardDescription className="text-sm text-gray-400">+20.1% from last month</CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="text-sm">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-gr"/>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">$45,231.89</CardTitle>
                        <CardDescription className="text-sm text-gray-400">+20.1% from last month</CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="text-sm">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-gr"/>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">$45,231.89</CardTitle>
                        <CardDescription className="text-sm text-gray-400">+20.1% from last month</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4">
            <AreaChart
                data={chartData}
                nameKey="date"
                numericKeys={["desktop", "mobile"]}
                title="Area Chart - Stacked"
                description="Showing total visitors for the last 6 months"
                trendingLabel="Trending up by 5.2% this month"
                footerLabel="January - June 2024"
                stacked={true} // se quiser remover stack, use stacked={false}
                fillOpacity={0.3}
            />
            <BarChart 
                data={chartData}
                nameKey="month"
                numericKeys={["desktop", "mobile"]}
                title="Bar Chart - Multiple"
                description="January - June 2024"
                trendingLabel="Trending up by 5.2% this month"
                footerLabel="Showing total visitors for the last 6 months"
                barRadius={6}
            />
            <PieChart 
                data={chartData}
                dataKey="desktop"
                nameKey="date"
                title="Gráfico de Navegadores"
                description="Janeiro - Junho 2024"
                trendingLabel="Tendência de +3.7% este mês"
                footerLabel="Total de visitantes nos últimos 6 meses"
                className="max-w-md mx-auto"
            />
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8">
            <AreaChart
                data={chartData}
                nameKey="date"
                numericKeys={["desktop", "mobile"]}
                title="Area Chart - Stacked"
                description="Showing total visitors for the last 6 months"
                trendingLabel="Trending up by 5.2% this month"
                footerLabel="January - June 2024"
                stacked={true} // se quiser remover stack, use stacked={false}
                fillOpacity={0.3}
            />
        </div>
    </>
}