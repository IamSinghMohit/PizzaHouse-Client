import {
    GetFormatedProductsSchema,
    TGetFormatedProductsSchema,
} from "@/schema/product";
import { ValidateBackendResponse, NextFetch } from "@/utils";

export default async function useFormatedProducts(): Promise<TGetFormatedProductsSchema> {
    const response = await NextFetch("product/formated?productLimit=6", {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return ValidateBackendResponse(responseData, GetFormatedProductsSchema);
}
