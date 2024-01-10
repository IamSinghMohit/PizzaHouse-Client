import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSliceState, Twindow } from "../../types/user";
import { TuserSchema } from "@/schema/base/auth";

const initialState: IUserSliceState = {
    user: null,
    isTriedToAutoLogin: false,
    window: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setWindow(state, action: PayloadAction<Twindow>) {
            state.window = action.payload;
        },
        setUser(state, action: PayloadAction<TuserSchema>) {
            state.user = action.payload;
        },
    },
});
export const { setWindow, setUser } = userSlice.actions;
