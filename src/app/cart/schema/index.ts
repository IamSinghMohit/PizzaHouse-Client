import { z, TypeOf } from "zod";

export const GetCartProductsSchema = z.array(
    z.object({
        id:z.string(),
        image: z.string(),
        quantity: z.number().gt(0),
        price: z.number().gt(0),
        name:z.string()
    }),
);
export type TGetCartProductsSchema = TypeOf<typeof GetCartProductsSchema>;
