import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ProdutSectionsSchema, TProdutSectionsSchema } from "@/schema/product";
import { ValidateBackendResponse } from "@/utils";

export async function getProductAttributes(
    id: string,
): Promise<TProdutSectionsSchema | undefined> {
    return await api
        .get(`/product/sections/${id}`)
        .then((res) => ValidateBackendResponse(res.data, ProdutSectionsSchema));
}

export default function useProductAttributes(id: string) {
    return useQuery({
        queryKey: ["product", "attributes", id],
        queryFn: () => getProductAttributes(id),
        enabled: !!id,
    });
}
