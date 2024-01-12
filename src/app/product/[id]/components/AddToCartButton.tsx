"use client";
import { Button } from "@/components/ui/button";
import { BaggageClaim } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { addToCart } from "@/store/slices/cart";
import {v4 as uuidV4} from "uuid"
import { usePathname } from "next/navigation";
    
type Props = {};

export default function AddToCartButton({}: Props) {
    const productState = useAppSelector((state) => state.product)
    const array = usePathname().split("/")
    const dispatch = useAppDispatch()
    function handleClick() {
        const topingsArray = []
        for(let key in productState.topings){
            topingsArray.push(productState.topings[key])
        }
        dispatch(addToCart({
            id:uuidV4(),
            topings:topingsArray,
            product_id:array[array.length - 1],
            product_price:productState.price,
        }))
    }

    return (
        <Link href={"/cart/lksjdflkjl23l2k3j"}>
            <Button onClick={handleClick} className="flex items-center gap-1">
                <span>Add to Cart</span>
                <BaggageClaim />
            </Button>
        </Link>
    );
}
