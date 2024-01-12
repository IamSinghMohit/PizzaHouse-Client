"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { TGetProductSchema } from "@/schema/get";
import {
    setCleanState,
    setOrderProductPrice,
    setProductInfo,
} from "@/store/slices/product/product";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
    product: TGetProductSchema["data"];
};

export default function ProductPrice({ product }: Props) {
    const dispatch = useAppDispatch();
    const ProductPrice = useAppSelector((state) => state.product.price);
    const urlArray = usePathname().split("/");
    const id = urlArray[urlArray.length - 1];
    const product_id = useAppSelector((state) => state.product.product_info.id);

    useEffect(() => {
        if (id !== product_id) {
            dispatch(setCleanState());
            dispatch(setOrderProductPrice(product.price));
            dispatch(
                setProductInfo({
                    price: product.price,
                    id: id,
                    name: product.name,
                    image: product.image,
                    sections: {},
                }),
            );
        }
    }, [product]);
    return (
        <h6 className="my-1">
            <span className="font-bold text-black">Price</span>: {ProductPrice}
        </h6>
    );
}
