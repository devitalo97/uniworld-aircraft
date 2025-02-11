import { gql } from "@apollo/client";

export const FLIGHT_LIST_QUERY = gql`
  query FlightList(
    $startTimeInterval: DateTime!
    $endTimeInterval: DateTime!
    $flightType: [FlightType!]
    $flightStatus: [FlightStatus!]
    $aircraftNidList: [AircraftNid!]
  ) {
    flightList(
      filter: {
        timeInterval: { start: $startTimeInterval, end: $endTimeInterval }
        flightType: $flightType
        flightStatus: $flightStatus
        aircraftNidList: $aircraftNidList
      }
    ) {
      flightNid
      flightNo
      status
      startTime
      endTime
      startAirport {
        city
      }
      endAirport {
        city
      }
      acft {
        acftType {
          iata
        }
      }
      flightWatch {
        onBlock
        offBlock
        statusId
      }
    }
  }
`;
