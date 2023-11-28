import { z } from "zod";
export const FormSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().min(2),
    password: z.string().min(2),
});
export type FromSchemaType = z.TypeOf<typeof FormSchema>;
