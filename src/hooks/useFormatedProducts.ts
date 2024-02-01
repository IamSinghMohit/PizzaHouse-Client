import api from "@/lib/axios";
import {
    GetFormatedProductsSchema,
    TGetFormatedProductsSchema,
} from "@/schema/get";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<TGetFormatedProductsSchema["data"]> {
    const result = await api.get("/product/formated?productLimit=6").then((res) => res.data);
    try {
        return GetFormatedProductsSchema.parse(result).data;
    } catch (error) {
        return [];
    }
}

export function useFormatedProducts() {
    return useQuery({
        queryKey: ["product", "formated"],
        queryFn: getProducts,
    });
}
