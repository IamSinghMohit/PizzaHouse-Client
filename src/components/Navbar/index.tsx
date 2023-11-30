"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useAppDispatch} from "@/hooks/state";
import { setUser, setWindow } from "@/store/features/user";
import { useGetUser } from "@/hooks/useGetUser";

interface Props {}

export default function Navbar({}: Props) {
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useAppDispatch();
    const {data} = useGetUser()
    useEffect(() => {
        setLoaded(true);
        if (window.innerWidth < 480) {
            setIsMobile(true);
        }
        if (window.innerWidth < 700) {
            dispatch(setWindow("mobile"));
        } else {
            dispatch(setWindow("desktop"));
        }
    }, []);

    useEffect(() => {
        if(data){
            console.log(data);
            dispatch(setUser(data))
        }
            console.log(data);
    },[data])

    return (
        <nav className="navbar sticky top-0 z-10">
            <MaxWidthWrapper className="flex items-center justify-between py-2">
                <div className="w-[120px] h-9 relative">
                    <Image src="/logo.svg" alt="logo image" layout="fill" />
                </div>
                {loaded ? isMobile ? <MobileMenu /> : <DesktopMenu /> : null}
            </MaxWidthWrapper>
        </nav>
    );
}
