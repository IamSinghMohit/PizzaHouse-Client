import { z } from "zod";
import { ProductSchema } from "..";

export const GetProductSchema = z.array(
    z.object({
        id: z.string(),
        category: z.string(),
        products: z.array(ProductSchema),
    })
);
export type TGetProductSchema = z.TypeOf<typeof GetProductSchema>;
