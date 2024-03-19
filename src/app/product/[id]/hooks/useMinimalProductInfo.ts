import api from "@/lib/axios";
import { ValidateBackendResponse } from "@/utils";
import { z } from "zod";

export async function useMinimalProductInfo() {
    const schema = z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            category: z.string(),
        }),
    );

    let cursor = "";
    const products = [];

    while (true) {
        try {
            const response = await api.get(`/product/minimal-info/${cursor}`);
            const result = ValidateBackendResponse(response.data, schema);

            if (result.length === 0) {
                break;
            }

            products.push(...result);
            cursor = result[result.length - 1].id;
        } catch (error) {
            console.error("Error fetching products:", error);
            break;
        }
    }
    return products
}
