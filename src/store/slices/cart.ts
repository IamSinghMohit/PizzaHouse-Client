import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
type TCartItem = {
    id: string;
    price: number;
    quantity: number;
    product_name: string;
    product_id: string;
    product_price: number;
    product_image: string;
    product_description:string;
    product_sections: Array<{
        name: string;
        attribute_id: string;
        value: number;
    }>;
    topings: Array<{
        id: string;
        name: string;
        image: string;
        price: number;
    }>;
};

export const CartItemAdapter = createEntityAdapter({
    selectId: (item: TCartItem) => item.id,
    sortComparer: (a, b) => a.product_name.localeCompare(b.product_name),
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: CartItemAdapter.getInitialState(),
    reducers: {
        addToCart: CartItemAdapter.addOne,
        updateOneIntoCart: CartItemAdapter.updateOne,
        removeOneFromCart: CartItemAdapter.removeOne,
    },
});
export const { addToCart, updateOneIntoCart, removeOneFromCart } =
    cartSlice.actions;
