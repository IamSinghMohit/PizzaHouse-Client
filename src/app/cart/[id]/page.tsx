import { Trash2 } from "lucide-react";
import OrderQuantity from "./components/OrderQuantity";

import React from "react";
import { Button } from "@/components/ui/button";

export default function page() {
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
                            {[1, 1, 1].map(() => (
                                <li
                                    className="flex items-center gap-4"
                                    key={`${Date.now() * Math.random() * 100}`}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                                        alt=""
                                        className="h-16 w-16 rounded object-cover"
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">
                                            Basic Tee 6-Pack
                                        </h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">
                                                    Size:
                                                </dt>
                                                <dd className="inline">XXS</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">
                                                    Color:
                                                </dt>
                                                <dd className="inline">
                                                    White
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <OrderQuantity />
                                    </div>
                                    <Button
                                        size={"icon"}
                                        className="rounded-md"
                                    >
                                        <Trash2 />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
