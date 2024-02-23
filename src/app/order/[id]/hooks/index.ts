import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetOrderSchema, TGetOrderSchema } from "../schema";
import { toast } from "sonner";
import { ValidateBackendResponse } from "@/utils";

export async function getOrder(
    id: string
): Promise<TGetOrderSchema | undefined> {
    return await api(`/order/${id}`).then((res) =>
        ValidateBackendResponse(res.data, GetOrderSchema)
    );
}

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => await getOrder(id),
    });
}
