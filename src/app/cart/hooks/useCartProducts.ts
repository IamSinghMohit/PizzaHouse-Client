import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCartProductsSchema, TGetCartProductsSchema } from "../schema";
import { toast } from "sonner";

async function getProducts(): Promise<TGetCartProductsSchema> {
    return await api("/auth/cart").then((res) => {
        return GetCartProductsSchema.parse(res.data.data);
    });
}
export function useCartProducts() {
    return useQuery({
        queryKey: ["cart", "products"],
        queryFn: getProducts,
    });
}
