import React from "react";
import CImage from "@/components/CImage";
import { Card } from "@/components/ui/card";
import OrderTopingRenderer from "@/components/OrderTopingRenderer";
import OrderSummary from "@/components/OrderSummary";
import { useGetOrder } from "../hooks";
import OrderStepper from "@/app/cart/components/OrderStepper";

type Props = { id: string; step: string };

function ServerOrderRenderer({ id, step }: Props) {
    const { data } = useGetOrder(id);
    return (
        <>
            <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-md border mb-2">
                <CImage
                    src={data?.image || ""}
                    alt="product image"
                    width={170}
                    height={80}
                    className="rounded-sm self-center"
                />
                <div>
                    <h6>{data?.name}</h6>
                    <h5 className="text-gray-800">Price: {data?.price}</h5>
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
    );
}

export default ServerOrderRenderer;
