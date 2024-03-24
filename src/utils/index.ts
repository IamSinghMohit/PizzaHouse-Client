import { z, ZodSchema } from "zod";
import { toast } from "sonner";
export { default as NextFetch } from "./nextFetch";

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
export function ShowProhibitedInfo() {
    toast.error("Database operations are prohibited");
    toast.info("Go to faq page for more info");
}
