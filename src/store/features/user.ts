import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSliceState, Twindow } from "../../types/user";

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
    },
});
export const { setWindow } = userSlice.actions;
