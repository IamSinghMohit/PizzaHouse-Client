import { z ,TypeOf} from "zod";
import BaseResponseSchema from "./base";

export const TopingSchema = z
    .object({})
    .merge(BaseResponseSchema.id)
    .merge(BaseResponseSchema.name_)
    .merge(BaseResponseSchema.image)
    .merge(BaseResponseSchema.price);

export type TTopingSchema = TypeOf<typeof TopingSchema >
