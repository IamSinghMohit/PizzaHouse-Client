import { Stripe } from "@stripe/stripe-js";
import {
    ReactNode,
    createContext,
    useRef,
    useState,
    MutableRefObject,
    Dispatch,
    SetStateAction,
} from "react";

type TPyamentContext = {
    stripePromiseRef: MutableRefObject<Promise<Stripe> | null>;
    clientSecret: string;
    setClientSecret: Dispatch<SetStateAction<string>>;
};
const PaymentContext = createContext<TPyamentContext | null>(null);

export function PaymentContextProvider({ children }: { children: ReactNode }) {
    const stripePromiseRef = useRef<Promise<Stripe> | null>(null);
    const [clientSecret, setClientSecret] = useState("");

    return (
        <PaymentContext.Provider
            value={{ stripePromiseRef, clientSecret, setClientSecret }}
        >
            {children}
        </PaymentContext.Provider>
    );
}
