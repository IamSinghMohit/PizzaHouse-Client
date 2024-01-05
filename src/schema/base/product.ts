import { z ,TypeOf} from "zod";
import BaseResponseSchema from "./index";

export const ProductSchema = z
    .object({
        category: z.string(),
        description: z.string(),
        price: z.number(),
        sections: z.array(z.string()),
        default_attributes: z.string(),
    })
    .merge(BaseResponseSchema.id)
    .merge(BaseResponseSchema.name_)
    .merge(BaseResponseSchema.image);

export const ProdutSectionsSchema = z.object({
    sections: z.array(
        z
            .object({
                attributes: z.array(
                    z
                        .object({
                            value: z.number(),
                        })
                        .merge(BaseResponseSchema.id)
                        .merge(BaseResponseSchema.name_),
                ),
            })
            .merge(BaseResponseSchema.id)
            .merge(BaseResponseSchema.name_),
    ),
    default_attributes: z.array(
        z
            .object({
                section: z.string(),
            })
            .merge(BaseResponseSchema.id)
            .merge(BaseResponseSchema.name_),
    ),
});

export const formatedProductSchema = z.array(
    z
        .object({
            category: z.string(),
            products: z.array(ProductSchema.partial()),
        })
        .merge(BaseResponseSchema.id),
);
export type TProductSchema =TypeOf<typeof ProductSchema> 
