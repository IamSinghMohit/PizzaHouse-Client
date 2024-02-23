import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCartProductsSchema, TGetCartProductsSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

export async function getCartProducts(): Promise<
    TGetCartProductsSchema | undefined
> {
    return await api("/auth/cart").then((res) =>
        ValidateBackendResponse(res.data, GetCartProductsSchema)
    );
}
export function useCartProducts() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCartProducts,
    });
}
