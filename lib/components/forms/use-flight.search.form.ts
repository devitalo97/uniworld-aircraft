import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useUpdateUrl } from '../hooks';

const flightSearchSchema = z.object({
    timeInterval: z.object({
        from: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato YYYY-MM-DD")
            .optional(), // Valida formato de data
        to: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato YYYY-MM-DD")
    }).optional(), // Valida formato de data
    flightType: z.array(z.string()).optional(), // Array de strings opcional
    flightStatus: z.array(z.string()).optional(), // Array de strings opcional
    aircraftNidList: z.array(z.string()).optional(), // Array de strings opcional
});

export type FlightSearchSchema = z.infer<typeof flightSearchSchema>;


interface Props {
    defaultValues?: {
        timeInterval?: {
            to: string;
            from?: string | undefined;
        } | undefined;
        flightType?: string[] | undefined;
        flightStatus?: string[] | undefined;
        aircraftNidList?: string[] | undefined;
    }
}
export function useFlightSearchForm(props: Props){
    const { defaultValues } = props
    const updateUrl = useUpdateUrl()

    const {
        register,
        handleSubmit,
        control
    } = useForm<FlightSearchSchema>({
        resolver: zodResolver(flightSearchSchema),
        defaultValues
    });

    const onSubmit = handleSubmit((data) => {
        const { timeInterval, ...rest } = data
        const startTimeInterval = timeInterval?.from
        const endTimeInterval = timeInterval?.to
        updateUrl({
            ...rest,
            startTimeInterval,
            endTimeInterval
        })
    })

    return {
        control,
        register,
        onSubmit
    }
}