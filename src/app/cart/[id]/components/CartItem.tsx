"use client";

import React, { useRef, useState } from "react";
import OrderQuantity from "./OrderQuantity";
import { ClipboardList, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CImage from "@/components/CImage";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { EntityId } from "@reduxjs/toolkit";
import { removeOneFromCart, updateOneIntoCart } from "@/store/slices/cart";
import Link from "next/link";

function CartItem({ id }: { id: EntityId }) {
    const item = useAppSelector((state) => state.cart.entities[id]);

    const dispatch = useAppDispatch();
    if (!item) {
        return;
    }
    function handleValueChange(value: number) {
        const basePrice = item?.price / item?.quantity;
        dispatch(
            updateOneIntoCart({
                id: id,
                changes: {
                    quantity: value,
                    price: basePrice * value,
                },
            })
        );
    }

    return (
        <div className="flex items-start justify-between flex-wrap gap-2">
            {/* LEFT SIDE */}
            <div className="flex items-start gap-2">
                <CImage
                    src={item.product_image}
                    alt="cart item image"
                    width={120}
                    className="rounded-sm"
                    height={120}
                />
                <div>
                    <h3 className="text-sm text-gray-900 text-[21px]">
                        {item.product_name}
                    </h3>
                    <span className="text-gray-600">Price: {item.price}</span>
                </div>
            </div>
            {/* RIGHT SIDE  */}
            <div className="flex flex-col justify-between items-center">
                <OrderQuantity
                    handleValueChange={handleValueChange}
                    quantity={item.quantity}
                />
                <Link href={`/order/${id}`}>
                    <Button variant={"link"} className="pr-0 pt-0">
                        <Eye width={18} height={18} />{" "}
                        <span className="ml-1">view</span>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <Button
                    size={"icon"}
                    className="rounded-xl"
                    onClick={() => {
                        dispatch(removeOneFromCart(id));
                    }}
                >
                    <Trash2 />
                </Button>
                <Link href={`/payment/${id}`}>
                    <Button variant={"link"} className="pr-0 pt-0">
                        <span>
                            <ClipboardList />
                        </span>
                        Place Order
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CartItem;
