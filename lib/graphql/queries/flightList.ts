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
      startTimeLocal
      startTimeUTC
      startTime
      endTime
      dist
      endTimeUTC
      endTimeLocal
      startAirport {
        code {
          icao
          iata
        }
      }
      endAirport {
        code {
          icao
          iata
        }
      }
      trip {
        tripNid
        flightOrderNoFull
        tripType
        quoteRealization {
          quoteRequest {
            buyer {
              name
              representative {
                name
                surname
              }
            }
          }
        }
      }
      endAirport {
        code {
          icao
          iata
        }
        longitudeDec
        latitudeDec
        name
        city
        country
      }
      acft {
        registration
        acftType {
          iCAO
          iATA
        }
      }
      dist
      flightRules
      icaoType
      isCommercial
      isCnl
      passengerList {
        count
        passengerContactList {
          contact {
            name
            surname
          }
        }
      }
      crewList {
        contact {
          contactNid
          personCode
          name
          surname
          personCode
        }
        position {
          name
          posType
          posNid
          occupation
        }
      }
      legHandling {
        adepHandler {
          name
          airport {
            code {
              icao
              iata
            }
          }
        }
        adesHandler {
          name
          airport {
            code {
              icao
              iata
            }
          }
        }
      }
      journeyLog {
        acft {
          registration
          acftType {
            icao
            iata
            easa
          }
        }
        fuelBeforeUplift
        refuel
        blockFuel
        usedFuel
        taxiFuel
        remainingFuel
        fuelUnit
        weightUnit
        bag
        cargo
        bloffUTC
        atd
        ata
        blonUTC
        nightTime
        paxCount
        paxMaleCount
        paxFemaleCount
        paxChildCount
        paxInfantCount
        startTime
        endTime
        distance
        flightLog
        duration
        flightTime
        startAirport {
          code {
            icao
            iata
          }
          name
          country
        }
        endAirport {
          code {
            icao
            iata
          }
          name
          country
        }
        landingCount
        apuHoursTotal
        apuCyclesTotal
        enginesCycles
      }
    }
  }
`;
