import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetOrderSchema, TGetOrderSchema } from "../schema";

async function getOrder(id: string): Promise<TGetOrderSchema> {
    return await api(`/order/${id}`).then((res) => {
        try {
            return GetOrderSchema.parse(res.data.data);
        } catch (error) {
            console.log(error);
            return error;
        }
    });
}

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => await getOrder(id),
    });
}
