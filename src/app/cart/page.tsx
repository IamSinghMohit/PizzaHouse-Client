import { BaggageClaim } from "lucide-react";
import CartSummary from "./components/CartSummary";
import CartList from "./components/CartList";

export default function page() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 md:min-h-[600px]">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl flex items-center justify-center gap-2">
                            Cart{" "}
                            <BaggageClaim
                                width={40}
                                height={40}
                                className="text-primary_orange"
                            />
                        </h1>
                    </header>
                    <CartList />
                </div>
            </div>
        </section>
    );
}
