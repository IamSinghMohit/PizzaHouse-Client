import { z } from "zod";
import { ProductSchema } from "..";

export const GetProductSchema = z.object({
    data: z.array(ProductSchema),
});
