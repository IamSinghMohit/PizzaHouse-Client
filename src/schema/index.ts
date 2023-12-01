import { z, TypeOf } from "zod";
import { BaseResponse, BaseResponseWithNameAndImage } from "./get/base";

export const UserSchema = z
    .object({
        name: z.string(),
        avatar: z.string().optional(),
    })
    .merge(BaseResponse);

export const ProductSchema = z
    .object({
        category: z.string(),
        description: z.string(),
        price: z.number(),
        price_attributes: z.array(z.string()),
        default_prices: z.string(),
    })
    .merge(BaseResponseWithNameAndImage);

export type TUserSchema = TypeOf<typeof UserSchema>;
