import { fetchFlightList } from "@/lib/action";
import { AreaChart, BarChart, PieChart } from "@/lib/components/charts";
import { FlightSearchForm } from "@/lib/components/forms";
import { Card, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { getLast7DaysInterval } from "@/lib/utils";
import {
    Plane,
    CheckCircle,
    CalendarCheck,
    Clock,
    TimerOff,
    Timer,
  } from "lucide-react";
import { getFlightDurationMinutes, groupFlightsByAircraft, groupFlightsByDate, groupFlightsByDateAndType, groupFlightsByOriginAirport } from "./util";
  
interface Params {
    searchParams: {
      startTimeInterval: string
      endTimeInterval: string
      flightType: string[]
      flightStatus: string[]
      aircraftNidList: string[]
    }
  }

export const revalidate = 360

export default async function Dashboard(params: Params) {
  const { start, end } = getLast7DaysInterval()
  const {
    searchParams: {
      startTimeInterval,
      endTimeInterval,
    }
  } = params

  const flightList = await fetchFlightList({
    startTimeInterval: startTimeInterval ?? start,
    endTimeInterval: endTimeInterval ?? end,
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
    const totalDuration = flightList.reduce((acc, flight) => {
        return acc + getFlightDurationMinutes(flight.flightWatch?.offBlock ?? 0, flight.flightWatch?.onBlock ?? 0);
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
          title="Flights per Day"
          description="Daily flight evolution"
          stacked={false}
          fillOpacity={0.3}
        />
        <BarChart chartData={flightsByAircraft}/>
        <PieChart
          data={flightsByOriginAirport}
          dataKey="value" // numeric value (number of flights)
          nameKey="airport" // label (airport name/identifier)
          title="Origin Airport Distribution"
          description="Proportion of flights by origin airport"
          className="max-w-md mx-auto"
        />
      </div>
      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <AreaChart
          data={flightsByDateAndType} // Ensure this is correct
          nameKey="date"
          numericKeys={["HP1939", "HP1938"]} // Ensure the keys match
          title="Flights per Day by Aircraft Type"
          description="Daily evolution of flights stacked by registration"
          fillOpacity={0.3}
        />
</div>

    </>
}