import { UserSchemaType } from "@/schema/user";
export interface IUserSliceState {
    user: UserSchemaType | null;
    isTriedToAutoLogin: boolean;
}
