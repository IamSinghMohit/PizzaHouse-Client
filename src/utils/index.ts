import { toast } from "sonner";
import { ZodError, z, ZodSchema } from "zod";

export function ValidateBackendResponse<T>(
    response: any,
    schema: ZodSchema<T>,
) {
    const baseResponse = z.object({
        success: z.boolean(),
        data: schema,
    });
    try {
        const result = baseResponse.parse(response);
        if (!result.success) {
            if (typeof window !== "undefined") {
                toast.error("unsuccessful response");
            }
            return undefined;
        }
        return result.data;
    } catch (error) {
        if (error instanceof ZodError) {
            if (typeof window !== "undefined") {
                toast.error("received bad data");
            }
            console.log(error);
        } else {
            if (typeof window !== "undefined") {
                toast.error("some server error");
            }
            throw new Error("some server error");
        }
    }
    return undefined;
}
