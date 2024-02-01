import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { PaymentIntentSchema, TPaymentIntentSchema } from "../schema";
import { toast } from "sonner";

async function createPaymentIntent(data: any): Promise<TPaymentIntentSchema['data']> {
    return await api
        .post("/order/create", data)
        .then((res) => PaymentIntentSchema.parse(res.data).data);
}

export function useCreatePaymentIntent() {
    return useMutation({
        mutationKey: ["stripe", "create", "paymentIntent"],
        mutationFn: createPaymentIntent,
        onError: (err) => {
            toast.error("server error!, try again after some time");
        },
    });
}
