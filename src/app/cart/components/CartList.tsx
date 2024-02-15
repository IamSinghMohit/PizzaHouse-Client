"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/state";
import CartItem from "./CartItem";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { shallowEqual } from "react-redux";
import { useCartProducts } from "../hooks/useCartProducts";
import { Button } from "@/components/ui/button";
import { Dot, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import CImage from "@/components/CImage";
import { OrderStatusEnum } from "@/app/order/[id]/types";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import CartLoader from "./CartLoader";

type Props = {};

function CartList({}: Props) {
    const ids = useAppSelector((state) => state.cart.ids, shallowEqual);
    const [pageLoading, setPageLoading] = useState(true);
    const { mutate } = useDeleteCartItem();
    const { data = [], isLoading } = useCartProducts();

    useEffect(() => {
        setPageLoading(false);
    }, []);

    return (
        <div>
            {!pageLoading ? (
                ids.length < 1 ? (
                    <Image
                        src="/empty-cart.png"
                        className="mx-auto mt-10"
                        width={500}
                        height={670}
                        alt="empty cart image"
                    />
                ) : (
                    <div className="mt-8">
                        <ul className="space-y-4">
                            {ids.map((id) => (
                                <li key={id}>
                                    <CartItem id={id} />
                                    <Separator orientation="horizontal" />
                                </li>
                            ))}
                            {(!pageLoading || !isLoading) &&
                                data.map((pro) => (
                                    <li key={pro.id}>
                                        <div className="flex items-start justify-between flex-wrap gap-2">
                                            {/* LEFT SIDE */}
                                            <div className="flex items-start gap-2">
                                                <CImage
                                                    src={pro.image}
                                                    alt="cart item image"
                                                    width={120}
                                                    className="rounded-sm"
                                                    height={120}
                                                />
                                                <div>
                                                    <h3 className="text-sm text-gray-900 text-[21px]">
                                                        {pro.name}
                                                    </h3>
                                                    <span className="text-gray-600">
                                                        Price: {pro.price}
                                                    </span>
                                                    <h5 className="flex items-center text-primary_red">
                                                        <Dot />
                                                        {pro.status}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                {pro.status ===
                                                    OrderStatusEnum.COMPLETED && (
                                                    <Button
                                                        size={"icon"}
                                                        className="rounded-xl"
                                                        onClick={() =>
                                                            mutate(pro.id)
                                                        }
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                )}
                                                <Link href={`/order/${pro.id}`}>
                                                    <Button
                                                        variant={"link"}
                                                        className="pr-0"
                                                    >
                                                        <Eye
                                                            width={18}
                                                            height={18}
                                                        />{" "}
                                                        <span className="ml-1">
                                                            view
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <Separator orientation="horizontal" />
                                    </li>
                                ))}
                        </ul>
                    </div>
                )
            ) : (
                <CartLoader />
            )}
        </div>
    );
}

export default CartList;