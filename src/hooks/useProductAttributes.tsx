import api from "@/lib/axios";
import {
    GetProductSectionsSchema,
    TGetProductSectionsSchema,
} from "@/schema/get";
import { useQuery } from "@tanstack/react-query";

async function getProductAttributes(
    id: string,
): Promise<TGetProductSectionsSchema["data"]> {
    try {
        const result = await api
            .get(`/product/sections/${id}`)
            .then((res) => res.data);
        return GetProductSectionsSchema.parse(result).data;
    } catch (error) {
        console.log(error);
        return {
            sections: [],
            default_attributes: [],
        };
    }
}

export default function useProductAttributes(id: string) {
    return useQuery({
        queryKey: ["product", "attributes", id],
        queryFn: () => getProductAttributes(id),
        enabled: !!id,
    });
}
