import { z, TypeOf } from "zod";

export const UserDetailsSchema = z.object({
    last_name: z.string().min(1),
    first_name: z.string().min(1),
    address: z.string().min(5),
    state: z.string().min(1),
    city: z.string().min(1),
});
