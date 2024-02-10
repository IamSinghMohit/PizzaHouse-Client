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
import { TUserStateUser } from "@/types/user";

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
            // data as unknown as TUserStateUser;
            let userData = {
                ...data,
                city: "",
                state: "",
                address: "",
            } as unknown as TUserStateUser;
            try {
                const localData = JSON.parse(
                    localStorage.getItem(data.id) || "",
                ) as object;
                userData = { ...userData, ...localData };
            } catch (error) {
                console.log(error);
            }
            dispatch(setUser(userData));
        }
        if (stripeData) {
            dispatch(setUserStripeSecret(stripeData))
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
                className={`flex items-center justify-between py-2 gap-2 ${
                    isMobile ? "py-1" : ""
                }`}
            >
                <Link href="/">
                    {isMobile ? (
                        <Image
                            src={"/logo.svg"}
                            alt="logo image"
                            width={180}
                            height={60}
                        />
                    ) : (
                        <Image
                            src={"/logo.svg"}
                            alt="logo image"
                            width={240}
                            height={60}
                        />
                    )}
                </Link>
                {isMobile ? <MobileMenu /> : <DesktopMenu />}
            </MaxWidthWrapper>
        </header>
    );
}
