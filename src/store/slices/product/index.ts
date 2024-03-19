import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    TProductInfo,
    TProductSections,
    TProductSliceIntialState,
    TProductTopings,
} from "./type";

const initialState: TProductSliceIntialState = {
    total_price: 0,
    topings: {},
    product_info: {
        id: "",
        price: 0,
        name: "",
        image: "",
        description: "",
        order_sections: {},
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setTotalPrice(state, action: PayloadAction<number>) {
            state.total_price = action.payload;
        },

        setProductOrderSections(
            state,
            action: PayloadAction<{
                type: "SET" | "ADD";
                data: Record<string, TProductSections>;
            }>,
        ) {
            switch (action.payload.type) {
                case "SET": {
                    state.product_info.order_sections = action.payload.data;
                    let price = 0;
                    for (let key in state.product_info.order_sections) {
                        const obj = state.product_info.order_sections[key];
                        price += obj.value;
                    }
                    for (let key in state.topings) {
                        price += state.topings[key].price;
                    }
                    state.total_price = price;
                    break;
                }
                case "ADD": {
                    state.product_info.order_sections = {
                        ...state.product_info.order_sections,
                        ...action.payload.data, // Changed action.payload to action.payload.data
                    };
                    let price = 0;
                    for (let key in state.product_info.order_sections) {
                        const obj = state.product_info.order_sections[key];
                        price += obj.value;
                    }
                    for (let key in state.topings) {
                        price += state.topings[key].price;
                    }
                    state.total_price = price;
                    break;
                }
                default: {
                    state.product_info.order_sections = {};
                    break;
                }
            }
        },

        setProductTopings(
            state,
            action: PayloadAction<{
                type: "ADD" | "DELETE" | "RESET";
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
                    for (let key in action.payload.data) {
                        price += action.payload.data[key].price;
                    }
                    state.total_price = state.total_price + price;
                    break;
                }
                case "DELETE": {
                    let price = 0;
                    for (let key in action.payload.data) {
                        price = state.topings[key].price;
                        delete state.topings[key];
                    }
                    state.total_price = state.total_price - price;
                    break;
                }
                case "RESET": {
                    state.topings = {};
                }
                default: {
                    state.topings = {};
                    break;
                }
            }
        },

        setOrderProductId(state, action: PayloadAction<string>) {
            state.product_info.id = action.payload;
        },

        setStateDefault(state) {
            const stateObj = {
                total_price: 0,
                topings: {},
                product_info: {
                    id: "",
                    price: 0,
                    name: "",
                    image: "",
                    description: "",
                    order_sections: {},
                },
            };
            state = stateObj;
        },

        setProductInfo(state, action: PayloadAction<TProductInfo>) {
            state.product_info = action.payload;
        },
    },
});

export const {
    setOrderProductId,
    setProductTopings,
    setTotalPrice,
    setProductOrderSections,
    setStateDefault,
    setProductInfo,
} = productSlice.actions;
export default productSlice;
