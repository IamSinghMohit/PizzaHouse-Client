import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getProductAttributes(id: string) {
    return await api.get(`/product/attributes/${id}`).then((res) => res.data.data)
}

export default function useProductAttributes(id: string) {
    return useQuery({
        queryKey: ["product", "attributes", id],
        queryFn: () => getProductAttributes(id),
        initialData:{
            attributes:[],
        },
        enabled: !!id,
    });
}
