import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { formatDate } from "@/lib/utils/format-date";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { isToday } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/lib/components/ui/tooltip";
import { CheckCircle, Clock, AlertCircle, XCircle, Plane } from "lucide-react";
import { Flight } from "@/lib/definitions";

// Mapeamento de status para ícones e cores
type IStatusConfig = {[key: string]: {icon: React.ReactNode, label: string}}

const statusConfig: IStatusConfig = {
  CONFIRMED: { icon: <CheckCircle className="text-green-500" size={18} />, label: "Confirmed" },
  OPTION: { icon: <Clock className="text-yellow-500" size={18} />, label: "Option" },
  OPPORTUNITY: { icon: <AlertCircle className="text-blue-500" size={18} />, label: "Opportunity" },
  UNKNOWN: { icon: <XCircle className="text-gray-500" size={18} />, label: "Unknown" },
};

const opStatusConfig: IStatusConfig = {
  S: { icon: <Clock className="text-yellow-500" size={18} />, label: "Slot" },
  A: { icon: <Plane className="text-blue-500" size={18} />, label: "Airborne" },
  "+": { icon: <CheckCircle className="text-green-500" size={18} />, label: "Finished" },
  D: { icon: <XCircle className="text-red-500" size={18} />, label: "Delayed" },
  UNKNOWN: { icon: <AlertCircle className="text-gray-500" size={18} />, label: "Unknown" },
};

export function FlightTable({ flightList }: { flightList: Flight[] }) {
  return (
    <ScrollArea>
      <Table>
        <TableCaption>Uniworld Aircargo</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Logo</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead>Flight #</TableHead>
            <TableHead>Est. Departure</TableHead>
            <TableHead>Est. Arrival</TableHead>
            <TableHead>Dep. Time</TableHead>
            <TableHead>Arr. Time</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead className="text-right">Aircraft</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flightList.map((flight) => {
            // Definir o status final combinando Flight Status e Operational Status
            const flightStatus = flight.status || "UNKNOWN";
            const operationalStatus = flight.flightWatch?.statusId || "UNKNOWN";

            return (
              <TableRow key={flight.flightNid}>
                <TableCell>
                  <img
                    src="https://uniworldaircargo.com/wp-content/uploads/2022/01/Asset-1@4x-1-1.png"
                    alt="Enterprise Logo"
                    className="h-8 w-auto object-contain rounded-md"
                  />
                </TableCell>

                {/* Status Unificado */}
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex gap-1 items-center">
                        {statusConfig[flightStatus]?.icon || statusConfig.UNKNOWN.icon}
                        {opStatusConfig[operationalStatus]?.icon || opStatusConfig.UNKNOWN.icon}
                      </TooltipTrigger>
                      <TooltipContent className="bg-white ring-1 ring-muted text-gray-900 dark:bg-[hsl(240,10%,3.9%)] dark:text-white">
                        {statusConfig[flightStatus]?.label} | {opStatusConfig[operationalStatus]?.label}
                      </TooltipContent>

                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                <TableCell className="font-medium">{flight.flightNid}</TableCell>

                <TableCell>
                  {formatDate({
                    date: flight.startTime * 1000,
                    locales: "en-US",
                    options: {
                      timeZone: "America/Panama",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                      weekday: "long",
                    },
                    callback: (result, date) => (isToday(date) ? `${result} (today)` : result),
                  })}
                </TableCell>

                <TableCell>
                  {formatDate({
                    date: flight.endTime * 1000,
                    locales: "en-US",
                    options: {
                      timeZone: "America/Panama",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                      weekday: "long",
                    },
                    callback: (result, date) => (isToday(date) ? `${result} (today)` : result),
                  })}
                </TableCell>

                <TableCell>
                  {flight?.flightWatch?.offBlock
                    ? formatDate({
                        date: flight.flightWatch.offBlock * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "long",
                        },
                        callback: (result, date) => (isToday(date) ? `${result} (today)` : result),
                      })
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {flight?.flightWatch?.onBlock
                    ? formatDate({
                        date: flight.flightWatch.onBlock * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "long",
                        },
                        callback: (result, date) => (isToday(date) ? `${result} (today)` : result),
                      })
                    : "N/A"}
                </TableCell>

                <TableCell>{flight.startAirport.city} ({flight.startAirport.code.icao})</TableCell>
                <TableCell>{flight.endAirport.city} ({flight.endAirport.code.icao})</TableCell>
                <TableCell className="text-right">{flight.acft?.registration || "N/A"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
