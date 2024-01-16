import React, { useEffect, useMemo, useState } from "react";

import { IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/state";

type Props = {};

function CartCheckout({}: Props) {
    const { ids, entities } = useAppSelector((state) => state.cart);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        let price = 0;
        for (let id of ids) {
            const entity = entities[id];
            price += (entity?.price || 0) * (entity?.quantity || 0);
        }
        setPrice(price);
    }, [ids,entities]);
    return (
        <Card className="mt-8 flex justify-end border-t bg-gray-50 pt-8  border p-2">
            <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
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
                </dl>

                <div className="flex justify-end">
                    <Button>Checkout</Button>
                </div>
            </div>
        </Card>
    );
}

export default CartCheckout;
