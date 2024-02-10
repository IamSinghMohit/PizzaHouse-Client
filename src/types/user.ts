export type Twindow = "mobile" | "desktop" | null;
export type TUserStateUser = {
    id:string;
    first_name: string;
    avatar: string;
    last_name: string;
    email: string;
    state: string;
    city: string;
    address: string;
};
export interface IUserSliceState {
    user: TUserStateUser | null;
    isTriedToAutoLogin: boolean;
    stripePublishKey : string | null;
}
