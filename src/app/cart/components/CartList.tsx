"use client";

import { useAppSelector } from "@/hooks";
import CartItem from "./CartItem";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { shallowEqual } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dot, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import CImage from "@/lib/CImage";
import { OrderStatusEnum } from "@/app/order/[id]/types";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import CartLoader from "./CartLoader";
import { Server, Client, HydrationProvider } from "react-hydration-provider";
import CartSummary from "./CartSummary";
import { useQueryClient } from "@tanstack/react-query";
import { TGetCartProductsSchema } from "../schema";

type Props = {};

function CartList({}: Props) {
    const ids = useAppSelector((state) => state.cart.ids, shallowEqual);
    const queryClient = useQueryClient();
    const cartItems = useAppSelector((state) => state.user.cartItems);
    const userCart = queryClient.getQueryData<TGetCartProductsSchema>(["cart"]);
    const showImage = ids.length < 1 && cartItems < 1;

    return (
        <HydrationProvider>
            <div>
                <Client>
                    {showImage ? (
                        <Image
                            src="/empty-cart.png"
                            className="mx-auto mt-10"
                            width={550}
                            height={458}
                            sizes="(max-width: 768px)100vw, (max-width: 1200px)50vw, 30vw"
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
                                {userCart?.map((pro) => (
                                     <FetchedCartItemRenderer
                                        product={pro}
                                        key={pro.id}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                </Client>
                <Server>
                    <CartLoader />
                </Server>
            </div>
            {!showImage && (
                <Client>
                    <CartSummary />
                </Client>
            )}
        </HydrationProvider>
    );
}

export default CartList;

function FetchedCartItemRenderer({
    product,
}: {
    product: TGetCartProductsSchema[0];
}) {
    const { mutate } = useDeleteCartItem();
    return (
        <li>
            <div className="flex items-start justify-between flex-wrap gap-2">
                {/* LEFT SIDE */}
                <div className="flex items-start gap-2">
                    <CImage
                        src={product.image}
                        alt="cart item image"
                        width={120}
                        className="rounded-sm"
                        height={120}
                    />
                    <div>
                        <h3 className="text-sm text-gray-900 text-[21px]">
                            {product.name}
                        </h3>
                        <span className="text-gray-600">
                            Price: {product.price}
                        </span>
                        <h5 className="flex items-center text-primary_red">
                            <Dot />
                            {product.status}
                        </h5>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    {product.status === OrderStatusEnum.COMPLETED && (
                        <Button
                            size={"icon"}
                            className="rounded-xl"
                            onClick={() => mutate(product.id)}
                        >
                            <Trash2 />
                        </Button>
                    )}
                    <Link href={`/order/${product.id}`}>
                        <Button variant={"link"} className="pr-0">
                            <Eye width={18} height={18} />{" "}
                            <span className="ml-1">view</span>
                        </Button>
                    </Link>
                </div>
            </div>
            <Separator orientation="horizontal" />
        </li>
    );
}
