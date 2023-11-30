import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSliceState, Twindow } from "../../types/user";
import { TUserSchema } from "@/schema";

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
        setUser(state, action: PayloadAction<TUserSchema>) {
            state.user = action.payload;
        },
    },
});
export const { setWindow, setUser } = userSlice.actions;
