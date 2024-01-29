import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetStripePublishKeySchema } from "../schema";

export function useStripeKey() {
    return useQuery({
        queryKey: ["stirpe", "key"],
        queryFn: async (): Promise<string> =>
            await api
                .get("/order/stripe-publish-key")
                .then((res) => GetStripePublishKeySchema.parse(res.data).data),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000,
    });
}