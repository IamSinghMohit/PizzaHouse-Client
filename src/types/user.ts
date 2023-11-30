import { TUserSchema } from "@/schema";
export type Twindow = "mobile" | "desktop" | null;
export interface IUserSliceState {
    user: TUserSchema | null;
    isTriedToAutoLogin: boolean;
    window: Twindow;
}
