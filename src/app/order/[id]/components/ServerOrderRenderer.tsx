"use client";

import React from "react";
import CImage from "@/lib/CImage";
import { Card } from "@/components/ui/card";
import OrderTopingRenderer from "./OrderTopingRenderer";
import OrderSummary from "./OrderSummary";
import {  useGetOrder } from "../hooks";
import OrderStepper from "./OrderStepper";
import OrderLoader from "./OrderLoader";

type Props = { id: string; };

function ServerOrderRenderer({ id }: Props) {
    const { data, isLoading } = useGetOrder(id);
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
                <OrderStepper step={step ? step : data?.status || "placed"} />
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
