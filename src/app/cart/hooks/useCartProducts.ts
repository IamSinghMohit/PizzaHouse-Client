import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCartProductsSchema, TGetCartProductsSchema } from "../schema";

export async function getCartProducts(): Promise<TGetCartProductsSchema> {
    return await api("/auth/cart").then((res) => res.data.data);
}
export function useCartProducts() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCartProducts,
    });
}
