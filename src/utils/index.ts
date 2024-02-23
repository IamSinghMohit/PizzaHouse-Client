import { toast } from "sonner";
import {  ZodError, z, ZodSchema } from "zod";

export function ValidateBackendResponse<T>(
    response: any,
    schema: ZodSchema<T>
) {
    const baseResponse = z.object({
        success: z.boolean(),
        data: schema,
    });
    try {
        const result = baseResponse.parse(response);
        if (!result.success) {
            // toast.error("unsuccessful response");
            return undefined;
        }
        return result.data;
    } catch (error) {
        if (error instanceof ZodError) {
            // toast.error("received bad data");
            console.log(error)
        } else {
            throw new Error(`Received bad data from the server`);
        }
    }
    return undefined;
}
