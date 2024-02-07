import { useAppSelector } from "@/hooks/state";
import { IndianRupee } from "lucide-react";
import React from "react";

type Props = {
    id: string;
};

function OrderSummary({ id }: Props) {
    const entity = useAppSelector((state) => state.cart.entities[id]);
    return entity ? (
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
                        <span>{entity?.price * entity?.quantity}</span>
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
                        <span>{entity?.price * entity?.quantity + 10}</span>
                    </dd>
                </div>
            </dl>
        </div>
    ) : null;
}

export default OrderSummary;
