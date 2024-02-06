"use client";

import OrderStepper from "@/app/cart/[id]/components/OrderStepper";
import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/state";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IndianRupee } from "lucide-react";
import { initSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import { OrderStatusEnum } from "./types";

type Props = {};

export default function page({}: Props) {
    const pathArray = usePathname().split("/");
    const id = pathArray[pathArray.length - 1];
    const entity = useAppSelector((state) => state.cart.entities[id]);
    const [loading, setLoading] = useState(true);
    const socketRef = useRef<Socket | null>(null);
    const [step, setStep] = useState("placed");
    useEffect(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        console.log(socketRef.current);
        async function init() {
            socketRef.current = (await initSocket()) as unknown as Socket;
            socketRef.current.emit("join");
            socketRef.current.emit("join_room", "65ae0d9ad8ee7b8203720575");
            socketRef.current.on("status_updated", (data) => {
                console.log(data);
                setStep(data.status);
            });
        }
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    // TODO: Also product description needed to be ad in entityAdapter

    return (
        <MaxWidthWrapper className="mt-10">
            {!loading && (
                <>
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
                        </div>
                    </div>
                    {entity?.topings.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 p-2 max-h-[300px] overflow-y-scroll">
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
                                            <IndianRupee
                                                width={14}
                                                height={14}
                                            />
                                            {toping.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Card className="p-2 mt-4 flex flex-col gap-4">
                        <div className="p-4 pb-5">
                            <OrderStepper step={step} />
                        </div>
                        <div className="max-w-[300px] w-full mx-auto sm:mx-0">
                            <dl className="space-y-0.5 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <dt>Price</dt>
                                    <dd className="flex items-center">
                                        <IndianRupee width={15} height={15} />
                                        <span>{entity?.price}</span>
                                    </dd>
                                </div>

                                <div className="flex justify-between">
                                    <dt>Quantity</dt>
                                    <dd className="flex items-center">
                                        <IndianRupee width={15} height={15} />
                                        <span>{entity?.quantity}</span>
                                    </dd>
                                </div>

                                <div className="flex justify-between">
                                    <dt>Sub Total</dt>
                                    <dd className="flex items-center">
                                        <IndianRupee width={15} height={15} />
                                        <span>
                                            {entity?.price * entity?.quantity}
                                        </span>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Shipping</dt>
                                    <dd className="flex items-center">
                                        <IndianRupee width={15} height={15} />
                                        <span>10</span>
                                    </dd>
                                </div>

                                <div className="flex justify-between !text-base font-medium">
                                    <dt>Total</dt>
                                    <dd className="flex items-center">
                                        <IndianRupee width={15} height={15} />
                                        <span>
                                            {entity?.price * entity?.quantity +
                                                10}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                </>
            )}
        </MaxWidthWrapper>
    );
}
