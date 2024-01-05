import api from "@/lib/axios";
import { GetProductSchema, TGetProductSchema } from "@/schema/get";

export async function useProduct(
    id: string,
): Promise<TGetProductSchema["data"]> {
    const result = await api.get(`/product/${id}`).then((res) => res.data);
    try {
        const data = GetProductSchema.parse(result).data;
        return data
    } catch (error) {
        return {} as any;
    }
}
