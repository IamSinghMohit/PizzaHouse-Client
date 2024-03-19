import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateCheckoutSchema, TCreateCheckoutSchema } from "../schema";
import { TBackendErrorReponse } from "@/utils/makeRequest";
import api from "@/lib/axios";
import { ValidateBackendErrorResponse, ValidateBackendResponse } from "@/utils";
import { ZodError } from "zod";
import { AxiosError } from "axios";

export function useCheckout() {
    return useMutation<TCreateCheckoutSchema, AxiosError<TBackendErrorReponse>>(
        {
            mutationKey: ["cart", "checkout"],
            mutationFn: async (data: any) => {
                const result = await api.post("/order/create", data);
                return ValidateBackendResponse(
                    result.data,
                    CreateCheckoutSchema,
                );
            },
            onError: (error) => {
                if (error instanceof ZodError) {
                    return toast.error("received bad data");
                }
                const e = ValidateBackendErrorResponse(error.response?.data);
                toast.error(e.message);
            },
        },
    );
}
