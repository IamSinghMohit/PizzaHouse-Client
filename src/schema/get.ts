import { z, TypeOf } from "zod";
import {
    ProductSchema,
    ProdutSectionsSchema,
    formatedProductSchema,
} from "./base/product";
import BaseResponseSchema from "./base";
import { UserSchema } from "./base/auth";
import { TopingSchema } from "./base/topings";

export const GetProductsSchema = z.array(
    z
        .object({
            category: z.string(),
        })
        .merge(ProductSchema),
);

export const GetProductSectionsSchema = z
    .object({
        data: ProdutSectionsSchema,
    })
    .merge(BaseResponseSchema.success);

export const GetProductSchema = z
    .object({
        data: ProductSchema,
    })
    .merge(BaseResponseSchema.success);

export const GetUserSchema = z
    .object({
        data: UserSchema,
    })
    .merge(BaseResponseSchema.success);

export const GetFormatedProductsSchema = z
    .object({
        data: formatedProductSchema,
    })
    .merge(BaseResponseSchema.success);

export const GetTopoingSchema = z
    .object({
        data: z.array(TopingSchema),
    })
    .merge(BaseResponseSchema.success);

export const GetStripePublishKeySchema = z.object({
    success: z.boolean(),
    data: z.string(),
});
export type TGetStripePublishKeySchema = TypeOf<
    typeof GetStripePublishKeySchema
>;
export type TGetProductSchema = TypeOf<typeof GetProductSchema>;
export type TGetUserSchema = TypeOf<typeof GetUserSchema>;
export type TGetFormatedProductsSchema = TypeOf<
    typeof GetFormatedProductsSchema
>;
export type TGetProductSectionsSchema = TypeOf<typeof GetProductSectionsSchema>;
export type TGetTopoingSchema = TypeOf<typeof GetTopoingSchema>;
