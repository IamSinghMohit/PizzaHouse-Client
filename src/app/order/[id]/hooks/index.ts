import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetOrderSchema, TGetOrderSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async (): Promise<TGetOrderSchema> =>
            await api(`/order/${id}`).then((res) => res.data),
        select: (data) => {
            return ValidateBackendResponse(data, GetOrderSchema);
        },
        refetchOnMount:'always',
        refetchOnWindowFocus:'always'
    });
}
