import { z } from "zod";
import BaseResponseSchema from ".";

export const LoginSchema = z.object({
    email: z.string().min(2),
    password: z.string().min(2),
});

export const SigninnSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(2),
});

export const UserSchema = z
    .object({
        avatar: z.string().optional(),
    })
    .merge(BaseResponseSchema.id)
    .merge(BaseResponseSchema.name_);

export type TLoginSchema = z.TypeOf<typeof LoginSchema>;
export type TSigninSchema = z.TypeOf<typeof SigninnSchema>;
export type TuserSchema = z.TypeOf<typeof UserSchema>;
