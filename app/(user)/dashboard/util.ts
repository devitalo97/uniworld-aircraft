import { Flight } from "@/lib/definitions";
import { format } from "date-fns";

export function groupFlightsByDate(flights: Flight[]) {
  const groups: Record<string, number> = {};

  flights.forEach((flight) => {
    const dateStr = format(flight.startTime * 1000, "yyyy-MM-dd");
    if (!groups[dateStr]) {
      groups[dateStr] = 0;
    }
    groups[dateStr]++;
  });

  // Agora transformar em array de objetos (para o chart)
  // Ex: [{ date: "2024-01-01", flights: 10 }, ...]
  return Object.entries(groups).map(([date, count]) => ({
    date,
    flights: count,
  }));
}

export function groupFlightsByAircraft(flights: Flight[]) {
    const groups: Record<string, number> = {};
  
    flights.forEach((flight) => {
      const reg = flight.acft?.registration || "Unknown";
      if (!groups[reg]) {
        groups[reg] = 0;
      }
      groups[reg]++;
    });
  
    return Object.entries(groups).map(([registration, count]) => ({
      registration,
      count,
    }));
  }


export function groupFlightsByStatus(flights: Flight[]) {
    const groups: Record<string, number> = {};
  
    flights.forEach((flight) => {
      const status = flight.status || "UNKNOWN";
      if (!groups[status]) {
        groups[status] = 0;
      }
      groups[status]++;
    });
  
    // Exemplo de retorno para o PieChart
    // Ele precisa de algo como: [{ status: "COMPLETED", value: 10 }, ...]
    return Object.entries(groups).map(([status, value]) => ({
      status,
      value,
    }));
  }
  
// Interface para os dados agrupados por data e por tipo de aeronave.
// A propriedade "date" é obrigatória e as demais chaves (tipo de aeronave)
// terão valores numéricos representando a contagem.
export interface GroupedFlightData {
date: string;
[aircraftType: string]: number | string;
}

export function groupFlightsByDateAndType(flights: Flight[]): GroupedFlightData[] {
// Objeto para armazenar dados no formato:
// { "2025-01-01": { "A320": 2, "B737": 1 } }
const dateMap: Record<string, Record<string, number>> = {};

for (const flight of flights) {
    // Extrai a data (ex.: "2025-01-01") a partir de flight.startTime
    // Multiplicamos por 1000 se o timestamp estiver em segundos.
    const dayStr = format(flight.startTime * 1000, "yyyy-MM-dd");

    // Pega o "tipo" da aeronave; neste exemplo usamos a matrícula.
    const aircraftType = flight.acft?.registration || "Unknown";

    // Garante que exista um objeto para essa data
    if (!dateMap[dayStr]) {
        dateMap[dayStr] = {};
    }

    // Inicializa a contagem para esse tipo se ainda não existir
    if (!dateMap[dayStr][aircraftType]) {
        dateMap[dayStr][aircraftType] = 0;
    }
    // Incrementa a contagem
    dateMap[dayStr][aircraftType]++;
}

// Extrai todos os tipos de aeronave para garantir colunas consistentes
const allTypes = new Set<string>();
Object.values(dateMap).forEach((typesObj) => {
    Object.keys(typesObj).forEach((t) => allTypes.add(t));
});

// Ordena as datas (opcional, mas geralmente é útil para gráficos)
const sortedDates = Object.keys(dateMap).sort();

// Converte o 'dateMap' em um array de objetos no formato:
// { date: "2025-01-01", A320: 2, B737: 1, ... }
const result: GroupedFlightData[] = sortedDates.map((dayStr) => {
    const row: GroupedFlightData = { date: dayStr };

    // Inicializa cada tipo com 0 se não houver valor para aquele dia
    for (const t of allTypes) {
        row[t] = dateMap[dayStr][t] || 0;
    }
    return row;
});

return result;
}


export function groupFlightsByOriginAirport(flights: Flight[]) {
    const groups: Record<string, number> = {};
  
    flights.forEach((flight) => {
      const airportCode = flight.startAirport?.code?.icao || "Unknown";
      if (!groups[airportCode]) {
        groups[airportCode] = 0;
      }
      groups[airportCode]++;
    });
  
    // Retorna no formato esperado para o PieChart:
    // [{ airport: "SBGR", value: 10 }, { airport: "KLAX", value: 5 }, ...]
    return Object.entries(groups).map(([airport, value]) => ({
      airport,
      value,
    }));
  }
  

  