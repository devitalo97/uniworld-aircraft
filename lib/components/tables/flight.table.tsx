import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { formatDate } from "@/lib/utils/format-date";
import { Badge } from "@/lib/components/ui/badge";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Flight } from "@/lib/definitions";

export function FlightTable(input: {flightList: Flight[]}){
  const { flightList } = input
    return <ScrollArea>
    <Table>
      <TableCaption>Uniworld Aircargo</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Flight Status</TableHead>
          <TableHead>Operational Status</TableHead>
          <TableHead>Flight Number</TableHead>
          <TableHead>Departure time</TableHead>
          <TableHead>Arrival time</TableHead>
          <TableHead>Departure Official time</TableHead>
          <TableHead>Arrival Official time</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead className=" text-right">Aircraft</TableHead>
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
              flight.status === "CONFIRMED" ? "bg-green-400 hover:bg-green-500" :
              flight.status === "OPTION" ? "bg-yellow-400 hover:bg-yellow-500" :
              flight.status === "OPPORTUNITY" ? "bg-blue-400 hover:bg-blue-500" :
              "bg-gray-400 hover:bg-gray-500"
            )}>
              {flight.status.toLowerCase()}
            </Badge>
          </TableCell>
          <TableCell>
          <Badge className={cn(
            "capitalize",
            flight.flightWatch?.statusId === "S" ? "bg-yellow-400 hover:bg-yellow-500" :  // Slot (Aguardando autorização)
            flight.flightWatch?.statusId === "A" ? "bg-blue-400 hover:bg-blue-500" :    // Airborne (Em voo)
            flight.flightWatch?.statusId === "+" ? "bg-green-400 hover:bg-green-500" :   // Finished (Finalizado)
            flight.flightWatch?.statusId === "D" ? "bg-red-400 hover:bg-red-500" :     // Delayed (Atrasado)
            "bg-gray-400 hover:bg-gray-500"
          )}>
            {flight.flightWatch?.statusId === "S" ? "Slot" :
            flight.flightWatch?.statusId === "A" ? "Airborne" :
            flight.flightWatch?.statusId === "+" ? "Finished" :
            flight.flightWatch?.statusId === "D" ? "Delayed" :
            "Unknown"}
          </Badge>
        </TableCell>
          <TableCell className="font-medium">{flight.flightNid}</TableCell>
          <TableCell>{formatDate({date: flight.startTime*1000, locales: "es-PA", options: {timeZone: "America/Panama"}})}</TableCell>
          <TableCell>{formatDate({date: flight.endTime*1000, locales: "es-PA", options: {timeZone: "America/Panama"}})}</TableCell>
          <TableCell>
          {flight?.flightWatch?.offBlock
            ? formatDate({ date: flight.flightWatch.offBlock * 1000, locales: "es-PA", options: { timeZone: "America/Panama" } })
            : "N/A"}
        </TableCell>
        <TableCell>
          {flight?.flightWatch?.onBlock
            ? formatDate({ date: flight.flightWatch.onBlock * 1000, locales: "es-PA", options: { timeZone: "America/Panama" } })
            : "N/A"}
        </TableCell>
          <TableCell>{flight.startAirport.code.icao}</TableCell>
          <TableCell>{flight.endAirport.code.icao}</TableCell>
          <TableCell className="text-right ">{flight.acft?.registration || "N/A"}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  </ScrollArea>
}