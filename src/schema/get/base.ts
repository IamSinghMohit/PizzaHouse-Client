import { z } from "zod";

export const BaseResponse = z.object({
    id: z.string(),
});

export const BaseResponseWithNameAndImage = z
    .object({
        name: z.string(),
        image: z.string(),
    })
    .merge(BaseResponse);
