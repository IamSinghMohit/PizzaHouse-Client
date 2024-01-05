import { z } from "zod";
import BaseResponseSchema from ".";

export const TopingSchema = z
    .object({})
    .merge(BaseResponseSchema.id)
    .merge(BaseResponseSchema.name_)
    .merge(BaseResponseSchema.image)
    .merge(BaseResponseSchema.price);
