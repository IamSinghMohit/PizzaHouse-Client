"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { LoginWithButton } from "../LoginWithButton";
import ProfileButton from "../ProfileButton";
import { useQueryClient } from "@tanstack/react-query";
import { TGetCartProductsSchema } from "@/app/cart/schema";
interface Props {}

export default function DesktopMenu({}: Props) {
    const { user } = useAppSelector((state) => state.user);
    const ids = useAppSelector((state) => state.cart.ids);
    const queryClient = useQueryClient();
    const cartItems = queryClient.getQueryData<TGetCartProductsSchema>([
        "cart",
    ]);
    return (
        <nav className="flex items-center font-bold font-inter gap-2">
            <Link href={"/product"}>
                <Button size="icon" className="rounded-full">
                    <Search />
                </Button>
            </Link>{" "}
            <Link href={"/cart"}>
                <Button size="icon" className="rounded-full relative">
                    <ShoppingCart />
                    <span className="absolute top-0 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[12px] font-light flex items-center justify-center">
                        {ids.length + (cartItems?.length || 0)}
                    </span>
                </Button>
            </Link>{" "}
            {user ? <ProfileButton user={user} /> : <LoginWithButton />}
        </nav>
    );
}
