"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAppDispatch } from "@/hooks/state";
import { setUser } from "@/store/slices/user";
import { useGetUser } from "@/hooks/useGetUser";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

interface Props {}

export default function Navbar({}: Props) {
    const dispatch = useAppDispatch();
    const { data } = useGetUser();
    const isMobile = useMediaQuery({ query: "(max-width:415px)" });
    const scrollRef = useRef(0);
    const [show, setShow] = useState("translate-y-0");

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data]);

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
