import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();
    const queryKey = ["cart"];
    return useMutation({
        mutationKey: ["cart", "delete"],
        mutationFn: async (id: string) => {
            return await api
                .delete(`auth/cart/${id}`)
                .then((res) => res.data.data);
        },
        onSuccess:async () => {
            await queryClient.invalidateQueries({
                queryKey:queryKey
            });
        },
    });
}
