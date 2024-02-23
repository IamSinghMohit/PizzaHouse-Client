import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateCheckoutSchema, TCreateCheckoutSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function createCheckout(
    data: unknown
): Promise<TCreateCheckoutSchema | undefined> {
    return await api
        .post("/order/create", data)
        .then((res) => ValidateBackendResponse(res.data, CreateCheckoutSchema));
}

export function useCheckout() {
    return useMutation({
        mutationKey: ["cart", "checkout"],
        mutationFn: createCheckout,
        onError: () => {
            toast.error("try after some time");
        },
    });
}
