import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import productSlice from "./slices/product/product";
import { cartSlice } from "./slices/cart";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product:productSlice.reducer,
        cart:cartSlice.reducer,
    },
});

export default store;
