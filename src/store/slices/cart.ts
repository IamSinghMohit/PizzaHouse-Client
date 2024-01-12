import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
type TCartItem = {
    id: string;
    product_name: string;
    product_id: string;
    product_price: number;
    product_image:string;
    product_sections: Array<{
        section_name: string;
        attribute_name: string;
        price: number;
    }>;
    topings: Array<{
        id: string;
        name: string;
        toping:string;
        price: number;
    }>;
};

const CartItemAdapter = createEntityAdapter({
    selectId: (item: TCartItem) => item.id,
    sortComparer: (a, b) => a.product_name.localeCompare(b.product_name),
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: CartItemAdapter.getInitialState(),
    reducers: {
        addToCart: CartItemAdapter.addOne,
    },
});
export const { addToCart } = cartSlice.actions;
