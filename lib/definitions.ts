interface AirportCode {
    icao: string;
    iata: string;
  }
  
  interface Airport {
    code: AirportCode;
    longitudeDec?: number;
    latitudeDec?: number;
    name?: string;
    city?: string;
    country?: string;
  }
  
  interface BuyerRepresentative {
    name: string;
    surname: string;
  }
  
  interface Buyer {
    name: string;
    representative?: BuyerRepresentative;
  }
  
  interface QuoteRequest {
    buyer: Buyer;
  }
  
  interface QuoteRealization {
    quoteRequest: QuoteRequest;
  }
  
  interface Trip {
    tripNid: string;
    flightOrderNoFull: string;
    tripType: string;
    quoteRealization?: QuoteRealization;
  }
  
  interface AircraftType {
    iCAO: string;
    iATA: string;
    easa?: string;
  }
  
  interface Aircraft {
    registration: string;
    acftType: AircraftType;
  }
  
  interface PassengerContact {
    name: string;
    surname: string;
  }
  
  interface PassengerContactList {
    contact: PassengerContact;
  }
  
  interface PassengerList {
    count: number;
    passengerContactList?: PassengerContactList[];
  }
  
  interface CrewContact {
    contactNid: string;
    personCode: string;
    name: string;
    surname: string;
  }
  
  interface CrewPosition {
    name: string;
    posType: string;
    posNid: string;
    occupation: string;
  }
  
  interface CrewList {
    contact: CrewContact;
    position: CrewPosition;
  }
  
  interface Handler {
    name: string;
    airport: Airport;
  }
  
  interface LegHandling {
    adepHandler?: Handler;
    adesHandler?: Handler;
  }
  
  interface JourneyLog {
    acft: Aircraft;
    fuelBeforeUplift: number;
    refuel: number;
    blockFuel: number;
    usedFuel: number;
    taxiFuel: number;
    remainingFuel: number;
    fuelUnit: string;
    weightUnit: string;
    bag: number;
    cargo: number;
    bloffUTC: string;
    atd: string;
    ata: string;
    blonUTC: string;
    nightTime: number;
    paxCount: number;
    paxMaleCount: number;
    paxFemaleCount: number;
    paxChildCount: number;
    paxInfantCount: number;
    startTime: string;
    endTime: string;
    distance: number;
    flightLog: string;
    duration: number;
    flightTime: number;
    startAirport: Airport;
    endAirport: Airport;
    landingCount: number;
    apuHoursTotal: number;
    apuCyclesTotal: number;
    enginesCycles: number;
  }
  
  interface Flight {
    flightNid: string;
    status: string;
    startTimeLocal: string;
    startTimeUTC: string;
    startTime: string;
    endTime: string;
    endTimeUTC: string;
    endTimeLocal: string;
    dist: number;
    startAirport: Airport;
    endAirport: Airport;
    trip?: Trip;
    acft?: Aircraft;
    flightRules: string;
    icaoType: string;
    isCommercial: boolean;
    isCnl: boolean;
    passengerList?: PassengerList;
    crewList?: CrewList[];
    legHandling?: LegHandling;
    journeyLog?: JourneyLog;
  }
  
  