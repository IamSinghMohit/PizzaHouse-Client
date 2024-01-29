import { useMutation } from "@tanstack/react-query";
import { PaymentIntentSchema } from "../schema";

async function createPaymentIntent(data): Promise<string> {
    return await api.post("/order/create", data).then((res) => {
        return PaymentIntentSchema.parse(res.data).data;
    });
}

export function useCreatePaymentIntent() {
    return useMutation({
        mutationKey: ["stripe", "create", "paymentIntent"],
        mutationFn: createPaymentIntent,
    });
}
