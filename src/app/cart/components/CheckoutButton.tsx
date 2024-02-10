import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/state";
import { SpinnerIcon } from "@/icons";
import api from "@/lib/axios";
import { loadStripe } from "@stripe/stripe-js";
import { Codepen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type Props = {};

function CheckoutButton({}: Props) {
    const { user, stripePublishKey } = useAppSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const { ids, entities } = useAppSelector((state) => state.cart);

    async function handleMakePayment() {
        if (stripePublishKey && user) {
            const body = {
                products: ids.map((id) => ({
                    name: entities[id]?.product_name,
                    image: entities[id]?.product_image,
                    price: entities[id]?.product_price,
                    quantity: entities[id]?.quantity,
                })),
                city: user.city,
                state: user.state,
                address: user.address,
            };
            setIsLoading(true);
            const stripe = await loadStripe(stripePublishKey);
            const res = await api
                .post("/order/create", body)
                .then((res) => res.data)
                .catch(() => setIsLoading(false));
            const validatedData = z.string().parse(res.data);
            const paymentResult = await stripe?.redirectToCheckout({
                sessionId: validatedData,
            });
            setIsLoading(false);
            if (paymentResult?.error) {
                toast.error(paymentResult?.error.message);
                setIsLoading(false);
            }
        }
    }

    return (
        <Button
            className="text-lg rounded-lg w-full sm:w-auto"
            onClick={handleMakePayment}
            disabled={isLoading}
        >
            <span className="mr-1">
                {isLoading ? <SpinnerIcon /> : <Codepen />}
            </span>
            Checkout
        </Button>
    );
}

export default CheckoutButton;