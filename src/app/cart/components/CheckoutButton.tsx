import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import { SpinnerIcon } from "@/icons";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Codepen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCheckout } from "../hooks/useCheckout";

type Props = {};

function CheckoutButton({}: Props) {
    const { user, stripePublishKey } = useAppSelector((state) => state.user);
    const { ids, entities } = useAppSelector((state) => state.cart);
    const { mutate, isPending, data } = useCheckout();
    const [stripePromise, setStripePromise] = useState<Stripe | null>();

    useEffect(() => {
        if (!stripePublishKey) return;
        async function init() {
            const stripe = await loadStripe(stripePublishKey || "");
            setStripePromise(stripe);
        }
        init();
    }, [stripePublishKey]);

    async function handleMakePayment() {
        if (stripePromise && user) {
            const body = {
                products: ids.map((id) => ({
                    name: entities[id]?.product_name,
                    image: entities[id]?.product_image,
                    price: entities[id]?.product_price,
                    quantity: entities[id]?.quantity,
                    description: entities[id]?.product_description,
                    topings: entities[id]?.topings.map(
                        ({ name, image, price }) => ({ name, image, price }),
                    ),
                })),
            };
            mutate(body);
        }
    }

    useEffect(() => {
        async function init() {
            if (data) {
                try {
                    const paymentResult =
                        await stripePromise?.redirectToCheckout({
                            sessionId: data || "",
                        });
                    if (paymentResult?.error) {
                        toast.error(paymentResult?.error.message);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        init();
    }, [data]);

    return (
        <Button
            className="text-lg rounded-lg w-full sm:w-auto"
            onClick={handleMakePayment}
            disabled={isPending}
        >
            <span className="mr-1">
                {isPending ? <SpinnerIcon /> : <Codepen />}
            </span>
            Checkout
        </Button>
    );
}

export default CheckoutButton;
