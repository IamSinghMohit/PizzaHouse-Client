import { GetProductStatsSchema, TGetProductStatsSchema } from "@/app/product/schema";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getProductStats(): Promise<TGetProductStatsSchema | undefined> {
    try {
        const result = await axios("/product/stats").then((res) => res.data);
        return GetProductStatsSchema.parse(result.data);
    } catch (error) {
        toast.error("received bad data from server")
        return undefined;
    }
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}

