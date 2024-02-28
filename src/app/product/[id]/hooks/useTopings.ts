import api from "@/lib/axios";
import { TopingSchema, TTopingSchema } from "@/schema/topings";
import { ValidateBackendResponse } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export async function getTopings(id: string): Promise<TTopingSchema | []> {
    return await api
        .get(`/toping/category/${id}`)
        .then((res) => ValidateBackendResponse(res.data, TopingSchema) || []);
}
export function useTopings(id: string) {
    return useQuery({
        queryKey: ["toping", id],
        queryFn: () => getTopings(id),
    });
}
