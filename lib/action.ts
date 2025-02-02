import { getClient } from "./apllo-client";
import { FLIGHT_LIST_QUERY } from "./graphql/queries";

export async function fetchFlightList(input: {
  startTimeInterval: string
  endTimeInterval: string
  flightType: string[]
  flightStatus: string[]
  aircraftNidList: string[]
 }): Promise<Flight[]> {
  const client = getClient();
  try {
    const { data } = await client.query({
      query: FLIGHT_LIST_QUERY,
      variables: input,
    });

    return data?.flightList || [];
  } catch (error: any) {
    throw error
  }
}
