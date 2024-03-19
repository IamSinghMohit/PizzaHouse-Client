'use client'

import CImage from "@/lib/CImage";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import React from "react";
import OrderTopingRenderer from "./OrderTopingRenderer";
import OrderSummary from "./OrderSummary";

type Props = { id: string };

function ClientOrderRenderer({ id }: Props) {
    const newId = id.replace('client-','')
    const entity = useAppSelector((state) => state.cart.entities[newId]);
    return (
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
                    <p className="text-gray-600  max-w-[550px] text-[12px] lg:text-[14px]">
                        {entity?.product_description}
                    </p>
                    <h5 className="text-gray-800">
                        Price: {entity?.product_price}
                    </h5>
                </div>
            </div>
            <OrderTopingRenderer topings={entity?.topings || []} />
            <Card className="p-2 mt-4 flex flex-col gap-4">
                <OrderSummary
                    price={entity?.price || 0}
                    quantity={entity?.quantity || 0}
                />
            </Card>
        </>
    );
}

export default ClientOrderRenderer;
