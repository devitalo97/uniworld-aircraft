import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { formatDate } from "@/lib/utils/format-date";
import { Badge } from "@/lib/components/ui/badge";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function FlightTable(input: {flightList: Flight[]}){
  const { flightList } = input
    return <ScrollArea>
    <Table>
      <TableCaption>Uniworld Aircargo</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap  w-[100px]">Logo</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Flight Status</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Operational Status</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Flight Number</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Departure time</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Arrival time</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Departure Official time</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Arrival Official time</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Origin</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Destination</TableHead>
          <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap text-right">Aircraft</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flightList.map((flight) => (
          <TableRow key={flight.flightNid}>
          <TableCell>
          <img src="https://uniworldaircargo.com/wp-content/uploads/2022/01/Asset-1@4x-1-1.png" alt="Enterprise Logo" className="h-10 w-auto max-w-full object-contain rounded-md" />
          </TableCell>
          <TableCell>
            <Badge className={cn(
              "capitalize",
              flight.status === "CONFIRMED" ? "bg-green-400" :
              flight.status === "OPTION" ? "bg-yellow-400" :
              flight.status === "OPPORTUNITY" ? "bg-blue-400" :
              "bg-gray-400"
            )}>
              {flight.status.toLowerCase()}
            </Badge>
          </TableCell>
          <TableCell>
          <Badge className={cn(
            "capitalize",
            flight.flightWatch?.statusId === "S" ? "bg-yellow-400" :  // Slot (Aguardando autorização)
            flight.flightWatch?.statusId === "A" ? "bg-blue-400" :    // Airborne (Em voo)
            flight.flightWatch?.statusId === "+" ? "bg-green-400" :   // Finished (Finalizado)
            flight.flightWatch?.statusId === "D" ? "bg-red-400" :     // Delayed (Atrasado)
            "bg-gray-400"
          )}>
            {flight.flightWatch?.statusId === "S" ? "Slot" :
            flight.flightWatch?.statusId === "A" ? "Airborne" :
            flight.flightWatch?.statusId === "+" ? "Finished" :
            flight.flightWatch?.statusId === "D" ? "Delayed" :
            "Unknown"}
          </Badge>
        </TableCell>
          <TableCell className="text-sm font-medium text-gray-900">{flight.flightNid}</TableCell>
          <TableCell className="text-gray-500">{formatDate({date: flight.startTime*1000, locales: "es-PA", options: {timeZone: "America/Panama"}})}</TableCell>
          <TableCell className="text-gray-500">{formatDate({date: flight.endTime*1000, locales: "es-PA", options: {timeZone: "America/Panama"}})}</TableCell>
          <TableCell className="text-gray-500">
          {flight?.flightWatch?.offBlock
            ? formatDate({ date: flight.flightWatch.offBlock * 1000, locales: "es-PA", options: { timeZone: "America/Panama" } })
            : "N/A"}
        </TableCell>
        <TableCell className="text-gray-500">
          {flight?.flightWatch?.onBlock
            ? formatDate({ date: flight.flightWatch.onBlock * 1000, locales: "es-PA", options: { timeZone: "America/Panama" } })
            : "N/A"}
        </TableCell>
          <TableCell className="text-gray-500">{flight.startAirport.code.icao}</TableCell>
          <TableCell className="text-gray-500">{flight.endAirport.code.icao}</TableCell>
          <TableCell className="text-right text-gray-500">{flight.acft?.registration || "N/A"}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  </ScrollArea>
}