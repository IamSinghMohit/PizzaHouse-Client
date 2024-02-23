import api from "@/lib/axios";
import {
    GetFormatedProductsSchema,
    TGetFormatedProductsSchema,
} from "@/schema/product";
import { ValidateBackendResponse } from "@/utils";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<TGetFormatedProductsSchema | undefined> {
    return await api
        .get("/product/formated?productLimit=6")
        .then((res) =>
            ValidateBackendResponse(res.data, GetFormatedProductsSchema)
        );
}

export function useFormatedProducts() {
    return useQuery({
        queryKey: ["product", "formated"],
        queryFn: getProducts,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}
