"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface Props {}

export default function Navbar({}: Props) {
    const [mobile, setMobile] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        if (window.innerWidth < 480) {
            setMobile(true);
        }
    }, []);

    return (
        <nav className="navbar sticky top-0 z-10">
            <MaxWidthWrapper className="flex items-center justify-between py-2">
                <div className="w-[120px] h-9 relative">
                    <Image src="/logo.svg" alt="logo image" layout="fill" />
                </div>
                {loaded ? mobile ? <MobileMenu /> : <DesktopMenu /> : null}
            </MaxWidthWrapper>
        </nav>
    );
}
