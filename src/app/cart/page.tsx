"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/state";
import CartItem from "./components/CartItem";
import Image from "next/image";
import { BaggageClaim, Eye, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CartSummary from "./components/CartSummary";
import { shallowEqual } from "react-redux";
import { useCartProducts } from "./hooks/useCartProducts";
import CImage from "@/components/CImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
    const ids = useAppSelector((state) => state.cart.ids, shallowEqual);
    const [loading, setLoading] = useState(true);
    const { data = [] } = useCartProducts();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl flex items-center justify-center gap-2">
                            Cart{" "}
                            <BaggageClaim
                                width={40}
                                height={40}
                                className="text-primary_orange"
                            />
                        </h1>
                    </header>
                    {!loading ? (
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
                                </ul>
                            </div>
                        )
                    ) : (
                        <p>loading</p>
                    )}

                    {data.map((or) => (
                        <>
                            <div className="flex items-start justify-between flex-wrap gap-2">
                                {/* LEFT SIDE */}
                                <div className="flex items-start gap-2">
                                    <CImage
                                        src={or.image}
                                        alt="cart item image"
                                        width={120}
                                        className="rounded-sm"
                                        height={120}
                                    />
                                    <div>
                                        <h3 className="text-sm text-gray-900 text-[21px]">
                                            {or.name}
                                        </h3>
                                        <span className="text-gray-600">
                                            Price: {or.price}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Button
                                        size={"icon"}
                                        className="rounded-xl"
                                        onClick={() => {
                                            // dispatch(removeOneFromCart(id));
                                        }}
                                    >
                                        <Trash2 />
                                    </Button>
                                    <Link href={`/order/${or.id}`}>
                                        <Button
                                            variant={"link"}
                                            className="pr-0"
                                        >
                                            <Eye width={18} height={18} />{" "}
                                            <span className="ml-1">view</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ))}

                    <CartSummary />
                </div>
            </div>
        </section>
    );
}
