import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetStripePublishKeySchema } from "@/schema/order";
import { BackendResponse } from "@/types/util";

export function useStripeKey(enabled: boolean) {
    return useQuery({
        queryKey: ["stirpe", "key"],
        queryFn: async () =>
            (await api
                .get("/order/stripe-publish-key")
                .then((res) => res.data)) as BackendResponse<string>,
        refetchOnMount: false,
        select: (data) => {
            return GetStripePublishKeySchema.parse(data.data);
        },
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000,
        enabled: enabled,
    });
}
