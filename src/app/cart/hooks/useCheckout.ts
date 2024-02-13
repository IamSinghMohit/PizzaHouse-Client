import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function createCheckout(data:unknown): Promise<string> {
    return await api.post("/order/create", data).then((res) => res.data.data);
}

export function useCheckout() {
    return useMutation({
        mutationKey: ["cart", "checkout"],
        mutationFn: createCheckout,
        onError:() => {
            toast.error('try after some time')
        }
    });
}
