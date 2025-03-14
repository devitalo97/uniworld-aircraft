import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { formatDate } from "@/lib/utils/format-date";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  XCircle,
  Plane,
  AlertTriangle,
  ClockAlertIcon,
} from "lucide-react";
import { Flight } from "@/lib/definitions";

// Mapeamento de status para ícones e cores
// type IStatusConfig = {
//   [key: string]: { icon: React.ReactNode; label: string };
// };

// const statusConfig: IStatusConfig = {
//   CONFIRMED: {
//     icon: <CheckCircle className="text-green-500" size={18} />,
//     label: "Confirmed",
//   },
//   OPTION: {
//     icon: <Clock className="text-yellow-500" size={18} />,
//     label: "Option",
//   },
//   OPPORTUNITY: {
//     icon: <AlertCircle className="text-blue-500" size={18} />,
//     label: "Opportunity",
//   },
//   UNKNOWN: {
//     icon: <XCircle className="text-gray-500" size={18} />,
//     label: "Unknown",
//   },
// };

// const opStatusConfig: IStatusConfig = {
//   S: { icon: <Clock className="text-yellow-500" size={18} />, label: "Slot" },
//   A: { icon: <Plane className="text-blue-500" size={18} />, label: "Airborne" },
//   "+": {
//     icon: <CheckCircle className="text-green-500" size={18} />,
//     label: "Finished",
//   },
//   D: { icon: <XCircle className="text-red-500" size={18} />, label: "Delayed" },
//   "D+": {
//     icon: <AlarmCheck className="text-green-500" size={18} />,
//     label: "Finished late",
//   },
//   UNKNOWN: {
//     icon: <AlertCircle className="text-gray-500" size={18} />,
//     label: "Unknown",
//   },
// };

const clientStatusMap: Record<
  string,
  { icon: JSX.Element; label: string; className: string }
> = {
  "+": {
    icon: <CheckCircle className="text-green-500" size={18} />,
    label: "Arrived",
    className: "bg-green-400",
  },
  "D+": {
    icon: <ClockAlertIcon className="text-green-500" size={18} />,
    label: "Arrived",
    className: "bg-green-400",
  },
  D: {
    icon: <AlertTriangle className="text-yellow-500" size={18} />,
    label: "Delayed",
    className: "bg-yellow-400",
  },
  S: {
    icon: <Clock className="text-gray-500" size={18} />,
    label: "On time",
    className: "bg-white",
  },
  CONFIRMED: {
    icon: <Clock className="text-gray-500" size={18} />,
    label: "On time",
    className: "bg-white",
  },
  A: {
    icon: <Plane className="text-blue-500" size={18} />,
    label: "Departed",
    className: "bg-blue-400",
  },
  UNKNOWN: {
    icon: <XCircle className="text-gray-500" size={18} />,
    label: "Unknown",
    className: "bg-gray-400",
  },
  SLCA: {
    icon: <XCircle className="text-gray-500" size={18} />,
    label: "SLCA",
    className: "bg-gray-400",
  },
};

export function FlightTable({ flightList }: { flightList: Flight[] }) {
  return (
    <ScrollArea>
      <Table>
        <TableCaption>UniWorld Air Cargo</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Flight #</TableHead>
            <TableHead>Dep. Time</TableHead>
            <TableHead>Arr. Time</TableHead>
            <TableHead>Aircraft</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flightList.map((flight) => {
            // Definir o status final combinando Flight Status e Operational Status
            // const flightStatus = flight.status || "UNKNOWN";
            // const operationalStatus = flight.flightWatch?.statusId || "UNKNOWN";
            const status = flight.flightWatch?.statusId || flight.status;
            return (
              <TableRow
                key={flight.flightNid}
                className="even:bg-slate-50 hover:even:bg-slate-100 dark:even:bg-muted dark:hover:even:bg-zinc-900"
              >
                <TableCell>{flight.startAirport.city}</TableCell>
                <TableCell>{flight.endAirport.city}</TableCell>

                <TableCell>
                  <img
                    src="https://uniworldaircargo.com/wp-content/uploads/2022/01/Asset-1@4x-1-1.png"
                    alt="Enterprise Logo"
                    className="w-[100px] h-8 object-contain rounded-md dark:bg-slate-50 dark:p-1"
                  />
                </TableCell>

                <TableCell className="font-medium">{flight.flightNo}</TableCell>

                <TableCell>
                  {flight?.flightWatch?.offBlock
                    ? formatDate({
                        date: flight.flightWatch.offBlock * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: false,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "short",
                        },
                        callback: (result) => `${result}`,
                      })
                    : formatDate({
                        date: flight.startTime * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: false,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "short",
                        },
                        callback: (result) => `${result}`,
                      })}
                </TableCell>

                <TableCell>
                  {flight?.flightWatch?.onBlock
                    ? formatDate({
                        date: flight.flightWatch.onBlock * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: false,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "short",
                        },
                        callback: (result) => `${result}`,
                      })
                    : formatDate({
                        date: flight.endTime * 1000,
                        locales: "en-US",
                        options: {
                          timeZone: "America/Panama",
                          hour12: false,
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "short",
                        },
                        callback: (result) => `${result}`,
                      })}
                </TableCell>

                <TableCell>{flight.acft.acftType.icao}</TableCell>

                {/* Status Unificado */}
                <TableCell>
                  {/* {clientStatusMap[status]?.icon ||
                    clientStatusMap.UNKNOWN.icon} */}
                  <div
                    className={cn(
                      "rounded-md p-1 w-fit font-medium dark:text-primary-foreground",
                      clientStatusMap[status].className
                    )}
                  >
                    {clientStatusMap[status].label}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
