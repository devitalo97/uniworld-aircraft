"use client"

import { Controller } from "react-hook-form";
import { DatePickerWithRange } from "../date-picker-with-range";
import { Button } from "../ui/button";
import { useFlightSearchForm } from "./use-flight.search.form";
import { addDays } from "date-fns";

export function FlightSearchForm() {
    const { onSubmit, control } = useFlightSearchForm({
        defaultValues: {
            timeInterval: {
                from: new Date().toISOString().split('T')[0],
                to: addDays(new Date(), 1).toISOString().split('T')[0],
            }
        }
    });

    return (
        <form className="flex gap-4" onSubmit={onSubmit}>
            <Controller
                name="timeInterval"
                control={control}
                render={({ field }) => (
                    <DatePickerWithRange
                        onDateChange={(range) => {
                            field.onChange({
                                from: range?.from ? range.from.toISOString().split('T')[0] : undefined,
                                to: range?.to ? range.to.toISOString().split('T')[0] : undefined
                            });
                        }}
                    />
                )}
            />
            <Button type="submit">Search</Button>
        </form>
    );
}
