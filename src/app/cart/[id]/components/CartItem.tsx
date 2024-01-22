"use client";

import React, { useRef, useState } from "react";
import OrderQuantity from "./OrderQuantity";
import { ClipboardList, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CImage from "@/components/CImage";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { EntityId } from "@reduxjs/toolkit";
import { removeOneFromCart, updateOneIntoCart } from "@/store/slices/cart";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import axios from "@/lib/axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./PaymentForm";
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
            }),
        );
    }

    // async function makePayment() {
    //     stripePromiseRef.current = loadStripe(
    //         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    //     ) as Stripe;
    //     const secret = await axios
    //         .post("order/create", {
    //             price: 500,
    //         })
    //         .then((res) => res.data);
    //     setClientSecret(secret.client_secret);
    // }

    return (
        <li className="flex items-start gap-4 justify-between">
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

            <OrderQuantity
                handleValueChange={handleValueChange}
                quantity={item.quantity}
            />
            <Link href={`/order/${id}`}>
                <Button variant={"link"}>
                    <Eye width={18} height={18} />{" "}
                    <span className="ml-1">view</span>
                </Button>
            </Link>
            <div className="flex flex-col gap-1 items-end">
                <Button
                    size={"icon"}
                    className="rounded-md"
                    onClick={() => {
                        dispatch(removeOneFromCart(id));
                    }}
                >
                    <Trash2 />
                </Button>
                <Link href={`/payment/${id}`}>
                    <Button className="bg-primary_orange flex items-center gap-1">
                        <span>
                            <ClipboardList />
                        </span>
                        Place Order
                    </Button>
                </Link>
            </div>
            {/* <Button className="flex items-center gap-1" onClick={makePayment}>
                <ClipboardList />
                Place
            </Button> */}
        </li>
    );
}

export default CartItem;
