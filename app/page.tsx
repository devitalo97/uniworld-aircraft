import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { fetchFlightList } from "@/lib/action";
import { formatDateToEN } from "@/lib/utils/format-date";

export default async function Home() {
  const flightList = await fetchFlightList({
    start: "2025-01-31",
    end: "2025-02-01",
  });

  return (
    <Table>
      <TableCaption>Uniworld Aircargo</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase whitespace-nowrap  w-[100px]">Logo</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Status</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Flight Number</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Estimated Departure</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Estimated Arrival</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Actual Departure</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Actual Arrival</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Origin</TableHead>
          <TableHead className="uppercase whitespace-nowrap">Destination</TableHead>
          <TableHead className="uppercase whitespace-nowrap text-right">Aircraft</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flightList.map((flight) => (
          <TableRow key={flight.flightNid}>
          <TableCell>
          <img src="https://uniworldaircargo.com/wp-content/uploads/2022/01/Asset-1@4x-1-1.png" alt="Logo Empresa" className="h-10 w-auto max-w-full object-contain rounded-md" />
          </TableCell>
          <TableCell className={`font-medium ${flight.status === "CONFIRMED" ? "text-green-400" : "text-red-400"}`}>{flight.status}</TableCell>
          <TableCell>{flight.flightNid}</TableCell>
          <TableCell>{formatDateToEN(flight.startTimeLocal)}</TableCell>
          <TableCell>{formatDateToEN(flight.endTimeLocal)}</TableCell>
          <TableCell>{formatDateToEN(flight.startTimeUTC)}</TableCell>
          <TableCell>{formatDateToEN(flight.endTimeUTC)}</TableCell>
          <TableCell>{flight.startAirport.name} ({flight.startAirport.code.iata})</TableCell>
          <TableCell>{flight.endAirport.name} ({flight.endAirport.code.iata})</TableCell>
          <TableCell className="text-right">{flight.acft?.registration || "N/A"}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
