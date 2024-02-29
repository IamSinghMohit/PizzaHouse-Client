import api from "@/lib/axios";
import {
    GetFormatedProductsSchema,
    TGetFormatedProductsSchema,
} from "@/schema/product";
import { ValidateBackendResponse } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useFormedProductsQueryKeys = ["products", "formated"];

export async function GetFormatedProducts(): Promise<TGetFormatedProductsSchema> {
    const result = await api.get("/product/formated?productLimit=6");
    return ValidateBackendResponse(result.data, GetFormatedProductsSchema);
}

export default function useFormatedProducts() {
    return useQuery({
        queryKey: useFormedProductsQueryKeys,
        staleTime:60 * 1000,
        queryFn: GetFormatedProducts,
    });
}
