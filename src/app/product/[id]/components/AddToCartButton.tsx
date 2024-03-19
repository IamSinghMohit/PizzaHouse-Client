"use client";

import { Button } from "@/components/ui/button";
import { BaggageClaim } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addToCart } from "@/store/slices/cart";
import { v4 as uuidV4 } from "uuid";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { setProductTopings } from "@/store/slices/product";

type Props = {
    className?: string;
};

export default function AddToCartButton({ className }: Props) {
    const productState = useAppSelector((state) => state.product.product_info);
    const { total_price, topings } = useAppSelector((state) => state.product);
    const urlPath = usePathname().split("/");
    const dispatch = useAppDispatch();

    function handleClick() {
        const topingsArray = [];
        for (let key in topings) {
            topingsArray.push(topings[key]);
        }
        const sections = [];
        for (let key in productState.order_sections) {
            const obj = {
                name: productState.order_sections[key].name,
                attribute: productState.order_sections[key].attribute,
                value: productState.order_sections[key].value,
            };
            sections.push(obj);
        }
        dispatch(
            addToCart({
                id: uuidV4(),
                price: total_price,
                quantity: 1,
                product_id: urlPath[urlPath.length - 1],
                product_description: productState.description,
                product_price: productState.price,
                topings: topingsArray,
                product_name: productState.name,
                product_image: productState.image,
                product_sections: sections,
            }),
        );
        dispatch(setProductTopings({ type: "RESET", data: {} }));

        toast.success("product  added");
    }
    return (
        <Button
            onClick={handleClick}
            className={`flex items-center gap-1 rounded-xl ${className}`}
        >
            Add
        </Button>
    );
}
