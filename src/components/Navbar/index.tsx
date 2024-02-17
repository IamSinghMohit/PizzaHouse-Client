"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAppDispatch } from "@/hooks/state";
import { setUser, setUserStripeSecret } from "@/store/slices/user";
import { useGetUser } from "@/hooks/useGetUser";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useStripeKey } from "@/hooks/useStripeKey";
import { Client, HydrationProvider } from "react-hydration-provider";

interface Props {}

export default function Navbar({}: Props) {
    const dispatch = useAppDispatch();
    const { data } = useGetUser();
    const { data: stripeData } = useStripeKey(!!data);
    const isMobile = useMediaQuery({ query: "(max-width:600px)" });
    const scrollRef = useRef(0);
    const [show, setShow] = useState("translate-y-0");

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data]);

    useEffect(() => {
        if (stripeData) {
            dispatch(setUserStripeSecret(stripeData));
        }
    }, [stripeData]);

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
        /* async function init() {
            const locomotive = (await import("locomotive-scroll")).default;
            new locomotive();
        }
        init(); */

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
