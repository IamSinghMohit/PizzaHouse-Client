"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/state";
import CartItem from "./components/CartItem";
import Image from "next/image";
import { BaggageClaim} from "lucide-react";
import CartCheckout from "./components/CartCheckout";

export default function page() {
    const ids = useAppSelector((state) => state.cart.ids);
    const [loading, setLoading] = useState(true);

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
                                        <CartItem key={id} id={id} />
                                    ))}
                                </ul>
                            </div>
                        )
                    ) : (
                        <p>loading</p>
                    )}
                    {/* Rendering checkout element */}
                    {!loading && ids.length > 0 && <CartCheckout />}
                </div>
            </div>
        </section>
    );
}
