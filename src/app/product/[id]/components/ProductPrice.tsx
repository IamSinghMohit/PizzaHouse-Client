"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { TGetProductSchema } from "@/schema/get";
import {
    setStateDefault,
    setTotalPrice,
    setProductInfo,
} from "@/store/slices/product";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
    product: TGetProductSchema["data"];
};

export default function ProductPrice({ product }: Props) {
    const dispatch = useAppDispatch();
    const ProductPrice = useAppSelector((state) => state.product.total_price);
    const urlArray = usePathname().split("/");
    const id = urlArray[urlArray.length - 1];

    useEffect(() => {
        dispatch(setStateDefault());
        dispatch(setTotalPrice(product.price));
        dispatch(
            setProductInfo({
                price: product.price,
                id: id,
                name: product.name,
                image: product.image,
                description:product.description,
                order_sections: {},
            }),
        );
    }, [product]);

    return (
        <h6 className="my-1">
            <span className="font-bold text-black">Price</span>: {ProductPrice}
        </h6>
    );
}
