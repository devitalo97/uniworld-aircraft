import { fetchFlightList } from "@/lib/action";
import { AreaChart, chartData, BarChart, PieChart } from "@/lib/components/charts";
import { FlightSearchForm } from "@/lib/components/forms";
import { Card, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { getCurrentDateInterval } from "@/lib/utils";
import {
    Plane,
    CheckCircle,
    CalendarCheck,
    Clock,
    TimerOff,
    Timer,
  } from "lucide-react";
import { groupFlightsByAircraft, groupFlightsByDate, groupFlightsByDateAndType, groupFlightsByOriginAirport, groupFlightsByStatus } from "./util";
  
interface Params {
    searchParams: {
      startTimeInterval: string
      endTimeInterval: string
      flightType: string[]
      flightStatus: string[]
      aircraftNidList: string[]
    }
  }

export const revalidate = 60

export default async function Dashboard(params: Params) {
  const { start, end } = getCurrentDateInterval()
  const {
    searchParams: {
      startTimeInterval,
      endTimeInterval,
    }
  } = params

  const flightList = await fetchFlightList({
    startTimeInterval: startTimeInterval ?? "2025-01-01",
    endTimeInterval: endTimeInterval ?? "2025-02-01",
    flightType: [],
    flightStatus: [],
    aircraftNidList: []
  });
    // 1. Total de voos
    const totalFlights = flightList.length;

    // 2. Total de voos confirmados
    const confirmedFlights = flightList.filter(f => f.status === "CONFIRMED").length;

    // 3. Total de voos finalizados
    // "S" "Slot"
    // "A" "Airborne"
    // "D" "Delayed"
    // "+" "Finished"
    const completedFlights = flightList.filter(f => f.flightWatch?.statusId === "+").length;

    // 3. Total de voos em status "Slot" ou "Airborne"
    const activeOrScheduledFlights = flightList.filter(f =>
        f.flightWatch?.statusId === "S" || f.flightWatch?.statusId === "A"
    ).length;

    // 4. Total de voos em status "Delayd"
    const delayedFlights = flightList.filter(f =>
        f.flightWatch?.statusId === "D"
    ).length;

    // 4. Tempo médio de voo (exemplo simplificado)
    function getFlightDurationMinutes(start: number, end: number) {
        const diff = new Date(end).getTime() - new Date(start).getTime();
        return diff / 1000 / 60; // minutos
    }
    const totalDuration = flightList.reduce((acc, flight) => {
        return acc + getFlightDurationMinutes(flight.flightWatch?.onBlock ?? 0, flight.flightWatch?.offBlock ?? 0);
    }, 0);

    const avgFlightDuration = flightList.length > 0
        ? totalDuration / flightList.length
        : 0;

        const cardsData = [
            {
              title: "Total Flights",
              icon: <Plane className="h-4 w-4 text-gray-400" />, // Ajuste classe/tamanho/color
              mainValue: totalFlights,
              // subValue: ...
            },
            {
              title: "Confirmed Flights",
              icon: <CheckCircle className="h-4 w-4 text-gray-400" />,
              mainValue: confirmedFlights,
            },
            {
              title: "Completed Flights",
              icon: <CalendarCheck className="h-4 w-4 text-gray-400" />,
              mainValue: completedFlights,
            },
            {
              title: "Active/Scheduled Flights",
              icon: <Clock className="h-4 w-4 text-gray-400" />,
              mainValue: activeOrScheduledFlights,
            },
            {
              title: "Delayed Flights",
              icon: <TimerOff className="h-4 w-4 text-gray-400" />,
              mainValue: delayedFlights,
            },
            {
              title: "Avg. Flight Duration (min)",
              icon: <Timer className="h-4 w-4 text-gray-400" />,
              mainValue: avgFlightDuration.toFixed(1),
            },
          ];

    const flightsByDay = groupFlightsByDate(flightList);
    const flightsByAircraft = groupFlightsByAircraft(flightList);
    const flightsByOriginAirport = groupFlightsByOriginAirport(flightList);
    const flightsByDateAndType = groupFlightsByDateAndType(flightList)


    return <>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl/7 font-bold text-gray-400ay-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Dashboard
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <FlightSearchForm />
            </div>
            </div>
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-sm">{card.title}</CardTitle>
                {card.icon}
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">{card.mainValue}</CardTitle>
                {/* <CardDescription className="text-sm text-gray-400ay-400">
                  {card.subValue}
                </CardDescription> */}
              </div>
            </CardHeader>
          </Card>
        ))}
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4">
            
            <AreaChart
              data={flightsByDay}
              nameKey="date"
              numericKeys={["flights"]}
              title="Voos por Dia"
              description="Evolução diária de voos"
              stacked={false} 
              fillOpacity={0.3}
            />
            <BarChart
              data={flightsByAircraft}
              nameKey="registration"
              numericKeys={["count"]}
              title="Voos por Aeronave"
              description="Distribuição de voos por registro de aeronave"
              barRadius={6}
              config={{
                count: { label: "HP1939", color: "#3498DB" }, // Azul
              }}
            />
            <PieChart
              data={flightsByOriginAirport}
              dataKey="value" // valor numérico (quantidade de voos)
              nameKey="airport" // rótulo (nome/identificador do aeroporto)
              title="Distribuição por Aeroporto de Origem"
              description="Proporção de voos por aeroporto de origem"
              className="max-w-md mx-auto"
            />
        </div>
        <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <AreaChart
          data={flightsByDateAndType} // Certifique-se de que está correto
          nameKey="date"
          numericKeys={["HP1939", "HP1938"]} // Certifique-se de que as chaves correspondem
          title="Voos por Dia e por Tipo de Aeronave"
          description="Evolução diária dos voos empilhada por matrícula"
          fillOpacity={0.3}
      />

        </div>
    </>
}