'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setOrderProductPrice } from "@/store/slices/order/order";
import React, { useEffect } from "react";

type Props = {
    price: number;
};

export default function ProductPrice({ price }: Props) {
    const dispatch = useAppDispatch()
    const ProductPrice = useAppSelector((state) => state.order.price)
    useEffect(() => {
       dispatch(setOrderProductPrice(price)) 
    },[price])
    return (
        <h6 className="my-1">
            <span className="font-bold text-black">Price</span>: {ProductPrice}
        </h6>
    );
}
