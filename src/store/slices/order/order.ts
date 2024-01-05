import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderProductSections, TOrderSliceInitialState } from "./types";

const initialState: TOrderSliceInitialState = {
    price: 0,
    product_sections: {},
    topings: [],
    product_id: "",
    quantity: 0,
};

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderProductPrice(state, action: PayloadAction<number>) {
            state.price = action.payload;
        },
        setOrderProductSections(
            state,
            action: PayloadAction<Record<string, TOrderProductSections>>,
        ) {
            state.product_sections = {
                ...state.product_sections,
                ...action.payload,
            };
            let price = 0;
            for (let key in state.product_sections) {
                const obj = state.product_sections[key];
                price += obj.value;
            }
            state.topings.forEach((top) => {
                price += top.price;
            });

            state.price = price;
        },
        setOrderTopings(
            state,
            action: PayloadAction<TOrderSliceInitialState["topings"]>,
        ) {
            state.topings = action.payload;
            let price = 0;
            for (let key in state.product_sections) {
                const obj = state.product_sections[key];
                price += obj.value;
            }
            state.topings.forEach((top) => {
                price += top.price;
            });
            state.price = price;
        },
        setOrderProductId(state, action: PayloadAction<string>) {
            state.product_id = action.payload;
        },
        setOrderQuantity(state, action: PayloadAction<number>) {
            state.quantity = action.payload;
        },
    },
});

export const {
    setOrderProductId,
    setOrderTopings,
    setOrderProductPrice,
    setOrderProductSections,
    setOrderQuantity,
} = OrderSlice.actions;
export default OrderSlice;
