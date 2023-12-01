import api from "@/lib/axios";
import { GetProductSchema, TGetProductSchema } from "@/schema/get/product";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<TGetProductSchema | undefined> {
    const result = await api.get("/product/formated").then((res) => res.data);
    const data = GetProductSchema.parse(result);
    console.log(data)
    return data
}

export function useFormatedProducts() {
    return useQuery({
        queryKey: ["product", "formated"],
        queryFn: getProducts,
    });
}
