import { z } from "zod";
export const LoginSchema = z.object({
    email: z.string().min(2),
    password: z.string().min(2),
});
export const SigninnSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(2),
});

export type TLoginSchema = z.TypeOf<typeof LoginSchema>;
export type TSigninSchema = z.TypeOf<typeof SigninnSchema>;
