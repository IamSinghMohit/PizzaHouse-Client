import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { IndianRupee } from "lucide-react";
import React, { useMemo } from "react";
import CheckoutButton from "./CheckoutButton";
import { Client, HydrationProvider, Server } from "react-hydration-provider";

type Props = {};

export default function CartSummary({}: Props) {
    const { ids, entities } = useAppSelector((state) => state.cart);

    const price = useMemo(() => {
        let price = 0;
        ids.forEach((id) => {
            const obj = entities[id];
            if (obj) {
                price += obj.price * obj.quantity || 0;
            }
        });
        return price;
    }, [entities]);

    return ids.length > 0 ? (
        <Card className="rounded-sm p-5 mt-4">
            <HydrationProvider>
                <div className="space-y-0.5 text-sm text-gray-700 max-w-[500px] mx-auto">
                    <div className="flex justify-between">
                        <dt>Products</dt>
                        <span>
                            <Client>{ids.length}</Client>
                            <Server>{0}</Server>
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <dt>Sub Total</dt>
                        <dd className="flex items-center">
                            <IndianRupee width={15} height={15} />
                            <span>
                                <Client>{price}</Client>
                                <Server>{0}</Server>
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
                                <Client>{price + 10}</Client>
                                <Server>{0 + 10}</Server>
                            </span>
                        </dd>
                    </div>
                </div>
                <div className="flex max-w-[500px] mx-auto justify-end mt-5">
                    <CheckoutButton />
                </div>
            </HydrationProvider>
        </Card>
    ) : (
    <></>
    );
}
