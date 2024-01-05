import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import OrderSlice from "./slices/order/order";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        order:OrderSlice.reducer,
    },
});

export default store;
