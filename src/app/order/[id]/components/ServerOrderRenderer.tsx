"use client";

import React, { useEffect, useState } from "react";
import CImage from "@/lib/CImage";
import { Card } from "@/components/ui/card";
import OrderTopingRenderer from "./OrderTopingRenderer";
import OrderSummary from "./OrderSummary";
import { useGetOrder } from "../hooks";
import OrderStepper from "./OrderStepper";
import OrderLoader from "./OrderLoader";
import { OrderStatusEnum } from "../types";
import { useSocket } from "@/app/socket-context";

type Props = { id: string };

function ServerOrderRenderer({ id }: Props) {
    const { data, isLoading } = useGetOrder(id);
    const [step, setStep] = useState(OrderStatusEnum.PLACED);
    const socket = useSocket()

    useEffect(() => {
        console.log(socket)
        socket.current?.emit('join_room',id)
        socket.current?.on("status_updated",(data) => setStep(data.status))
        return () => {
            socket.current?.emit("leave_room",id)
            socket.current?.off("status_updated")
        }
    },[socket.current])

    useEffect(() => {
        if (data) {
            setStep(data.status);
        }
    }, [data]);

    return !isLoading ? (
        <>
            <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-md border mb-2">
                <CImage
                    src={data?.image || ""}
                    alt="product image"
                    width={170}
                    height={128}
                    className="rounded-sm self-center"
                />
                <div>
                    <h6>{data?.name}</h6>
                    <h5 className="text-gray-800">Price: {data?.price}</h5>
                    <p className="text-gray-500 text-sm">{data?.description}</p>
                </div>
            </div>
            <OrderTopingRenderer topings={data?.topings || []} />
            <Card className="p-2 mt-4 flex flex-col gap-4">
                <OrderStepper step={step} />
                <OrderSummary
                    price={data?.price || 0}
                    quantity={data?.quantity || 0}
                />
            </Card>
        </>
    ) : (
        <OrderLoader />
    );
}

export default ServerOrderRenderer;
