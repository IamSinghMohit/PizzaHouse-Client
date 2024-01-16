"use client";

import OrderStepper from "@/app/cart/[id]/components/OrderStepper";
import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/state";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";

type Props = {};

export default function page({}: Props) {

    const pathArray = usePathname().split("/");
    const id = pathArray[pathArray.length - 1];
    const entity = useAppSelector((state) => state.cart.entities[id]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    // TODO: Also product description needed to be ad in entityAdapter
    return (
        <MaxWidthWrapper className="mt-10">
            {!loading && (
                <>
                    <Card className="flex gap-2 p-2">
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
                        </div>
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
                                            <span>Price: {toping.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        )}
                        <Card className="p-2 flex-grow">
                            <div className="p-4">
                                <OrderStepper step={"placed"} />
                            </div>
                            <div className="w-screen max-w-lg space-y-4 mx-auto">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <dt>Subtotal</dt>
                                        <dd className="flex items-center">
                                            <IndianRupee
                                                width={15}
                                                height={15}
                                            />
                                            <span>10</span>
                                        </dd>
                                    </div>

                                    <div className="flex justify-between">
                                        <dt>Shipping</dt>
                                        <dd className="flex items-center">
                                            <IndianRupee
                                                width={15}
                                                height={15}
                                            />
                                            <span>10</span>
                                        </dd>
                                    </div>

                                    <div className="flex justify-between !text-base font-medium">
                                        <dt>Total</dt>
                                        <dd className="flex items-center">
                                            <IndianRupee
                                                width={15}
                                                height={15}
                                            />
                                            <span>{10 + 10}</span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </MaxWidthWrapper>
    );
}
