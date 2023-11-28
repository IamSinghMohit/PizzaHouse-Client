import { UserSchemaType } from "@/schema/user";
export type Twindow = "mobile" | "desktop" | null;
export interface IUserSliceState {
    user: UserSchemaType | null;
    isTriedToAutoLogin: boolean;
    window: Twindow;
}
