import api from "@/lib/axios";
import { GetFormatedProductsSchema } from "@/schema/product";
import { ValidateBackendResponse } from "@/utils";

export async function GetFormatedProducts() {
    return await api
        .get("/product/formated?productLimit=6")
        .then((res) => ValidateBackendResponse(res.data,GetFormatedProductsSchema));
}
