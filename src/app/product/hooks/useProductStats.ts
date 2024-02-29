import {
    GetProductStatsSchema,
    TGetProductStatsSchema,
} from "@/app/product/schema";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getProductStats(): Promise<TGetProductStatsSchema | undefined> {
    const result = await api("/product/stats").then((res) => res.data);
    return GetProductStatsSchema.parse(result.data);
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}
