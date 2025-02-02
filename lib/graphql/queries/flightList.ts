import { gql } from "@apollo/client";

export const FLIGHT_LIST_QUERY = gql`
  query FlightList(
    $start: DateTime!,
    $end: DateTime!
  ) {
    flightList(filter: {
      timeInterval: {
        start: $start
        end: $end
      }
    }) {
      flightNid
      status
      startTime
      endTime
      startAirport {
        code {
          icao
        }
      }
      endAirport {
        code {
          icao
        }
      }
      acft {
        registration
      }
      flightWatch { 
        onBlock
        offBlock
        statusId
      }
    }
  }
`;
