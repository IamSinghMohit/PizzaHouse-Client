import api from "@/lib/axios";
import { ValidateBackendResponse } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCartItemSchema, TDeleteCartItemSchema } from "../schema";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();
    const queryKey = ["cart"];
    return useMutation({
        mutationKey: ["cart", "delete"],
        mutationFn: async (id: string):Promise<TDeleteCartItemSchema | undefined> => {
            return await api
                .delete(`auth/cart/${id}`)
                .then((res) => ValidateBackendResponse(res.data,DeleteCartItemSchema));
        },
        onSuccess:async () => {
            await queryClient.invalidateQueries({
                queryKey:queryKey
            });
        },
    });
}
