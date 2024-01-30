"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAppDispatch } from "@/hooks/state";
import { setUser, setWindow } from "@/store/slices/user";
import { useGetUser } from "@/hooks/useGetUser";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

interface Props {}

export default function Navbar({}: Props) {
    const dispatch = useAppDispatch();
    const { data } = useGetUser();
    const isMobile = useMediaQuery({ query: "(max-width:415px)" });

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data]);

    return (
        <nav className="navbar sticky top-0 z-10">
            <MaxWidthWrapper className={`flex items-center justify-between py-2 gap-2 ${isMobile ? "py-1" : ""}`}>
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
        </nav>
    );
}
