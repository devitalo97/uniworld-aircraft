import { fetchFlightList } from "@/lib/action";
import { getCurrentDateInterval } from "@/lib/utils";
import { FlightListTable } from "@/lib/components/tables";
import { PageHeader } from "@/lib/components/page-header";

export const revalidate = 60

export default async function LightList() {
  const { start, end } = getCurrentDateInterval()
  const flightList = await fetchFlightList({
    start,
    end
  });

  return (
    <>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
       <PageHeader />
      </div>

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <FlightListTable flightList={flightList}/>
      </div>
    </>
  );
}
