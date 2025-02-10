import { fetchFlightList } from "@/lib/action";
import { getCurrentDateInterval } from "@/lib/utils";
import { FlightTable } from "@/lib/components/tables";
import { PageHeader } from "@/lib/components/page-header";

export const revalidate = 60 

export default async function FlightList() {
  const { start, end } = getCurrentDateInterval()
  const flightList = await fetchFlightList({
    startTimeInterval: start,
    endTimeInterval: end,
    flightType: [],
    flightStatus: [],
    aircraftNidList: []
  });

  console.log("revalidate")

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
       <PageHeader withTime={true}/>
      </div>

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <FlightTable flightList={flightList}/>
      </div>
    </>
  );
}
