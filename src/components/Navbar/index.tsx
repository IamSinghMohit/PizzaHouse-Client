"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUser, setUserStripeSecret } from "@/store/slices/user";
import { useGetUser } from "@/hooks/useGetUser";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useStripeKey } from "@/hooks/useStripeKey";
import { Client, HydrationProvider } from "react-hydration-provider";
import { useCartProducts } from "@/app/cart/hooks";
import { useQueryState } from "next-usequerystate";
import { emptyCart } from "@/store/slices/cart";

interface Props {}

export default function Navbar({}: Props) {
    const { data } = useGetUser();
    const user = useAppSelector((state) => state.user.user?.id);
    useCartProducts(!!user);
    const { data: stripeData } = useStripeKey(!!user);

    const dispatch = useAppDispatch();
    const [paymentStatus] = useQueryState("payment");
    const isMobile = useMediaQuery({ query: "(max-width:600px)" });
    const scrollRef = useRef(0);
    const [show, setShow] = useState("translate-y-0");

    useEffect(() => {
        if (paymentStatus === "success") {
            dispatch(emptyCart());
        }

        if (data) {
            dispatch(setUser(data));
        }
        if (stripeData) {
            dispatch(setUserStripeSecret(stripeData));
        }
    }, [data, stripeData]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > scrollRef.current) {
                if (isMobile) {
                    setShow("-translate-y-[40px]");
                } else {
                    setShow("-translate-y-[80px]");
                }
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        scrollRef.current = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, []);

    return (
        <header
            className={`navbar sticky top-0 z-50 transition-all duration-200 ease-in ${show}`}
        >
            <MaxWidthWrapper
                className={`flex items-center justify-between py-1 gap-2 sm:py-2`}
            >
                <Link
                    href="/"
                    className="relative w-[180px] h-[60px] sm:w-[240px] sm:h-[60px]"
                >
                    <Image
                        src={"/logo.svg"}
                        alt="logo image"
                        sizes="(max-width: 768px)100vw, (max-width: 1200px)50vw, 30vw"
                        fill
                    />
                </Link>
                <HydrationProvider>
                    <Client>
                        {isMobile ? <MobileMenu /> : <DesktopMenu />}
                    </Client>
                </HydrationProvider>
            </MaxWidthWrapper>
        </header>
    );
}
