export type Twindow = "mobile" | "desktop" | null;
export type TUserStateUser = {
    id:string;
    first_name: string;
    avatar?: string;
    last_name?: string;
};
export interface IUserSliceState {
    user: TUserStateUser | null;
    isTriedToAutoLogin: boolean;
    stripePublishKey : string | null;
}
