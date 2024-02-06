"use client";

import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAppSelector } from "@/hooks/state";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import React, { useEffect,  useState } from "react";
import CheckoutForm from "./components/CheckoutForm";
import { useStripeKey } from "./hooks/useStripeKey";
import { useCreatePaymentIntent } from "./hooks/useCreatePaymentIntent";
import { IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

export default function page({}: Props) {
    const pathArray = usePathname().split("/");
    const id = pathArray[pathArray.length - 1];
    const entity = useAppSelector((state) => state.cart.entities[id]);
    const user = useAppSelector((state) => state.user.user);

    const { data: publishKey, isError } = useStripeKey(!!user);
    const { data: secret, mutate } = useCreatePaymentIntent();
    const router = useRouter();

    const [stripePromies, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        if (publishKey) {
            setStripePromise(loadStripe(publishKey));
        }
        if (isError) {
            toast.error("server error!, try again after some time");
            router.push("/");
        }
    }, [publishKey, isError]);

    useEffect(() => {
        if (publishKey) {
            mutate({
                user_id: user?.id,
                topings: entity?.topings.map((top) => top.id),
                city: "a",
                state: "b",
                address: "abc hello world",
                quantity: entity?.quantity,
                product_id: entity?.product_id,
                product_price: entity?.product_price,
                product_sections: entity?.product_sections,
            });
        }
    }, [publishKey]);

    return (
        <MaxWidthWrapper className="pt-5 grid grid-cols-1 gap-3 md:gap-0 justify-items-center md:grid-cols-2">
            <div>
                <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-md border mb-2">
                    <CImage
                        src={entity?.product_image || ""}
                        alt="product image"
                        width={170}
                        height={80}
                        className="rounded-sm self-center"
                    />
                    <div>
                        <h6>{entity?.product_name}</h6>
                        <p className="text-gray-600 max-w-[340px] text-[12px] lg:text-[14px]">
                            {entity?.product_description}
                        </p>
                        <h5 className="text-gray-800">
                            Price: {entity?.product_price}
                        </h5>
                        <p>qty:{entity?.quantity}</p>
                    </div>
                </div>
                {entity?.topings.length > 0 && (
                    <div className="flex flex-col gap-1 p-2 max-h-[300px] overflow-y-scroll">
                        {entity?.topings.map((toping) => (
                            <div className="flex gap-1 items-start p-1 bg-gray-50 rounded-md border">
                                <CImage
                                    src={toping.image || ""}
                                    alt="toping image"
                                    width={60}
                                    height={60}
                                    className="rounded-sm"
                                />
                                <div>
                                    <h6>{toping.name}</h6>
                                    <span className="flex items-center gap-1">
                                        {" "}
                                        <IndianRupee width={14} height={14} />
                                        {toping.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {secret ? (
                <Elements
                    stripe={stripePromies}
                    options={{ clientSecret: secret.client_secret }}
                >
                    <CheckoutForm />
                </Elements>
            ) : (
                <div className="shimmer w-[280px] h-[270px]"></div>
            )}
        </MaxWidthWrapper>
    );
}
