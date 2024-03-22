import api from "@/lib/axios";
import { ValidateBackendResponse } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    DeleteCartItemSchema,
    TDeleteCartItemSchema,
    TGetCartProductsSchema,
} from "../schema";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();
    const queryKey = ["cart"];
    return useMutation({
        mutationKey: ["cart", "delete"],
        mutationFn: async (
            id: string,
        ): Promise<TDeleteCartItemSchema | undefined> => {
            return await api
                .patch(`auth/cart/${id}`)
                .then((res) =>
                    ValidateBackendResponse(res.data, DeleteCartItemSchema),
                );
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({
                queryKey: queryKey,
            });
            const previousData = queryClient.getQueryData(
                queryKey,
            ) as TGetCartProductsSchema;
            queryClient.setQueryData(queryKey, (old: TGetCartProductsSchema) =>
                old.filter((item) => item.id !== id),
            );
            return {
                prevData: previousData,
            };
        },
        onError: (_error, _unknown, context) => {
            queryClient.setQueryData(queryKey, context?.prevData);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKey,
            });
        },
    });
}
