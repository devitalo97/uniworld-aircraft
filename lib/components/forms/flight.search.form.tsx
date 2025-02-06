"use client"

import { Controller } from "react-hook-form";
import { parse, format } from "date-fns";
import { DatePickerWithRange } from "../date-picker-with-range";
import { Button } from "../ui/button";
import { useFlightSearchForm } from "./use-flight.search.form";

function parseAsLocalDate(dateString: string) {
  // "Ignora" timezone e cria data local no dia exato (00:00 local time).
  return parse(dateString, "yyyy-MM-dd", new Date());
}

function formatAsLocalString(dateObj: Date) {
  return format(dateObj, "yyyy-MM-dd");
}

interface Props {
  timeInterval: {
    start: string; 
    end: string;   
  };
}

export function FlightSearchForm(props: Props) {
  const { timeInterval: { start, end } } = props;

  const { onSubmit, control, isSubmitting } = useFlightSearchForm({
    defaultValues: {
      timeInterval: {
        from: start,
        to: end,
      }
    }
  });

  return (
    <form className="flex gap-4" onSubmit={onSubmit}>
      <Controller
        name="timeInterval"
        control={control}
        render={({ field }) => {
          const { onChange, value } = field;
          
          // Converte a string "yyyy-MM-dd" para Date
          const fromDate = value?.from ? parseAsLocalDate(value.from) : undefined;
          const toDate = value?.to ? parseAsLocalDate(value.to) : undefined;

          return (
            <DatePickerWithRange
              from={fromDate}
              to={toDate}
              onDateChange={(range) => {
                // Quando o usuário seleciona datas no calendário,
                // convertemos Date -> string "yyyy-MM-dd"
                onChange({
                  from: range?.from ? formatAsLocalString(range.from) : undefined,
                  to: range?.to ? formatAsLocalString(range.to) : undefined,
                });
              }}
            />
          );
        }}
      />
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Searching..." : "Search"}</Button>
    </form>
  );
}
