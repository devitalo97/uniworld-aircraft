import { fetchFlightList } from "@/lib/action";
import { getCurrentDateInterval } from "@/lib/utils";
import { FlightTable } from "@/lib/components/tables";
import { PageHeader } from "@/lib/components/page-header";
import { FlightSearchForm } from "@/lib/components/forms";

interface Params {
  searchParams: {
    startTimeInterval: string;
    endTimeInterval: string;
    flightType: string[];
    flightStatus: string[];
    aircraftNidList: string[];
  };
}

export default async function FlightListWithSearch(params: Params) {
  const { start, end } = getCurrentDateInterval();
  const {
    searchParams: { startTimeInterval, endTimeInterval },
  } = params;

  const selectedStart = startTimeInterval ?? start;
  const selectedEnd = endTimeInterval ?? end;

  const flightList = await fetchFlightList({
    startTimeInterval: startTimeInterval ?? start,
    endTimeInterval: endTimeInterval ?? end,
    flightType: [],
    flightStatus: [],
    aircraftNidList: [],
  });

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader />
      </div>

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <FlightSearchForm
          timeInterval={{ start: selectedStart, end: selectedEnd }}
        />
      </div>

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <FlightTable flightList={flightList} />
      </div>
    </>
  );
}
