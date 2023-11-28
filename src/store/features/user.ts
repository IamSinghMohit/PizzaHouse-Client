import { createSlice } from "@reduxjs/toolkit";
import { IUserSliceState } from "../../types/user";

const initialState: IUserSliceState = {
    user: null,
    isTriedToAutoLogin: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});
export const {} = userSlice.actions;
