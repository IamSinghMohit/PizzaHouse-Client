"use client";

import OrderStepper from "@/app/cart/[id]/components/OrderStepper";
import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/state";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import OrderTopingRenderer from "@/components/OrderTopingRenderer";
import OrderSummary from "@/components/OrderSummary";

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
                    <OrderTopingRenderer id={id} />
                    <Card className="p-2 mt-4 flex flex-col gap-4">
                        <div className="p-4 pb-5">
                            <OrderStepper step={step} />
                        </div>
                        <OrderSummary id={id} />
                    </Card>
                </>
            )}
        </MaxWidthWrapper>
    );
}
