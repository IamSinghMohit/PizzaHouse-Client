"use client";

import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/state";
import api from "@/lib/axios";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElement, loadStripe } from "@stripe/stripe-js";
import { ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CheckoutForm from "./components/CheckoutForm";

type Props = {};

export default function page({}: Props) {
    const pathArray = usePathname().split("/");
    const id = pathArray[pathArray.length - 1];
    const entity = useAppSelector((state) => state.cart.entities[id]);
    const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.user);

    const [stripePromies, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [stripeSecret, setStripeSecret] = useState("");

    useEffect(() => {
        setLoading(false);
        api.get<string>("/order/stripe-publish-key").then((res) => {
            console.log(res);
            setStripePromise(loadStripe(res.data.data));
        });
    }, []);

    useEffect(() => {
        const data = {
            user_id: "659ee0915f6f521081e9400b",
            topings: entity?.topings.map((top) => top.id),
            city: "a",
            state: "b",
            address: "abc hello world",
            quantity: entity?.quantity,
            product_id: entity?.product_id,
            product_price: entity?.product_price,
            product_sections:entity?.product_sections
        };
        api.post("/order/create", data).then((res) => {
            console.log(res);
            setStripeSecret(res.data.data.client_secret);
        });
    }, []);
    // TODO: Also product description needed to be ad in entityAdapter
    return (
        <MaxWidthWrapper>
            <Card className="bg-gray-50 shadow-none flex">
                {!loading && (
                    <div>
                        <Card className="flex gap-2 p-2 max-w-2xl">
                            <CImage
                                src={entity?.product_image || ""}
                                alt="product image"
                                width={252}
                                height={212}
                                className="rounded-sm"
                            />
                            <div>
                                <h6>{entity?.product_name}</h6>
                                <p className="text-gray-600">
                                    {entity?.product_description ||
                                        "this is the dommy description update it later inside order page"}
                                </p>
                                <h5 className="text-gray-700">
                                    Price: {entity?.product_price}
                                </h5>
                                <p>Quantity:{entity?.quantity}</p>
                            </div>

                            <Button className="bg-primary_orange flex items-center gap-1">
                                <span>
                                    <ClipboardList />
                                </span>
                                Place Order
                            </Button>
                        </Card>
                        <div className="flex mt-3 gap-4">
                            {entity?.topings && (
                                <Card className="flex flex-col gap-1 p-2 w-[260px] overflow-y-scroll">
                                    {entity.topings.map((toping) => (
                                        <div className="flex gap-1 items-start">
                                            <CImage
                                                src={toping.image || ""}
                                                alt="toping image"
                                                width={60}
                                                height={60}
                                                className="rounded-sm"
                                            />
                                            <div>
                                                <h6>Name: {toping.name}</h6>
                                                <span>
                                                    Price: {toping.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </Card>
                            )}
                        </div>
                    </div>
                )}

                {stripeSecret && (
                    <Elements
                        stripe={stripePromies}
                        options={{ clientSecret: stripeSecret }}
                    >
                        <CheckoutForm />
                    </Elements>
                )}
            </Card>
        </MaxWidthWrapper>
    );
}
