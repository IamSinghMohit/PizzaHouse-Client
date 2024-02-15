import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetOrderSchema, TGetOrderSchema } from "../schema";
import { toast } from "sonner";

export async function getOrder(
    id: string,
): Promise<TGetOrderSchema | undefined> {
    return await api(`/order/${id}`).then((res) => {
        try {
            return GetOrderSchema.parse(res.data.data);
        } catch (error) {
            toast.error("received bad data");
            return undefined;
        }
    });
}

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => await getOrder(id),
    });
}
