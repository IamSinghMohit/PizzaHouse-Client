"use client"

import React from "react";
import OrderQuantity from "./OrderQuantity";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CImage from "@/components/CImage";
import { useAppSelector } from "@/hooks/state";
import { EntityId } from "@reduxjs/toolkit";

function CartItem({ id }: { id: EntityId }) {
    const item = useAppSelector((state) => state.cart.entities[id]);
    if (!item) {
        return;
    }
    return (
        <li className="flex items-center gap-4">
            <CImage
                src={item.product_image}
                alt="cart item image"
                width={200}
                height={200}
            />
            <div>
                <h3 className="text-sm text-gray-900">{item.product_name}</h3>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
                <OrderQuantity />
            </div>
            <Button size={"icon"} className="rounded-md">
                <Trash2 />
            </Button>
        </li>
    );
}

export default CartItem;
