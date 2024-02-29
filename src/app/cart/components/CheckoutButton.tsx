import { useAppSelector } from "@/hooks";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Codepen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCheckout } from "../hooks/useCheckout";
import ButtonWithLoading from "@/app/components/ButtonWithLoading";

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

    function handleMakePayment() {
        if(!user){
            return toast.error("Login plase")
        }
        if (stripePromise) {
            const body = {
                products: ids.map((id) => ({
                    name: entities[id]?.product_name,
                    image: entities[id]?.product_image,
                    price: entities[id]?.price,
                    quantity: entities[id]?.quantity,
                    description: entities[id]?.product_description,
                    topings: entities[id]?.topings.map(
                        ({ name, image, price }) => ({
                            name,
                            image,
                            price,
                        }),
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
        <ButtonWithLoading
            isLoading={isPending}
            onClick={handleMakePayment}
            icon={<Codepen />}
        >
            Checkout
        </ButtonWithLoading>
    );
}

export default CheckoutButton;
