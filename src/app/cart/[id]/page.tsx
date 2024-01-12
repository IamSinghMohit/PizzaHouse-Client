'use client'

import React from "react";
import { useAppSelector } from "@/hooks/state";
import CartItem from "./components/CartItem";

export default function page() {
    const ids = useAppSelector((state) => state.cart?.ids)
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Your Cart
                        </h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {ids?.map((id) => (
                            <CartItem key={id} id={id}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
