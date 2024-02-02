import { z, TypeOf } from "zod";

export const CategorySchema = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    sections: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
});
export type TGetCategorySchema = TypeOf<typeof CategorySchema>;

export const GetProductStatsSchema = z.object({
    max_price: z.number(),
});
export type TGetProductStatsSchema = TypeOf<typeof GetProductStatsSchema>;
