"use client";

import {
    TProductManagment,
    TProductSections,
    TProductTopings,
} from "@/store/slices/product/types";
import { ReactNode, createContext, useContext, useState } from "react";

const ProductContext = createContext({});
export const useProductContext = () => {
    return useContext(ProductContext);
};
export function ProductContextProvider({ children }: { children: ReactNode }) {
    const [price, setPrice] = useState<number>(0);
    const [productInfo, setProductInfo] = useState<Partial<TProductManagment>>({
        id: "",
        price: 0,
        name: "",
        image: "",
    });
    const [topings, setTopings] = useState<Record<string, TProductTopings>>({});
    const [productSections, setProductSections] = useState<
        Record<string, TProductSections>
    >({});

    return (
        <ProductContext.Provider
            value={{
                price,
                setPrice,
                productInfo,
                topings,
                productSections,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
