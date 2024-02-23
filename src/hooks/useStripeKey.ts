import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetStripePublishKeySchema } from "@/schema/order";
import { ValidateBackendResponse } from "@/utils";

export function useStripeKey(user: boolean) {
    return useQuery({
        queryKey: ["stirpe", "key"],
        queryFn: async (): Promise<string | undefined> =>
            await api
                .get("/order/stripe-publish-key")
                .then((res) =>
                    ValidateBackendResponse(res.data, GetStripePublishKeySchema)
                ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000,
        enabled: user,
    });
}
