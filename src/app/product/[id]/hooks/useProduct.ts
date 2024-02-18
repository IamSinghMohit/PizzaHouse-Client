import api from "@/lib/axios";
import { GetProductSchema, TGetProductSchema } from "@/schema/get";

export async function useProduct(
    id: string,
): Promise<TGetProductSchema["data"]> {
    return await api
        .get(`/product/${id}`)
        .then((res) => res.data)
        .then((res) => {
            return GetProductSchema.parse(res).data;
        });
}
