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
      isCnl
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
          icao
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
