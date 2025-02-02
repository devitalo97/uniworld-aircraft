import { gql } from "@apollo/client";

export const FLIGHT_LIST_QUERY = gql`
  query FlightList(
    $startTimeInterval: DateTime!
    $endTimeInterval: DateTime!
    $flightType: [FlightType!]
    $flightStatus: [FlightStatus!]
    $aircraftNidList: [AircraftNid!]
  ) {
    flightList(filter: {
      timeInterval: {
        start: $startTimeInterval
        end: $endTimeInterval
      },
      flightType: $flightType,
      flightStatus: $flightStatus,
      aircraftNidList: $aircraftNidList
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
