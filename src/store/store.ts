import { PayloadAction, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import productSlice from "./slices/product/product";
import { CartItemAdapter, cartSlice } from "./slices/cart";

// Middleware to save and load data from localStorage
const localStorageMiddleware = () => (next: any) => (action: PayloadAction) => {
    const result = next(action);

    if (action.type === "cart/addToCart") {
        // Save to localStorage
        const state = store.getState();
        localStorage.setItem("cart-items", JSON.stringify(state.cart));
    }

    return result;
};
let preloadedState;
try {
    const localStorageData = localStorage.getItem("cart_items");
    preloadedState = localStorage
        ? { cart: JSON.parse(localStorageData) }
        : {};
    console.log(preloadedState )
} catch (error) {
    console.log(error);
}
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
