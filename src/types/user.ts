import { TuserSchema } from "@/schema/base/auth";

export type Twindow = "mobile" | "desktop" | null;
export interface IUserSliceState {
    user: TuserSchema| null;
    isTriedToAutoLogin: boolean;
    window: Twindow;
}
