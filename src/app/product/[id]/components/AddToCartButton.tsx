"use client";

import { Button } from "@/components/ui/button";
import { BaggageClaim } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { addToCart } from "@/store/slices/cart";
import { v4 as uuidV4 } from "uuid";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {};

export default function AddToCartButton({}: Props) {
    const productState = useAppSelector((state) => state.product.product_info);
    const { price, topings } = useAppSelector((state) => state.product);
    const urlPath = usePathname().split("/");
    const dispatch = useAppDispatch();

    function handleClick() {
        const topingsArray = [];
        for (let key in topings) {
            topingsArray.push(topings[key]);
        }
        const sections = [];
        for (let key in productState.sections) {
            const obj = {
                name: productState.sections[key].name,
                attribute: productState.sections[key].attribute,
                value: productState.sections[key].value,
            };
            sections.push(obj);
        }
        dispatch(
            addToCart({
                id: uuidV4(),
                price: price,
                quantity: 1,
                product_id: urlPath[urlPath.length - 1],
                product_description:
                    "this is the dommy description update later",
                product_price: productState.price,
                topings: topingsArray,
                product_name: productState.name,
                product_image: productState.image,
                product_sections: sections,
            }),
        );
    }
    return (
        <Button onClick={handleClick} className="flex items-center gap-1">
            <span>Add to Cart</span>
            <BaggageClaim />
        </Button>
    );
}
