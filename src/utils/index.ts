import { z, ZodSchema } from "zod";

export function ValidateBackendResponse<T>(
    response: any,
    schema: ZodSchema<T>,
) {
    const baseResponse = z.object({
        success: z.boolean(),
        data: schema,
    });
    return baseResponse.parse(response).data!;
}

export function ValidateBackendErrorResponse(res: any) {
    const schema = z.object({
        success: z.literal(false),
        error: z.object({
            code: z.number(),
            message: z.string(),
        }),
    });
    return schema.parse(res).error;
}
