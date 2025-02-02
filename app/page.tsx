import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { fetchFlightList } from "@/lib/action";
import { formatDateToEN } from "@/lib/utils/format-date";
import { Badge } from "@/lib/components/ui/badge";
import { cn, getCurrentDateInterval } from "@/lib/utils";
import { ScrollArea } from "@/lib/components/ui/scroll-area";

export default async function Home() {
  const today = new Date()
  const { start, end } = getCurrentDateInterval()
  const flightList = await fetchFlightList({
    start,
    end
  });

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex items-center justify-between gap-x-8 lg:mx-0">
          <div className="flex items-center gap-x-6">
            <img
              alt=""
              src="/uniworld_logo.png"
              className="size-16 flex-none rounded-full ring-1 ring-gray-900/10"
            />
            <h1>
              <div className="text-sm/6 text-gray-500">
                Flight List of {" "}{<time dateTime={today.toLocaleDateString()}>
                {today.toLocaleDateString()}
              </time>}
              </div>
              <div className="mt-1 text-base font-semibold text-gray-900">Uniworld AirCargo</div>
            </h1>
          </div>
          {/* <div className="flex items-center gap-x-4 sm:gap-x-6">
            <button type="button" className="hidden text-sm/6 font-semibold text-gray-900 sm:block">
              Copy URL
            </button>
            <a href="#" className="hidden text-sm/6 font-semibold text-gray-900 sm:block">
              Edit
            </a>
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </a>

            <Menu as="div" className="relative sm:hidden">
              <MenuButton className="-m-3 block p-3">
                <span className="sr-only">More</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5 text-gray-500" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <button
                    type="button"
                    className="block w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    Copy URL
                  </button>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    Edit
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div> */}
        </div>
      </div>

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <ScrollArea>
          <Table>
            <TableCaption>Uniworld Aircargo</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap  w-[100px]">Logo</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Status</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Flight Number</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Estimated Departure</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Estimated Arrival</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Actual Departure</TableHead>
                <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Actual Arrival</TableHead>
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
                <TableCell><Badge className={cn("capitalize", flight.status === "CONFIRMED" ? "bg-green-400" : "bg-red-400")}>{flight.status.toLowerCase()}</Badge></TableCell>
                <TableCell className="text-sm font-medium text-gray-900">{flight.flightNid}</TableCell>
                <TableCell className="text-gray-500">{formatDateToEN(flight.startTimeLocal)}</TableCell>
                <TableCell className="text-gray-500">{formatDateToEN(flight.endTimeLocal)}</TableCell>
                <TableCell className="text-gray-500">{formatDateToEN(flight.startTime * 1000)}</TableCell>
                <TableCell className="text-gray-500">{formatDateToEN(flight.endTime * 1000)}</TableCell>
                <TableCell className="text-gray-500">{flight.startAirport.code.iata}</TableCell>
                <TableCell className="text-gray-500">{flight.endAirport.code.iata}</TableCell>
                <TableCell className="text-right text-gray-500">{flight.acft?.registration || "N/A"}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
}
