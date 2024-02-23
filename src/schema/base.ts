import { z} from "zod";
class BaseResponseSchema {
    static id = z.object({ id: z.string() });
    static name_ = z.object({ name: z.string() });
    static image = z.object({ image: z.string() });
    static success = z.object({ success: z.boolean() });
    static price = z.object({price:z.number()})
}

export default BaseResponseSchema;
