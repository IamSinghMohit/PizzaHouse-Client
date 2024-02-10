import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/state";
import { Codepen, IndianRupee } from "lucide-react";
import React, { useMemo } from "react";
import CheckoutButton from "./CheckoutButton";

type Props = {};

export default function CartSummary({}: Props) {
    const { ids, entities } = useAppSelector((state) => state.cart);
    const price = useMemo(() => {
        let price = 0;
        ids.forEach((id) => {
            const obj = entities[id];
            price += obj?.price || 0;
        });
        return price;
    }, [entities]);

    return (
        <Card className="rounded-sm p-5 mt-4">
            <div className="space-y-0.5 text-sm text-gray-700 max-w-[500px] mx-auto">
                <div className="flex justify-between">
                    <dt>Products</dt>
                    <dd className="flex items-center">
                        <IndianRupee width={15} height={15} />
                        <span>{ids.length}</span>
                    </dd>
                </div>

                <div className="flex justify-between">
                    <dt>Sub Total</dt>
                    <dd className="flex items-center">
                        <IndianRupee width={15} height={15} />
                        <span>{price}</span>
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
                        <span>{price + 10}</span>
                    </dd>
                </div>
            </div>
            <div className="flex max-w-[500px] mx-auto justify-end mt-5">
                <CheckoutButton />
            </div>
        </Card>
    );
}
