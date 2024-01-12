import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    TProductSections,
    TProductSliceIntialState,
    TProductTopings,
} from "./types";

const initialState: TProductSliceIntialState = {
    price: 0,
    topings: {},
    product_management: {
        id: "",
        price: 0,
        name: "",
        image: "",
        sections: {},
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setOrderProductPrice(state, action: PayloadAction<number>) {
            state.price = action.payload;
        },
        setOrderProductSections(
            state,
            action: PayloadAction<Record<string, TProductSections>>,
        ) {
            let price = 0;
            state.product_management.sections = {
                ...state.product_management.sections,
                ...action.payload,
            };
            for (let key in state.product_management.sections) {
                const obj = state.product_management.sections[key];
                price += obj.value;
            }
            for (let key in state.topings) {
                price += state.topings[key].price;
            }
            state.price = price;
        },
        setOrderTopings(
            state,
            action: PayloadAction<{
                type: "ADD" | "DELETE";
                data: Record<string, TProductTopings>;
            }>,
        ) {
            switch (action.payload.type) {
                case "ADD": {
                    state.topings = {
                        ...state.topings,
                        ...action.payload.data,
                    };
                    let price = 0;
                    for (let key in state.product_management.sections) {
                        const obj = state.product_management.sections[key];
                        price += obj.value;
                    }
                    for (let key in state.topings) {
                        price += state.topings[key].price;
                    }
                    break;
                }
                case "DELETE": {
                    for (let key in action.payload.data) {
                        delete state.topings[key];
                    }
                }
            }
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
} = productSlice.actions;
export default productSlice;
