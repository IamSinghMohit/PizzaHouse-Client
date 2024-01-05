import api from "@/lib/axios";
import { GetTopoingSchema, TGetTopoingSchema } from "@/schema/get";
import { useQuery } from "@tanstack/react-query";

async function getTopings(id: string): Promise<TGetTopoingSchema["data"]> {
    const result = await api.get(`/toping/category/${id}`).then((res) => res.data);
    try {
        return GetTopoingSchema.parse(result).data;
    } catch (error) {
        console.log(error)
        return []
    }
}
export function useTopings(id: string) {
    return useQuery({
        queryKey: ["toping", id],
        queryFn: () => getTopings(id),
    });
}
