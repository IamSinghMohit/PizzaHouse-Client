import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

async function createCheckout(data) {
    return await api.post("/order/create", data);
}

export function useCheckout() {
    return useMutation({
        mutationKey: ["cart", "checkout"],
        mutationFn: createCheckout,
    });
}
