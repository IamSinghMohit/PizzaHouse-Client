import { z, TypeOf } from "zod";
import { BaseResponse, BaseResponseWithNameAndImage } from "./get/base";

export const UserSchema = z
    .object({
        name: z.string(),
        avatar: z.string().optional(),
    })
    .merge(BaseResponse);

export const ProductSchema = z.object({
    category: z.string(),
    description: z.string(),
    status: z.string(),
    price_attributes: z.string(),
    default_prices: z.string(),
    price: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    featured: z.string(),
}).merge(BaseResponseWithNameAndImage)

export type TUserSchema = TypeOf<typeof UserSchema>;
