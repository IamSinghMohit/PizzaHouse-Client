import {z,TypeOf} from "zod"
import { BaseResponse } from "./get/base"

export const UserSchema = z.object({
    name:z.string(),
    avatar:z.string().optional(),
}).merge(BaseResponse)


export type UserSchemaType = TypeOf<typeof UserSchema>