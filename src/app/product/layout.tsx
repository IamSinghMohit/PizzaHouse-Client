"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { ProductSideBar } from "./components";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {
    children: ReactNode;
};

export default function Layout({ children}: Props) {
    const url = usePathname().split("/");
    if (url[url.length - 1] !== "product") {
        return <></>;
    }
    return (
        <MaxWidthWrapper className="flex flex-col gap-1 md:flex-row ">
            <ProductSideBar />
            {children}
        </MaxWidthWrapper>
    );
}
