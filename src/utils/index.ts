import { z, ZodSchema } from "zod";

export function ValidateBackendResponse<T>(
    response: any,
    schema: ZodSchema<T>,
) {
    const baseResponse = z.object({
        success: z.boolean(),
        data: schema,
    });
    return baseResponse.parse(response).data;
}
