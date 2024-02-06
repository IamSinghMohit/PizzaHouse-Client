"use client";

import { PayloadAction, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import {  cartSlice } from "./slices/cart";
import productSlice from "./slices/product";

// Middleware to save and load data from localStorage
const localStorageMiddleware = () => (next: any) => (action: PayloadAction) => {
    const result = next(action);

    if (action.type.startsWith("cart/")) {
        const state = store.getState();
        localStorage.setItem("cart-items", JSON.stringify(state.cart));
    }
    return result;
};

let preloadedState =
    (() => {
        if (typeof window === "undefined") {
            return;
        }
        return { cart: JSON.parse(localStorage.getItem("cart-items") || "") };
    })() || undefined;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState,
});

export default store;
