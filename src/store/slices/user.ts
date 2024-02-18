import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSliceState, TUserStateUser} from "../../types/user";

const initialState: IUserSliceState = {
    user: null,
    isTriedToAutoLogin: false,
    stripePublishKey: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUserStateUser>) {
            state.user = action.payload;
        },
        setUserStripeSecret(state, action: PayloadAction<string>) {
            state.stripePublishKey = action.payload;
        },
    },
});
export const { setUserStripeSecret, setUser } = userSlice.actions;
