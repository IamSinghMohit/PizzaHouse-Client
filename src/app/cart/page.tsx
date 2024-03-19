import CartList from "./components/CartList";
import Image from "next/image";

export default function page() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 md:min-h-[600px]">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl flex items-center justify-center gap-2">
                            Cart{" "}
                            <Image
                                src={"/shopping-cart.png"}
                                alt="cart image"
                                width={40}
                                height={40}
                            />
                        </h1>
                    </header>
                    <CartList />
                </div>
            </div>
        </section>
    );
}
