import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSliceState, TUserStateUser} from "../../types/user";

const initialState: IUserSliceState = {
    user: null,
    stripePublishKey: null,
    cartItems:0,
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
        seetUserCartItems(state,action:PayloadAction<number>){
            state.cartItems = action.payload
        }
    },
});
export const { setUserStripeSecret, setUser ,seetUserCartItems} = userSlice.actions;
